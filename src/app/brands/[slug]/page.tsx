"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BRANDS, PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/products/ProductCard";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BrandPage({ params }: PageProps) {
  const { slug } = use(params);
  // Convert slug back to brand name (e.g. "3m-espe" → "3M ESPE")
  const brand = BRANDS.find(
    (b) => b.toLowerCase().replace(/\s+/g, "-") === slug
  );
  if (!brand) notFound();

  const products = PRODUCTS.filter((p) => p.brand === brand);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#5D4037] mb-8">
        <Link href="/" className="hover:text-[#1B5E20] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/brands" className="hover:text-[#1B5E20] transition-colors">Brands</Link>
        <span>/</span>
        <span className="text-[#1B5E20]">{brand}</span>
      </div>

      {/* Brand Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-10 p-8 border border-[#1B5E20]/10 bg-gradient-to-r from-[#1B5E20]/05 to-[#FFFFFF]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1B5E20]/40 to-transparent" />
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-[#FFFDF5]/80 border border-[#1B5E20]/25 flex items-center justify-center shadow-[0_0_24px_rgba(27,94,32,0.15)]">
            <span className="text-4xl font-black text-[#1B5E20]">{brand[0]}</span>
          </div>
          <div>
            <Badge className="mb-2 bg-[#1B5E20]/10 text-[#1B5E20] border border-[#1B5E20]/25 text-[10px]">
              {products.length} products
            </Badge>
            <h1 className="text-3xl font-black font-outfit text-[#3E2723]">{brand}</h1>
            <p className="text-[#5D4037] text-sm mt-1">
              Authorised dealer · 100% genuine products
            </p>
          </div>
        </div>
      </div>

      {/* Back link */}
      <Link
        href="/brands"
        className="inline-flex items-center gap-2 text-sm text-[#5D4037] hover:text-[#1B5E20] transition-colors mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All Brands
      </Link>

      {/* Products */}
      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📦</div>
          <h2 className="text-xl font-bold text-[#3E2723] mb-2">Coming Soon</h2>
          <p className="text-[#5D4037] text-sm">
            {brand} products are being listed. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
