"use client";

import { motion } from "framer-motion";
import { ArrowRight, Tag, Zap, Timer } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCTS } from "@/lib/data";

const DEALS = PRODUCTS.filter(p => p.originalPrice > p.price);

export default function DealsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-12 p-10 border border-[#1B5E20]/15 bg-gradient-to-r from-[#1B5E20]/08 via-[#FFFFFF] to-[#00796B]/08">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1B5E20]/40 to-transparent" />
        <Badge className="mb-4 bg-[#FF6B6B]/15 text-[#FF6B6B] border border-[#FF6B6B]/30">
          <Zap className="h-3 w-3 mr-1" /> Limited Time Deals
        </Badge>
        <h1 className="text-4xl font-black font-outfit text-[#3E2723] mb-3">
          Exclusive <span className="gradient-text">Deals & Offers</span>
        </h1>
        <p className="text-[#5D4037] max-w-lg">
          Up to 25% off on premium dental supplies. Genuine products, guaranteed savings.
        </p>
        <div className="flex items-center gap-3 mt-6">
          <Timer className="h-5 w-5 text-[#1B5E20]" />
          <span className="text-sm text-[#3E2723]">Deals reset every 24 hours</span>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold font-outfit text-[#3E2723]">
          Today's <span className="gradient-text">Deals</span>
        </h2>
        <p className="text-[#5D4037] mt-1">{DEALS.length} deals available</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {DEALS.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </div>
  );
}
