import { NextRequest, NextResponse } from "next/server";
import { verifyOmniwareResponseHash } from "@/lib/omniware";
import { getOrder, finalizeOrder } from "@/lib/orders";

// Omniware redirects the customer's browser back here with a POST (form-urlencoded)
// carrying the transaction result. We verify the hash, decide success/failure,
// then 303-redirect to the checkout page which shows the outcome.
//
// response_code "0" = success (Appendix 4). Any tampering flips the hash check,
// so a forged "success" is rejected as "tampered".
export async function POST(req: NextRequest) {
  const salt = process.env.OMNIWARE_SALT;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;

  const response: Record<string, string> = {};
  try {
    const form = await req.formData();
    form.forEach((value, key) => {
      response[key] = typeof value === "string" ? value : "";
    });
  } catch {
    // Some configurations may post JSON instead of a form.
    try {
      const json = await req.json();
      Object.entries(json ?? {}).forEach(([k, v]) => {
        response[k] = v == null ? "" : String(v);
      });
    } catch {
      // leave response empty → treated as failure below
    }
  }

  const orderId = response.order_id || "";
  const transactionId = response.transaction_id || "";
  const code = String(response.response_code ?? "");
  const paymentMode = response.payment_mode || undefined;
  const responseMessage = response.response_message || undefined;

  // 1) The response must be signed with our salt.
  const genuine = !!salt && verifyOmniwareResponseHash(response, salt);

  let status: "success" | "failure" | "tampered" = "failure";
  try {
    if (!genuine) {
      status = "tampered";
      if (orderId) {
        await finalizeOrder({ orderId, status: "TAMPERED", transactionId, responseCode: code, responseMessage });
      }
    } else {
      const order = orderId ? await getOrder(orderId) : null;
      // 2) The paid amount must match what we recorded at initiate — this stops
      //    a valid-looking response from paying a different (smaller) amount.
      const amountMatches =
        !!order &&
        Number(order.amount).toFixed(2) === Number(response.amount ?? -1).toFixed(2);

      if (!order) {
        // Correctly signed but we have no such order — don't claim success.
        status = "failure";
      } else if (!amountMatches) {
        status = "tampered";
        await finalizeOrder({ orderId, status: "TAMPERED", transactionId, paymentMode, responseCode: code, responseMessage });
      } else if (code === "0") {
        status = "success";
        await finalizeOrder({ orderId, status: "PAID", transactionId, paymentMode, responseCode: code, responseMessage });
      } else {
        status = "failure";
        await finalizeOrder({ orderId, status: "FAILED", transactionId, paymentMode, responseCode: code, responseMessage });
      }
    }
  } catch (e) {
    // A DB hiccup must not strand the customer — keep the computed status and
    // let the row be reconciled later (Payment Status API).
    console.error("Order finalize failed:", e);
    status = !genuine ? "tampered" : code === "0" ? "success" : "failure";
  }

  const url = new URL("/checkout", baseUrl);
  url.searchParams.set("payment", status);
  if (orderId) url.searchParams.set("order_id", orderId);
  if (transactionId) url.searchParams.set("txn", transactionId);

  // 303 forces the browser to follow with a GET.
  return NextResponse.redirect(url, 303);
}

// Fallback if the gateway ever returns via GET.
export function GET(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;
  return NextResponse.redirect(new URL("/checkout?payment=unknown", baseUrl), 303);
}
