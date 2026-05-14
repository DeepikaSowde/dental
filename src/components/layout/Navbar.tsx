"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, Heart, User, Search, Menu, X, ChevronDown,
  Phone, Truck, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/lib/data";

const NAV_LINKS = [
  { label: "Categories", href: "/categories", hasDropdown: true },
  { label: "Brands", href: "/brands" },
  { label: "Deals", href: "/deals", isHot: true },
  { label: "Clinic Packages", href: "/packages" },
  { label: "Bulk Order", href: "/bulk-order" },
];

export function Navbar() {
  const cartCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#1B5E20]/10 via-[#81C784]/10 to-[#00796B]/10 border-b border-[#1B5E20]/10 py-1.5 text-center text-xs text-[#3E2723]">
        <span className="flex items-center justify-center gap-6">
          <span className="flex items-center gap-1.5"><Truck className="h-3 w-3 text-[#1B5E20]" /> Free Shipping on orders above ₹5000</span>
          <span className="hidden sm:flex items-center gap-1.5"><Shield className="h-3 w-3 text-[#1B5E20]" /> 100% Genuine Products</span>
          <span className="hidden md:flex items-center gap-1.5"><Phone className="h-3 w-3 text-[#1B5E20]" /> +91 98765 43210</span>
        </span>
      </div>

      {/* Main Navbar */}
      <motion.header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#FFFDF5]/95 backdrop-blur-xl border-b border-[#1B5E20]/15 shadow-[0_4px_30px_rgba(27,94,32,0.08)]"
            : "bg-[#FFFDF5]/80 backdrop-blur-md border-b border-[#1B5E20]/08"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Mobile Menu + Logo */}
            <div className="flex items-center gap-3">
              {/* Mobile Sheet */}
              <Sheet>
                <SheetTrigger
                  render={
                    <button
                      type="button"
                      aria-label="Open menu"
                      className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md text-[#3E2723] hover:text-[#1B5E20] hover:bg-[#1B5E20]/10 transition-colors"
                    />
                  }
                >
                  <Menu className="h-5 w-5" />
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] bg-[#FFFFFF] border-r border-[#1B5E20]/15 p-0">
                  <div className="p-6 border-b border-[#1B5E20]/10">
                    <Link href="/" className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#1B5E20]/30 shadow-[0_0_10px_rgba(27,94,32,0.4)]">
                        <Image src="/logo.jpeg" alt="Thaarwin Logo" fill sizes="40px" className="object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-[#3E2723] text-sm">Thaarwin</div>
                        <div className="text-[10px] text-[#1B5E20]">The Dental Marker Space</div>
                      </div>
                    </Link>
                  </div>
                  <nav className="flex flex-col p-4">
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="flex items-center gap-2 px-3 py-3 rounded-lg text-[#3E2723] hover:text-[#1B5E20] hover:bg-[#1B5E20]/08 transition-colors text-sm font-medium"
                      >
                        {link.label}
                        {link.isHot && (
                          <Badge className="ml-auto text-[9px] bg-[#FF6B6B]/20 text-[#FF6B6B] border border-[#FF6B6B]/30 px-1.5 py-0">HOT</Badge>
                        )}
                      </Link>
                    ))}
                  </nav>
                  <div className="p-4 border-t border-[#1B5E20]/10">
                    <Link href="/auth/login">
                      <Button className="w-full neon-btn text-[#FFFDF5] font-semibold">Login / Sign Up</Button>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                {/* Real logo with glow */}
                <div className="relative w-9 h-9">
                  <div className="absolute inset-0 rounded-full bg-[#1B5E20]/20 blur-md group-hover:bg-[#1B5E20]/40 transition-all duration-300" />
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#1B5E20]/30 shadow-[0_0_12px_rgba(27,94,32,0.5)] group-hover:shadow-[0_0_20px_rgba(27,94,32,0.9)] transition-all duration-300">
                    <Image src="/logo.jpeg" alt="Thaarwin Enterprises" fill sizes="36px" className="object-cover" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-[#3E2723] font-bold text-base leading-tight tracking-wide group-hover:text-glow transition-all">
                    Thaarwin
                  </div>
                  <div className="text-[10px] text-[#1B5E20]/70 tracking-widest uppercase">
                    Enterprises
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="relative">
                  {link.hasDropdown ? (
                    <button
                      className="flex items-center gap-1 px-3 py-2 rounded-lg text-[#3E2723] hover:text-[#1B5E20] hover:bg-[#1B5E20]/08 transition-all text-sm font-medium group"
                      onMouseEnter={() => setCategoryOpen(true)}
                      onMouseLeave={() => setCategoryOpen(false)}
                    >
                      {link.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-[#3E2723] hover:text-[#1B5E20] hover:bg-[#1B5E20]/08 transition-all text-sm font-medium"
                    >
                      {link.label}
                      {link.isHot && (
                        <Badge className="text-[9px] bg-[#FF6B6B]/20 text-[#FF6B6B] border border-[#FF6B6B]/30 px-1 py-0 leading-4">HOT</Badge>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-sm relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1B5E20]/60" />
              <input
                type="search"
                placeholder="Search dental products..."
                className="w-full h-10 pl-10 pr-4 rounded-full bg-[#FAF6ED] border border-[#1B5E20]/15 text-[#3E2723] placeholder:text-[#5D4037] text-sm focus:outline-none focus:border-[#1B5E20]/50 focus:shadow-[0_0_16px_rgba(27,94,32,0.15)] transition-all"
              />
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-[#3E2723] hover:text-[#1B5E20] hover:bg-[#1B5E20]/10"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>

              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="relative text-[#3E2723] hover:text-[#1B5E20] hover:bg-[#1B5E20]/10">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#1B5E20] text-[#FFFDF5] text-[10px] font-bold flex items-center justify-center shadow-[0_0_8px_rgba(27,94,32,0.8)]"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </Button>
              </Link>

              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative text-[#3E2723] hover:text-[#1B5E20] hover:bg-[#1B5E20]/10">
                  <ShoppingCart className="h-5 w-5" />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span
                        key={cartCount}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#1B5E20] text-[#FFFDF5] text-[10px] font-bold flex items-center justify-center shadow-[0_0_8px_rgba(27,94,32,0.8)]"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </Link>

              <Link href="/auth/login" className="hidden sm:block">
                <Button
                  size="sm"
                  className="neon-btn text-[#FFFDF5] font-semibold text-xs px-4 h-9 rounded-full"
                >
                  <User className="h-3.5 w-3.5 mr-1.5" />
                  Login
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden pb-3"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1B5E20]/60" />
                  <input
                    autoFocus
                    type="search"
                    placeholder="Search dental products, brands..."
                    className="w-full h-10 pl-10 pr-10 rounded-full bg-[#FAF6ED] border border-[#1B5E20]/20 text-[#3E2723] placeholder:text-[#5D4037] text-sm focus:outline-none focus:border-[#1B5E20]/50 transition-all"
                  />
                  <button onClick={() => setSearchOpen(false)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5D4037] hover:text-[#1B5E20]">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mega Category Dropdown */}
        <AnimatePresence>
          {categoryOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute top-full left-0 right-0 bg-[#FFFFFF]/98 backdrop-blur-xl border-b border-[#1B5E20]/15 shadow-[0_8px_40px_rgba(27,94,32,0.1)] z-40"
              onMouseEnter={() => setCategoryOpen(true)}
              onMouseLeave={() => setCategoryOpen(false)}
            >
              <div className="container mx-auto px-8 py-6">
                <div className="grid grid-cols-4 gap-3">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/categories/${cat.slug}`}
                      className="flex items-center gap-3 p-3 rounded-xl border border-[#1B5E20]/08 hover:border-[#1B5E20]/30 hover:bg-[#1B5E20]/05 transition-all group"
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-[#3E2723] group-hover:text-[#1B5E20] transition-colors">{cat.name}</div>
                        <div className="text-xs text-[#5D4037]">{cat.count} products</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
