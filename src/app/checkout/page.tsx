"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MapPin, CreditCard, Truck, ChevronRight, Lock, Smartphone, Wallet, Building2, Banknote, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler: (response: RazorpayResponse) => void;
  modal: { ondismiss: () => void };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

const STEPS = ["Cart", "Address", "Payment", "Confirmation"];

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", icon: Smartphone, desc: "PhonePe, GPay, Paytm, BHIM" },
  { id: "card", label: "Debit/Credit Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay, Amex" },
  { id: "wallet", label: "Wallets", icon: Wallet, desc: "Paytm, Mobikwik, Freecharge" },
  { id: "netbanking", label: "Net Banking", icon: Building2, desc: "All major Indian banks" },
  { id: "emi", label: "EMI", icon: Zap, desc: "No-cost EMI on cards" },
  { id: "cod", label: "Cash on Delivery", icon: Banknote, desc: "Pay when delivered" },
];

const UPI_APPS = ["PhonePe", "Google Pay", "Paytm", "BHIM UPI", "Other UPI"];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getTotal, couponDiscount, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [selectedUpi, setSelectedUpi] = useState("PhonePe");
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<"success" | "failure" | null>(null);
  const [agreed, setAgreed] = useState(false);

  const subtotal = getSubtotal();
  const total = getTotal();
  const shipping = subtotal >= 5000 ? 0 : 149;
  const finalTotal = total + shipping;

  const [address, setAddress] = useState({
    name: "", phone: "", email: "", pincode: "",
    address: "", city: "", state: "", landmark: "",
  });

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleRazorpayPayment = async () => {
    if (!agreed) return;
    setProcessing(true);
    setPaymentResult(null);

    try {
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalTotal }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) throw new Error(orderData.error || "Order creation failed");

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Thaarwin Enterprises",
        description: "Dental Supplies Order",
        order_id: orderData.orderId,
        prefill: {
          name: address.name,
          email: address.email,
          contact: address.phone,
        },
        theme: { color: "#1B5E20" },
        handler: async (response: RazorpayResponse) => {
          const verifyRes = await fetch("/api/razorpay/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();

          setProcessing(false);
          if (verifyData.success) {
            setPaymentResult("success");
            setStep(3);
            clearCart();
          } else {
            setPaymentResult("failure");
          }
        },
        modal: {
          ondismiss: () => {
            setProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setProcessing(false);
      setPaymentResult("failure");
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-10">
      {STEPS.slice(1).map((s, i) => (
        <div key={s} className="flex items-center">
          <div className={`flex flex-col items-center gap-1`}>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
              i + 1 < step ? "bg-[#10B981] text-[#3E2723] shadow-[0_0_12px_rgba(16,185,129,0.4)]"
              : i + 1 === step ? "neon-btn text-[#FFFDF5] shadow-[0_0_16px_rgba(27,94,32,0.5)]"
              : "bg-[#FAF6ED] border border-[#1B5E20]/15 text-[#5D4037]"
            }`}>
              {i + 1 < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-xs font-medium ${i + 1 <= step ? "text-[#1B5E20]" : "text-[#5D4037]"}`}>{s}</span>
          </div>
          {i < STEPS.length - 2 && (
            <div className={`w-16 sm:w-24 h-px mx-3 mb-4 transition-all ${i + 1 < step ? "bg-[#10B981]" : "bg-[#1B5E20]/15"}`} />
          )}
        </div>
      ))}
    </div>
  );

  const OrderSummary = () => (
    <div className="card-glass rounded-xl p-5 sticky top-24">
      <h3 className="font-semibold text-[#3E2723] mb-4 text-sm">Order Summary</h3>
      <div className="space-y-3 mb-4 max-h-52 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 items-center">
            <div className="w-12 h-12 rounded-lg bg-[#FAF6ED] border border-[#1B5E20]/10 shrink-0 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-[#3E2723] line-clamp-1">{item.name}</div>
              <div className="text-xs text-[#5D4037]">Qty: {item.quantity}</div>
            </div>
            <div className="text-xs font-semibold text-[#3E2723] shrink-0">₹{(item.price * item.quantity).toLocaleString("en-IN")}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-[#1B5E20]/08 pt-3 space-y-2 text-xs text-[#3E2723]">
        <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
        {couponDiscount > 0 && <div className="flex justify-between text-[#10B981]"><span>Discount</span><span>-₹{((subtotal * couponDiscount) / 100).toLocaleString("en-IN")}</span></div>}
        <div className="flex justify-between"><span>Shipping</span><span className={shipping === 0 ? "text-[#10B981]" : ""}>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
        <div className="flex justify-between font-bold text-[#3E2723] text-sm pt-2 border-t border-[#1B5E20]/08">
          <span>Total</span><span>₹{finalTotal.toLocaleString("en-IN")}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-[10px] text-[#5D4037]">
        <Lock className="h-3 w-3 text-[#1B5E20]" /> Secured by SSL encryption
      </div>
    </div>
  );

  return (
    <>
    <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-6xl">
      <h1 className="text-2xl font-bold font-outfit text-[#3E2723] mb-8">
        Checkout
      </h1>
      <StepIndicator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Area */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {/* ── Step 1: Address ── */}
            {step === 1 && (
              <motion.div key="address" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="card-glass rounded-xl p-6">
                  <h2 className="font-semibold text-[#3E2723] text-lg mb-6 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#1B5E20]" /> Delivery Address
                  </h2>
                  <form onSubmit={handleAddressSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {[
                        { key: "name", label: "Full Name", placeholder: "Dr. John Doe", type: "text", full: false },
                        { key: "phone", label: "Phone Number", placeholder: "+91 98765 43210", type: "tel", full: false },
                        { key: "email", label: "Email Address", placeholder: "doctor@clinic.com", type: "email", full: true },
                        { key: "pincode", label: "Pincode", placeholder: "110001", type: "text", full: false },
                        { key: "city", label: "City", placeholder: "New Delhi", type: "text", full: false },
                        { key: "state", label: "State", placeholder: "Delhi", type: "text", full: false },
                        { key: "address", label: "Flat, House No, Street", placeholder: "123, Example Street", type: "text", full: true },
                        { key: "landmark", label: "Landmark (Optional)", placeholder: "Near hospital", type: "text", full: true },
                      ].map(({ key, label, placeholder, type, full }) => (
                        <div key={key} className={full ? "sm:col-span-2" : ""}>
                          <label className="block text-xs font-medium text-[#3E2723] mb-1.5">{label}</label>
                          <input
                            type={type}
                            required={!label.includes("Optional")}
                            placeholder={placeholder}
                            value={address[key as keyof typeof address]}
                            onChange={(e) => setAddress({ ...address, [key]: e.target.value })}
                            className="w-full h-10 px-3 rounded-lg bg-[#FAF6ED] border border-[#1B5E20]/15 text-[#3E2723] placeholder:text-[#5D4037] text-sm focus:outline-none focus:border-[#1B5E20]/50 focus:shadow-[0_0_12px_rgba(27,94,32,0.1)] transition-all"
                          />
                        </div>
                      ))}
                    </div>
                    <Button type="submit" className="w-full h-12 neon-btn text-[#FFFDF5] font-bold rounded-xl">
                      Continue to Payment <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Payment ── */}
            {step === 2 && (
              <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="card-glass rounded-xl p-6">
                  <h2 className="font-semibold text-[#3E2723] text-lg mb-6 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-[#1B5E20]" /> Payment Method
                  </h2>

                  {/* Payment Options */}
                  <div className="space-y-3 mb-6">
                    {PAYMENT_METHODS.map((method) => {
                      const Icon = method.icon;
                      return (
                        <div
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                            paymentMethod === method.id
                              ? "border-[#1B5E20]/50 bg-[#1B5E20]/05 shadow-[0_0_16px_rgba(27,94,32,0.1)]"
                              : "border-[#1B5E20]/10 hover:border-[#1B5E20]/25"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === method.id ? "bg-[#1B5E20]/20" : "bg-[#FAF6ED]"}`}>
                            <Icon className={`h-5 w-5 ${paymentMethod === method.id ? "text-[#1B5E20]" : "text-[#5D4037]"}`} />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-[#3E2723]">{method.label}</div>
                            <div className="text-xs text-[#5D4037]">{method.desc}</div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === method.id ? "border-[#1B5E20]" : "border-[#5D4037]"
                          }`}>
                            {paymentMethod === method.id && <div className="w-2 h-2 rounded-full bg-[#1B5E20]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Payment Method Sub-options */}
                  {paymentMethod === "upi" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl bg-[#FAF6ED] border border-[#1B5E20]/10 mb-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {UPI_APPS.map((app) => (
                          <button
                            key={app}
                            onClick={() => setSelectedUpi(app)}
                            className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                              selectedUpi === app ? "border-[#1B5E20]/50 bg-[#1B5E20]/10 text-[#1B5E20]" : "border-[#1B5E20]/10 text-[#5D4037] hover:border-[#1B5E20]/25"
                            }`}
                          >
                            {app}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Enter UPI ID (e.g., name@paytm)"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full h-10 px-3 rounded-lg bg-[#FFFFFF] border border-[#1B5E20]/15 text-[#3E2723] placeholder:text-[#5D4037] text-sm focus:outline-none focus:border-[#1B5E20]/40 transition-all"
                      />
                    </motion.div>
                  )}

                  {paymentMethod === "card" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl bg-[#FAF6ED] border border-[#1B5E20]/10 mb-6 space-y-3">
                      <input type="text" placeholder="Card Number" className="w-full h-10 px-3 rounded-lg bg-[#FFFFFF] border border-[#1B5E20]/15 text-[#3E2723] placeholder:text-[#5D4037] text-sm focus:outline-none focus:border-[#1B5E20]/40 transition-all" />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Expiry MM/YY" className="h-10 px-3 rounded-lg bg-[#FFFFFF] border border-[#1B5E20]/15 text-[#3E2723] placeholder:text-[#5D4037] text-sm focus:outline-none focus:border-[#1B5E20]/40 transition-all" />
                        <input type="text" placeholder="CVV" className="h-10 px-3 rounded-lg bg-[#FFFFFF] border border-[#1B5E20]/15 text-[#3E2723] placeholder:text-[#5D4037] text-sm focus:outline-none focus:border-[#1B5E20]/40 transition-all" />
                      </div>
                      <input type="text" placeholder="Name on Card" className="w-full h-10 px-3 rounded-lg bg-[#FFFFFF] border border-[#1B5E20]/15 text-[#3E2723] placeholder:text-[#5D4037] text-sm focus:outline-none focus:border-[#1B5E20]/40 transition-all" />
                    </motion.div>
                  )}

                  {/* Policy Agreement */}
                  <div className="flex items-start gap-3 mb-6 mt-6 p-4 bg-[#FAF6ED] rounded-xl border border-[#1B5E20]/15">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-[#D7CEC3] text-[#1B5E20] focus:ring-[#1B5E20]"
                    />
                    <label htmlFor="terms" className="text-xs text-[#5D4037] leading-relaxed">
                      I have read, understood, and agree to the 
                      <Link href="/terms-and-conditions" target="_blank" className="text-[#00796B] hover:text-[#1B5E20] font-medium mx-1 underline underline-offset-2">Terms & Conditions</Link>, 
                      <Link href="/privacy-policy" target="_blank" className="text-[#00796B] hover:text-[#1B5E20] font-medium mx-1 underline underline-offset-2">Privacy Policy</Link>, 
                      <Link href="/refund-cancellation" target="_blank" className="text-[#00796B] hover:text-[#1B5E20] font-medium mx-1 underline underline-offset-2">Refund & Cancellation Policy</Link>, and 
                      <Link href="/shipping-policy" target="_blank" className="text-[#00796B] hover:text-[#1B5E20] font-medium mx-1 underline underline-offset-2">Shipping & Delivery Policy</Link>.
                    </label>
                  </div>

                  {/* Pay Button */}
                  <Button
                    onClick={handleRazorpayPayment}
                    disabled={processing || !agreed}
                    className={`w-full h-12 text-[#FFFDF5] font-bold rounded-xl text-base transition-all ${!agreed ? "bg-[#1B5E20]/50 cursor-not-allowed" : "neon-btn"}`}
                  >
                    {processing ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#FFFDF5]/30 border-t-[#FFFDF5] rounded-full animate-spin" />
                        Processing Payment…
                      </span>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" /> Pay ₹{finalTotal.toLocaleString("en-IN")}
                      </>
                    )}
                  </Button>

                  {paymentResult === "failure" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/25 text-center">
                      <p className="text-red-400 text-sm font-medium">Payment failed. Please try again.</p>
                    </motion.div>
                  )}

                  <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-[#5D4037]">
                    <span className="flex items-center gap-1"><Lock className="h-3 w-3 text-[#1B5E20]" /> 256-bit SSL</span>
                    <span>Razorpay Secured</span>
                    <span>PCI DSS Compliant</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Step 3: Confirmation ── */}
            {step === 3 && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card-glass rounded-xl p-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-24 h-24 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
                >
                  <Check className="h-12 w-12 text-[#10B981]" />
                </motion.div>
                <h2 className="text-3xl font-black font-outfit text-[#3E2723] mb-2">Order Confirmed! 🎉</h2>
                <p className="text-[#5D4037] mb-2">Thank you for ordering from Thaarwin Enterprises</p>
                <div className="inline-block px-4 py-2 rounded-lg bg-[#1B5E20]/10 border border-[#1B5E20]/20 mb-6">
                  <span className="text-xs text-[#5D4037]">Order ID: </span>
                  <span className="text-sm font-bold text-[#1B5E20]">TW{Date.now().toString().slice(-8)}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-8">
                  <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#1B5E20]/08 text-center">
                    <Truck className="h-5 w-5 text-[#1B5E20] mx-auto mb-1" />
                    <div className="text-xs text-[#5D4037]">Est. Delivery</div>
                    <div className="text-xs font-semibold text-[#3E2723]">3-5 Days</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#1B5E20]/08 text-center">
                    <CreditCard className="h-5 w-5 text-[#1B5E20] mx-auto mb-1" />
                    <div className="text-xs text-[#5D4037]">Paid</div>
                    <div className="text-xs font-semibold text-[#3E2723]">₹{finalTotal.toLocaleString("en-IN")}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#1B5E20]/08 text-center">
                    <Check className="h-5 w-5 text-[#10B981] mx-auto mb-1" />
                    <div className="text-xs text-[#5D4037]">Status</div>
                    <div className="text-xs font-semibold text-[#10B981]">Confirmed</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => router.push("/products")} className="neon-btn text-[#FFFDF5] font-bold px-8 h-11 rounded-xl">
                    Continue Shopping
                  </Button>
                  <Button onClick={() => router.push("/account/orders")} variant="outline" className="h-11 px-8 rounded-xl border-[#1B5E20]/30 text-[#1B5E20] hover:bg-[#1B5E20]/10 font-medium">
                    Track Order
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Summary Sidebar */}
        <div className="hidden lg:block">
          <OrderSummary />
        </div>
      </div>
    </div>
    </>
  );
}
