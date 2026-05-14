"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Zap,
  ChevronLeft, ChevronRight, Minus, Plus, Share2, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PRODUCTS } from "@/lib/data";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { ProductCard } from "@/components/products/ProductCard";
import { toast } from "sonner";

interface PageProps { params: Promise<{ id: string }> }

const TABS = ["Description", "Specifications", "Reviews", "Q&A"];

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const product = PRODUCTS.find((p) => p.id === parseInt(id));
  if (!product) notFound();

  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");
  const [activeImg, setActiveImg] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const { isWishlisted, toggle } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  // Simulate multiple images
  const images = [
    product.image,
    product.image.replace("?text=", "?text=View2-"),
    product.image.replace("?text=", "?text=View3-"),
    product.image.replace("?text=", "?text=View4-"),
  ];

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    toast.success("Added to cart!", { description: `${qty}x ${product.name.substring(0, 30)}…` });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#5D4037] mb-8">
        <span className="hover:text-[#1B5E20] cursor-pointer">Home</span>
        <span>/</span>
        <span className="hover:text-[#1B5E20] cursor-pointer">Products</span>
        <span>/</span>
        <span className="hover:text-[#1B5E20] cursor-pointer">{product.category}</span>
        <span>/</span>
        <span className="text-[#1B5E20] line-clamp-1">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* ── Left: Image Gallery ── */}
        <div className="space-y-4">
          {/* Main Image */}
          <motion.div
            key={activeImg}
            initial={{ opacity: 0.7, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="relative aspect-square rounded-2xl overflow-hidden card-glass"
          >
            {product.badge && (
              <Badge className="absolute top-4 left-4 z-10 bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30">
                {product.badge}
              </Badge>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center">
                <span className="text-[#3E2723] font-semibold text-lg">Out of Stock</span>
              </div>
            )}
            <img src={images[activeImg]} alt={product.name} className="w-full h-full object-contain p-10" />
            {/* Nav arrows */}
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FFFFFF]/80 border border-[#1B5E20]/20 flex items-center justify-center text-[#1B5E20] hover:border-[#1B5E20]/50 transition-all"
                  onClick={() => setActiveImg((activeImg - 1 + images.length) % images.length)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FFFFFF]/80 border border-[#1B5E20]/20 flex items-center justify-center text-[#1B5E20] hover:border-[#1B5E20]/50 transition-all"
                  onClick={() => setActiveImg((activeImg + 1) % images.length)}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </motion.div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImg(i)}
                className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                  activeImg === i
                    ? "border-[#1B5E20] shadow-[0_0_12px_rgba(27,94,32,0.4)]"
                    : "border-[#1B5E20]/10 hover:border-[#1B5E20]/35"
                }`}
              >
                <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-contain p-2 bg-[#FFFFFF]" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Product Info ── */}
        <div className="space-y-6">
          {/* Brand + Category */}
          <div className="flex items-center gap-2">
            <Badge className="bg-[#1B5E20]/10 text-[#1B5E20] border border-[#1B5E20]/25 text-xs">{product.category}</Badge>
            <span className="text-xs text-[#5D4037]">by</span>
            <span className="text-xs font-semibold text-[#3E2723]">{product.brand}</span>
          </div>

          {/* Name */}
          <h1 className="text-2xl md:text-3xl font-bold font-outfit text-[#3E2723] leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-[#F59E0B] fill-current" : "text-[#374151]"}`} />
              ))}
              <span className="text-sm font-semibold text-[#3E2723] ml-1">{product.rating}</span>
            </div>
            <span className="text-sm text-[#5D4037]">{product.reviews} reviews</span>
            <button className="flex items-center gap-1 text-sm text-[#1B5E20] hover:text-[#81C784] transition-colors">
              <Share2 className="h-3.5 w-3.5" /> Share
            </button>
          </div>

          {/* Price */}
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#1B5E20]/10">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-[#3E2723]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-[#5D4037] line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                  <Badge className="bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                    Save {discount}%
                  </Badge>
                </>
              )}
            </div>
            <p className="text-xs text-[#5D4037] mt-1">Inclusive of all taxes · GST invoice available</p>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {product.inStock ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                <span className="text-sm text-[#10B981] font-medium">In Stock — Ready to Ship</span>
              </>
            ) : (
              <span className="text-sm text-red-400 font-medium">Out of Stock</span>
            )}
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0 border border-[#1B5E20]/20 rounded-xl overflow-hidden">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-10 h-11 flex items-center justify-center text-[#3E2723] hover:text-[#1B5E20] hover:bg-[#1B5E20]/10 transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 h-11 flex items-center justify-center text-[#3E2723] font-semibold text-sm border-x border-[#1B5E20]/10">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-10 h-11 flex items-center justify-center text-[#3E2723] hover:text-[#1B5E20] hover:bg-[#1B5E20]/10 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 h-11 neon-btn text-[#FFFDF5] font-bold rounded-xl"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>

            <button
              onClick={() => { toggle(product); toast(wishlisted ? "Removed from wishlist" : "Added to wishlist", { icon: wishlisted ? "💔" : "❤️" }); }}
              className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all ${
                wishlisted
                  ? "border-[#1B5E20]/50 bg-[#1B5E20]/15 text-[#1B5E20] shadow-[0_0_12px_rgba(27,94,32,0.3)]"
                  : "border-[#1B5E20]/15 text-[#5D4037] hover:border-[#1B5E20]/40 hover:text-[#1B5E20]"
              }`}
            >
              <Heart className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Buy Now */}
          <Button variant="outline" className="w-full h-11 rounded-xl border-[#1B5E20]/30 text-[#1B5E20] hover:bg-[#1B5E20]/10 font-semibold">
            <Zap className="h-4 w-4 mr-2" /> Buy Now
          </Button>

          <Separator className="bg-[#1B5E20]/08" />

          {/* Trust Signals */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs text-[#5D4037]">
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#FFFFFF] border border-[#1B5E20]/05">
              <Truck className="h-4 w-4 text-[#1B5E20]" />
              Free Delivery above ₹5k
            </div>
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#FFFFFF] border border-[#1B5E20]/05">
              <Shield className="h-4 w-4 text-[#1B5E20]" />
              100% Genuine
            </div>
            <Link href="/refund-cancellation" className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#FFFFFF] border border-[#1B5E20]/05 hover:border-[#1B5E20]/30 hover:shadow-[0_0_12px_rgba(27,94,32,0.1)] transition-all cursor-pointer">
              <RotateCcw className="h-4 w-4 text-[#1B5E20]" />
              <span className="hover:text-[#1B5E20] hover:underline underline-offset-2">Easy Returns</span>
            </Link>
          </div>

          {/* Tags */}
          {product.tags && (
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full border border-[#1B5E20]/10 text-[#5D4037] hover:border-[#1B5E20]/30 hover:text-[#1B5E20] transition-colors cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="mb-16">
        <div className="flex gap-1 border-b border-[#1B5E20]/10 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
                activeTab === tab
                  ? "text-[#1B5E20] border-[#1B5E20]"
                  : "text-[#5D4037] border-transparent hover:text-[#3E2723]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Description" && (
          <div className="card-glass rounded-xl p-6">
            <p className="text-[#3E2723] leading-relaxed mb-4">{product.description}</p>
            <ul className="space-y-2 text-sm text-[#5D4037]">
              {["Medical-grade quality", "ISO certified", "Suitable for professional use only", "Store in cool dry place"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#10B981]" /> {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "Specifications" && (
          <div className="card-glass rounded-xl overflow-hidden">
            {[
              ["Brand", product.brand],
              ["Category", product.category],
              ["Price", `₹${product.price.toLocaleString("en-IN")}`],
              ["Rating", `${product.rating}/5`],
              ["Reviews", `${product.reviews} verified reviews`],
              ["Availability", product.inStock ? "In Stock" : "Out of Stock"],
            ].map(([label, value], i) => (
              <div key={label} className={`flex justify-between px-6 py-4 ${i % 2 === 0 ? "bg-[#1B5E20]/02" : ""}`}>
                <span className="text-sm text-[#5D4037]">{label}</span>
                <span className="text-sm text-[#3E2723] font-medium">{value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Reviews" && (
          <div className="space-y-4">
            {[
              { name: "Dr. Anil Kumar", rating: 5, date: "3 days ago", text: "Exceptional quality! Works perfectly for complex cases." },
              { name: "Dr. Meera Nair", rating: 4, date: "1 week ago", text: "Great product, fast delivery. Would definitely order again." },
              { name: "Dr. Rohit Gupta", rating: 5, date: "2 weeks ago", text: "Best price on the market. 100% genuine, very happy!" },
            ].map((review, i) => (
              <div key={i} className="card-glass rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-[#3E2723] text-sm">{review.name}</div>
                    <div className="text-xs text-[#5D4037]">{review.date}</div>
                  </div>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 text-[#F59E0B] fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[#3E2723]">{review.text}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Q&A" && (
          <div className="card-glass rounded-xl p-6 text-center text-[#5D4037]">
            <p className="text-sm">No questions yet. Be the first to ask!</p>
            <Button className="mt-4 neon-btn text-[#FFFDF5] font-semibold text-sm">Ask a Question</Button>
          </div>
        )}
      </div>

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold font-outfit text-[#3E2723] mb-8">
            Related <span className="gradient-text">Products</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
