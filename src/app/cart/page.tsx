"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, Tag, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";

export default function CartPage() {
  const {
    items, removeItem, updateQuantity, clearCart,
    couponCode, couponDiscount, applyCoupon, removeCoupon,
    getSubtotal, getTotal,
  } = useCartStore();
  const [couponInput, setCouponInput] = useState("");

  const subtotal = getSubtotal();
  const total = getTotal();
  const shipping = subtotal >= 5000 ? 0 : 149;
  const discountAmount = (subtotal * couponDiscount) / 100;

  const handleApplyCoupon = () => {
    const ok = applyCoupon(couponInput);
    if (ok) toast.success(`Coupon applied! ${couponDiscount}% off`);
    else toast.error("Invalid coupon code. Try THAARWIN10");
    setCouponInput("");
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-7xl mb-6">🛒</div>
          <h2 className="text-2xl font-bold text-[#3E2723] mb-3">Your cart is empty</h2>
          <p className="text-[#5D4037] mb-8">Add some dental products to get started!</p>
          <Link href="/products">
            <Button className="neon-btn text-[#FFFDF5] font-bold px-10 h-12 rounded-xl">
              Shop Now <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-outfit text-[#3E2723]">
          Your <span className="gradient-text">Cart</span>
        </h1>
        <p className="text-[#5D4037] mt-1">{items.length} item{items.length !== 1 ? "s" : ""} in your cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: i * 0.05 }}
              className="card-glass rounded-xl p-4 sm:p-5 flex gap-4"
            >
              {/* Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#FAF6ED] border border-[#1B5E20]/10 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-[#1B5E20]/70 uppercase tracking-wider mb-1">{item.brand}</div>
                <h3 className="text-sm font-medium text-[#3E2723] line-clamp-2 mb-3">{item.name}</h3>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  {/* Qty control */}
                  <div className="flex items-center gap-0 border border-[#1B5E20]/20 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#3E2723] hover:text-[#1B5E20] hover:bg-[#1B5E20]/10 transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-10 h-8 flex items-center justify-center text-[#3E2723] font-semibold text-sm border-x border-[#1B5E20]/10">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#3E2723] hover:text-[#1B5E20] hover:bg-[#1B5E20]/10 transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Price + Remove */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-base font-bold text-[#3E2723]">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-xs text-[#5D4037]">₹{item.price.toLocaleString("en-IN")} each</div>
                      )}
                    </div>
                    <button
                      onClick={() => { removeItem(item.id); toast("Removed from cart", { icon: "🗑️" }); }}
                      className="w-8 h-8 rounded-lg border border-red-500/20 bg-red-500/05 text-red-400 hover:bg-red-500/15 hover:border-red-500/40 flex items-center justify-center transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Clear Cart */}
          <div className="flex justify-end">
            <button
              onClick={() => { clearCart(); toast("Cart cleared"); }}
              className="text-sm text-red-400 hover:text-red-300 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="h-3.5 w-3.5" /> Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          {/* Coupon */}
          <div className="card-glass rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[#3E2723] mb-4 flex items-center gap-2">
              <Tag className="h-4 w-4 text-[#1B5E20]" /> Apply Coupon
            </h3>
            {couponCode ? (
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#10B981]/10 border border-[#10B981]/25">
                <div>
                  <div className="text-sm font-semibold text-[#10B981]">{couponCode}</div>
                  <div className="text-xs text-[#5D4037]">{couponDiscount}% discount applied</div>
                </div>
                <button onClick={removeCoupon} className="text-xs text-red-400 hover:text-red-300">Remove</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code"
                  className="flex-1 h-9 px-3 rounded-lg bg-[#FAF6ED] border border-[#1B5E20]/15 text-[#3E2723] placeholder:text-[#5D4037] text-xs focus:outline-none focus:border-[#1B5E20]/40 transition-all"
                  onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                />
                <Button onClick={handleApplyCoupon} size="sm" className="neon-btn text-[#FFFDF5] font-semibold text-xs h-9 px-4 rounded-lg">
                  Apply
                </Button>
              </div>
            )}
            <p className="text-[10px] text-[#5D4037] mt-2">Try: THAARWIN10, DENTAL20, FIRSTORDER</p>
          </div>

          {/* Summary */}
          <div className="card-glass rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[#3E2723] mb-5 flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-[#1B5E20]" /> Order Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[#3E2723]">
                <span>Subtotal ({items.length} items)</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-[#10B981]">
                  <span>Coupon Discount ({couponDiscount}%)</span>
                  <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between text-[#3E2723]">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-[#10B981]" : ""}>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-[10px] text-[#5D4037]">Add ₹{(5000 - subtotal).toLocaleString("en-IN")} more for free shipping</p>
              )}
            </div>

            <Separator className="my-4 bg-[#1B5E20]/08" />

            <div className="flex justify-between items-baseline mb-6">
              <span className="text-base font-semibold text-[#3E2723]">Total</span>
              <div className="text-right">
                <div className="text-2xl font-black text-[#3E2723]">
                  ₹{(total + shipping).toLocaleString("en-IN")}
                </div>
                <div className="text-xs text-[#5D4037]">Incl. all taxes</div>
              </div>
            </div>

            <Link href="/checkout">
              <Button className="w-full h-12 neon-btn text-[#FFFDF5] font-bold rounded-xl text-base">
                Proceed to Checkout
                <ChevronRight className="h-5 w-5 ml-1" />
              </Button>
            </Link>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#5D4037]">
              <span>🔒</span> Secure 256-bit SSL encrypted checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
