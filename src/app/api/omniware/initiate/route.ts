import { NextRequest, NextResponse } from "next/server";
import { omniwareHash } from "@/lib/omniware";
import { createOrder } from "@/lib/orders";

// Builds a signed Omniware Payment Request. The browser takes the returned
// { action, fields } and auto-submits them as a POST form, which redirects the
// customer to Omniware's hosted payment page. The SALT never leaves the server.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      amount,
      name,
      email,
      phone,
      address_line_1,
      city,
      state,
      zip_code,
      description,
      items,
    } = body ?? {};

    if (!amount || Number(amount) <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }
    if (!name || !email || !phone || !city || !zip_code) {
      return NextResponse.json(
        { error: "Name, email, phone, city and pincode are required" },
        { status: 400 },
      );
    }

    const apiUrl = process.env.OMNIWARE_API_URL; // e.g. https://pgbiz.omniware.in
    const apiKey = process.env.OMNIWARE_API_KEY;
    const salt = process.env.OMNIWARE_SALT;
    const mode = process.env.OMNIWARE_MODE || "LIVE"; // "TEST" or "LIVE"

    if (!apiUrl || !apiKey || !salt) {
      return NextResponse.json(
        { error: "Payment gateway is not configured" },
        { status: 500 },
      );
    }

    // Absolute base URL for the return_url Omniware posts the result back to.
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;
    const callback = `${baseUrl.replace(/\/$/, "")}/api/omniware/callback`;

    // order_id must be unique per transaction (Omniware rejects duplicates).
    const orderId = `TW${Date.now()}`;
    const amountStr = Number(amount).toFixed(2);

    // Record the order as PENDING before sending the customer to the gateway,
    // so the callback has a row to reconcile against. If this fails we do NOT
    // start a payment we can't track.
    try {
      await createOrder({
        orderId,
        amount: amountStr,
        currency: "INR",
        customerName: String(name).trim(),
        customerEmail: String(email).trim(),
        customerPhone: String(phone).trim(),
        addressLine1: address_line_1 ? String(address_line_1).trim() : null,
        city: String(city).trim(),
        state: state ? String(state).trim() : null,
        zipCode: String(zip_code).trim(),
        items,
      });
    } catch (e) {
      console.error("Failed to create order:", e);
      return NextResponse.json(
        { error: "Could not create the order. Please try again." },
        { status: 500 },
      );
    }

    // IMPORTANT: Omniware computes the request hash over a FIXED set of columns
    // (see the official UAT sample). That set does NOT include return_url_failure
    // or return_url_cancel — sending them here would make our hash disagree with
    // Omniware's and every payment would fail with 1023 HASH-MISMATCH. So we send
    // only return_url; the callback distinguishes success/failure by response_code.
    // Values are trimmed so the posted value is exactly what we hash.
    const fields: Record<string, string> = {
      api_key: apiKey,
      order_id: orderId,
      mode,
      amount: amountStr,
      currency: "INR",
      description: String(description || "Dental Supplies Order").trim().slice(0, 255),
      name: String(name).trim().slice(0, 255),
      email: String(email).trim().slice(0, 255),
      phone: String(phone).trim().slice(0, 30),
      city: String(city).trim().slice(0, 255),
      country: "IND",
      zip_code: String(zip_code).trim().slice(0, 20),
      return_url: callback,
    };
    const addr = address_line_1 ? String(address_line_1).trim() : "";
    if (addr) fields.address_line_1 = addr.slice(0, 255);
    const st = state ? String(state).trim() : "";
    if (st) fields.state = st.slice(0, 255);

    fields.hash = omniwareHash(fields, salt);

    return NextResponse.json({
      action: `${apiUrl.replace(/\/$/, "")}/v2/paymentrequest`,
      fields,
      orderId,
    });
  } catch (error) {
    console.error("Omniware initiate error:", error);
    return NextResponse.json(
      { error: "Failed to initiate payment" },
      { status: 500 },
    );
  }
}
