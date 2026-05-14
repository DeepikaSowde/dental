"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Building2, Phone, Mail, Users, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function BulkOrderPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-4xl">
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-[#1B5E20]/15 text-[#1B5E20] border border-[#1B5E20]/30">For Dealers & Hospitals</Badge>
        <h1 className="text-4xl font-black font-outfit text-[#3E2723] mb-3">
          Bulk Order & <span className="gradient-text">Dealer Inquiry</span>
        </h1>
        <p className="text-[#5D4037] max-w-xl mx-auto">
          Special pricing for clinics, hospitals, and dealers. Fill the form and our team will contact you within 24 hours.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { icon: Package, label: "Volume Discounts", sub: "Up to 30% off" },
          { icon: Users, label: "Dedicated Support", sub: "Personal account manager" },
          { icon: Building2, label: "Net-30 Credit", sub: "For verified dealers" },
          { icon: Send, label: "Priority Delivery", sub: "Guaranteed SLA" },
        ].map(({ icon: Icon, label, sub }) => (
          <div key={label} className="card-glass rounded-xl p-4 text-center">
            <Icon className="h-6 w-6 text-[#1B5E20] mx-auto mb-2" />
            <div className="text-sm font-semibold text-[#3E2723]">{label}</div>
            <div className="text-xs text-[#5D4037] mt-0.5">{sub}</div>
          </div>
        ))}
      </div>

      {submitted ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card-glass rounded-2xl p-12 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-[#3E2723] mb-2">Inquiry Received!</h2>
          <p className="text-[#5D4037]">Our dealer team will contact you within 24 hours.</p>
        </motion.div>
      ) : (
        <div className="card-glass rounded-2xl p-8">
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { label: "Full Name / Organisation", placeholder: "ABC Dental Supplies Pvt Ltd", type: "text" },
                { label: "Contact Person", placeholder: "Dr. Name / Manager Name", type: "text" },
                { label: "Email Address", placeholder: "business@company.com", type: "email" },
                { label: "Phone Number", placeholder: "+91 98765 43210", type: "tel" },
                { label: "City / State", placeholder: "Mumbai, Maharashtra", type: "text" },
                { label: "Dealer Type", placeholder: "Distributor / Retailer / Hospital", type: "text" },
              ].map(({ label, placeholder, type }) => (
                <div key={label}>
                  <label className="block text-xs font-medium text-[#3E2723] mb-1.5">{label}</label>
                  <input type={type} required placeholder={placeholder} className="w-full h-11 px-4 rounded-xl bg-[#FAF6ED] border border-[#1B5E20]/15 text-[#3E2723] placeholder:text-[#5D4037] text-sm focus:outline-none focus:border-[#1B5E20]/50 transition-all" />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3E2723] mb-1.5">Products / Categories of Interest</label>
              <input type="text" placeholder="e.g., Implants, Rotary Files, Dental Chairs" className="w-full h-11 px-4 rounded-xl bg-[#FAF6ED] border border-[#1B5E20]/15 text-[#3E2723] placeholder:text-[#5D4037] text-sm focus:outline-none focus:border-[#1B5E20]/50 transition-all" />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3E2723] mb-1.5">Estimated Monthly Order Value (₹)</label>
              <select className="w-full h-11 px-4 rounded-xl bg-[#FAF6ED] border border-[#1B5E20]/15 text-[#3E2723] text-sm focus:outline-none focus:border-[#1B5E20]/40">
                <option value="">Select range</option>
                <option>₹10,000 – ₹50,000</option>
                <option>₹50,000 – ₹2,00,000</option>
                <option>₹2,00,000 – ₹5,00,000</option>
                <option>₹5,00,000+</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3E2723] mb-1.5">Additional Notes</label>
              <textarea rows={4} placeholder="Tell us more about your requirements..." className="w-full px-4 py-3 rounded-xl bg-[#FAF6ED] border border-[#1B5E20]/15 text-[#3E2723] placeholder:text-[#5D4037] text-sm focus:outline-none focus:border-[#1B5E20]/50 transition-all resize-none" />
            </div>

            <Button type="submit" className="w-full h-12 neon-btn text-[#FFFDF5] font-bold rounded-xl text-base">
              <Send className="h-4 w-4 mr-2" /> Submit Inquiry
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
