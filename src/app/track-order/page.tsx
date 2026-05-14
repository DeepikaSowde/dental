"use client";

import Link from "next/link";
import { Package, Truck, CheckCircle, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF5] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-[#5D4037] mb-8">
          <Link href="/" className="hover:text-[#1B5E20] transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 text-[#D7CEC3]" />
          <span className="text-[#3E2723] font-medium">Track Order</span>
        </nav>

        <div className="bg-[#FFFFFF] rounded-2xl p-8 md:p-12 border border-[#D7CEC3]/60 shadow-[0_4px_20px_rgba(27,94,32,0.05)] text-center">
          <div className="w-16 h-16 rounded-full bg-[#1B5E20]/10 flex items-center justify-center mx-auto mb-6">
            <Package className="h-8 w-8 text-[#1B5E20]" />
          </div>
          
          <h1 className="text-3xl font-bold font-outfit text-[#3E2723] mb-4">Track Your Order</h1>
          <p className="text-[#5D4037] mb-8 max-w-md mx-auto">
            Enter your Order ID and Phone Number to check the current status of your delivery.
          </p>

          <form className="space-y-5 max-w-sm mx-auto text-left" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-semibold text-[#3E2723] mb-2 uppercase tracking-wide">Order ID</label>
              <input 
                type="text" 
                placeholder="e.g. TW12345678" 
                className="w-full h-12 px-4 rounded-xl bg-[#FAF6ED] border border-[#D7CEC3] text-[#3E2723] focus:outline-none focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#3E2723] mb-2 uppercase tracking-wide">Phone Number / Email</label>
              <input 
                type="text" 
                placeholder="Enter details" 
                className="w-full h-12 px-4 rounded-xl bg-[#FAF6ED] border border-[#D7CEC3] text-[#3E2723] focus:outline-none focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] transition-all"
              />
            </div>
            
            <Button className="w-full h-12 bg-[#1B5E20] hover:bg-[#00796B] text-white font-bold rounded-xl mt-4">
              <Search className="h-4 w-4 mr-2" /> Track Order
            </Button>
          </form>
          
          <div className="mt-10 pt-8 border-t border-[#D7CEC3]/50">
            <p className="text-sm text-[#5D4037]">
              Can't find your Order ID? Check the confirmation email sent to you, or <Link href="/contact" className="text-[#00796B] hover:text-[#1B5E20] font-medium underline underline-offset-4">contact support</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
