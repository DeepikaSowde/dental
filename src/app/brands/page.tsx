"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BRANDS, PRODUCTS } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function BrandsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold font-outfit text-[#3E2723]">
          Top <span className="gradient-text">Brands</span>
        </h1>
        <p className="text-[#5D4037] mt-1">Authorized dealer for 200+ premium dental brands</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {BRANDS.map((brand, i) => {
          const count = PRODUCTS.filter(p => p.brand === brand).length;
          return (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link href={`/brands/${brand.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="group card-glass rounded-xl p-6 text-center hover:border-[#1B5E20]/35 hover:shadow-[0_0_24px_rgba(27,94,32,0.1)] transition-all cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1B5E20]/10 to-[#81C784]/10 border border-[#1B5E20]/20 flex items-center justify-center mx-auto mb-4 group-hover:border-[#1B5E20]/40 group-hover:shadow-[0_0_16px_rgba(27,94,32,0.2)] transition-all">
                    <span className="text-2xl font-black text-[#1B5E20]">{brand[0]}</span>
                  </div>
                  <h3 className="font-semibold text-[#3E2723] text-sm mb-1 group-hover:text-[#1B5E20] transition-colors">{brand}</h3>
                  <p className="text-xs text-[#5D4037]">{count > 0 ? `${count} products` : "View products"}</p>
                  <div className="flex items-center justify-center gap-1 mt-3 text-[#1B5E20] opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium">
                    Shop <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
