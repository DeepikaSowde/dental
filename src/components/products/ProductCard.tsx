"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingCart, Eye, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore, useWishlistStore } from "@/lib/store";
import type { Product } from "@/lib/data";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const BADGE_STYLES: Record<string, string> = {
  Bestseller: "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30",
  New:        "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30",
  Deal:       "bg-[#FF6B6B]/15 text-[#FF6B6B] border-[#FF6B6B]/30",
  default:    "bg-[#1B5E20]/15 text-[#1B5E20] border-[#1B5E20]/30",
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { isWishlisted, toggle } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const badgeStyle = BADGE_STYLES[product.badge ?? ""] ?? BADGE_STYLES.default;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    addItem(product);
    toast.success(`Added to cart!`, {
      description: product.name.substring(0, 40) + "…",
      duration: 2000,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle(product);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist", {
      icon: wishlisted ? "💔" : "❤️",
      duration: 1500,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link href={`/products/${product.id}`}>
        <div className="group relative rounded-xl overflow-hidden card-glass transition-all duration-300 hover:shadow-[0_0_32px_rgba(27,94,32,0.12)] cursor-pointer">
          {/* Image Container */}
          <div className="relative aspect-square bg-[#FAF6ED] overflow-hidden">
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
              {product.badge && (
                <Badge className={`text-[10px] font-semibold px-2 py-0.5 border ${badgeStyle}`}>
                  {product.badge}
                </Badge>
              )}
              {discount > 0 && (
                <Badge className="text-[10px] font-semibold px-2 py-0.5 bg-[#1B5E20]/15 text-[#1B5E20] border border-[#1B5E20]/30">
                  -{discount}%
                </Badge>
              )}
              {!product.inStock && (
                <Badge className="text-[10px] font-semibold px-2 py-0.5 bg-red-500/15 text-red-400 border border-red-400/30">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlist}
              className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                wishlisted
                  ? "bg-[#1B5E20]/20 border-[#1B5E20]/50 text-[#1B5E20] shadow-[0_0_10px_rgba(27,94,32,0.4)]"
                  : "bg-[#FFFDF5]/60 border-[#1B5E20]/10 text-[#5D4037] hover:border-[#1B5E20]/40 hover:text-[#1B5E20]"
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${wishlisted ? "fill-current" : ""}`} />
            </button>

            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
            />

            {/* Hover Quick Actions */}
            <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 h-9 neon-btn text-[#FFFDF5] font-semibold text-xs rounded-lg"
              >
                <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-lg border-[#1B5E20]/30 bg-[#FFFDF5]/80 text-[#1B5E20] hover:bg-[#1B5E20]/10"
              >
                <Eye className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="text-[10px] font-semibold text-[#1B5E20]/70 uppercase tracking-wider mb-1.5">
              {product.brand}
            </div>
            <h3 className="text-sm font-medium text-[#3E2723] line-clamp-2 min-h-[2.5rem] group-hover:text-[#3E2723] transition-colors mb-2">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-[#F59E0B] fill-current" : "text-[#374151]"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-[#5D4037]">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-[#3E2723]">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-[#5D4037] line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              {product.inStock && (
                <span className="text-[10px] text-[#10B981] flex items-center gap-0.5">
                  <Zap className="h-2.5 w-2.5" />
                  In Stock
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
