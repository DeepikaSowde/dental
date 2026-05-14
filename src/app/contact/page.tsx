"use client";

import Link from "next/link";
import { ChevronRight, MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF5] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-[#5D4037] mb-8">
          <Link href="/" className="hover:text-[#1B5E20] transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 text-[#D7CEC3]" />
          <span className="text-[#3E2723] font-medium">Contact Us</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div>
            <h1 className="text-4xl font-bold font-outfit text-[#3E2723] mb-4">Get in Touch</h1>
            <p className="text-[#5D4037] mb-10 text-lg">
              Have questions about an order, bulk pricing, or clinic setup? Our team is here to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1B5E20]/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-[#1B5E20]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#3E2723] mb-1">Principal Place of Business</h3>
                  <p className="text-[#5D4037]">Ground Floor, 29/B/41, Thiyagaraja Street<br/>Puducherry - 605001</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1B5E20]/10 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-[#1B5E20]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#3E2723] mb-1">Phone</h3>
                  <p className="text-[#5D4037]">+91 98765 43210</p>
                  <p className="text-xs text-[#81C784] mt-1">Mon-Sat, 9am to 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1B5E20]/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-[#1B5E20]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#3E2723] mb-1">Email</h3>
                  <p className="text-[#5D4037]">support@thaarwin.com</p>
                  <p className="text-[#5D4037]">sales@thaarwin.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#FFFFFF] rounded-3xl p-8 border border-[#D7CEC3]/60 shadow-[0_4px_20px_rgba(27,94,32,0.05)]">
            <h2 className="text-2xl font-semibold text-[#3E2723] mb-6">Send us a Message</h2>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#3E2723] mb-2 uppercase tracking-wide">First Name</label>
                  <input type="text" className="w-full h-12 px-4 rounded-xl bg-[#FAF6ED] border border-[#D7CEC3] focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3E2723] mb-2 uppercase tracking-wide">Last Name</label>
                  <input type="text" className="w-full h-12 px-4 rounded-xl bg-[#FAF6ED] border border-[#D7CEC3] focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#3E2723] mb-2 uppercase tracking-wide">Email</label>
                <input type="email" className="w-full h-12 px-4 rounded-xl bg-[#FAF6ED] border border-[#D7CEC3] focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#3E2723] mb-2 uppercase tracking-wide">Message</label>
                <textarea rows={4} className="w-full p-4 rounded-xl bg-[#FAF6ED] border border-[#D7CEC3] focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] outline-none transition-all resize-none"></textarea>
              </div>
              <Button className="w-full h-12 bg-[#1B5E20] hover:bg-[#00796B] text-white font-bold rounded-xl mt-4">
                <Send className="h-4 w-4 mr-2" /> Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
