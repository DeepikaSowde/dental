"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, Clock, Award, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/products/ProductCard";
import { CATEGORIES, BRANDS, PRODUCTS, BEST_SELLERS, NEW_ARRIVALS } from "@/lib/data";

// ─── Section Heading ─────────────────────────────────────────────────────────
function SectionHeading({ label, title, accent }: { label: string; title: string; accent?: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
      <div>
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="h-px w-6 bg-[#1B5E20]" />
          <span className="text-xs font-semibold text-[#1B5E20] uppercase tracking-widest">{label}</span>
          <span className="h-px w-6 bg-[#1B5E20]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold font-outfit text-[#3E2723]">
          {title}{" "}
          {accent && <span className="gradient-text">{accent}</span>}
        </h2>
      </div>
      <Link
        href="/products"
        className="group flex items-center gap-2 text-sm font-medium text-[#1B5E20] hover:text-[#81C784] transition-colors whitespace-nowrap"
      >
        View All
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col gap-0">

      {/* ─── Hero Section ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden scanline-overlay">
        {/* Animated background orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#1B5E20]/08 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#00796B]/06 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1B5E20]/02 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left – Copy */}
            <motion.div
              className="flex-1 space-y-8 text-center lg:text-left"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#1B5E20]/25 bg-[#1B5E20]/08"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Zap className="h-3.5 w-3.5 text-[#1B5E20]" />
                <span className="text-xs text-[#3E2723] font-medium">Trusted by 10,000+ Dental Professionals</span>
              </motion.div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-outfit tracking-tight leading-none">
                  <span className="text-[#3E2723]">The</span>
                  <br />
                  <span className="gradient-text text-glow">Dental Marker</span>
                  <br />
                  <span className="text-[#3E2723]">Space</span>
                </h1>
                <p className="text-lg text-[#5D4037] max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Premium dental supplies, equipment & materials — sourced from the world's best brands, delivered to your clinic's doorstep.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-lg mx-auto lg:mx-0">
                <input
                  type="search"
                  placeholder="Search implants, handpieces, composites..."
                  className="w-full h-14 pl-6 pr-36 rounded-2xl bg-[#FFFFFF] border border-[#1B5E20]/20 text-[#3E2723] placeholder:text-[#5D4037] text-sm focus:outline-none focus:border-[#1B5E20]/50 focus:shadow-[0_0_24px_rgba(27,94,32,0.15)] transition-all shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                />
                <Button className="absolute right-2 top-2 h-10 px-5 neon-btn text-[#FFFDF5] font-semibold text-sm rounded-xl">
                  Search
                </Button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {["Implants", "Rotary Files", "Handpiece", "Composites", "Orthodontic"].map((tag) => (
                  <Link key={tag} href={`/search?q=${tag}`}>
                    <span className="px-3 py-1.5 text-xs rounded-full border border-[#1B5E20]/15 bg-[#1B5E20]/05 text-[#3E2723] hover:border-[#1B5E20]/40 hover:text-[#1B5E20] hover:bg-[#1B5E20]/10 transition-all cursor-pointer">
                      {tag}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Right – Glow hero visual */}
            <motion.div
              className="flex-1 relative hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-[420px] h-[420px]">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full border border-[#1B5E20]/20 animate-spin" style={{ animationDuration: "20s" }} />
                <div className="absolute inset-4 rounded-full border border-[#1B5E20]/10 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
                {/* Center logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-56 h-56">
                    <div className="absolute inset-0 rounded-full bg-[#1B5E20]/15 blur-2xl" />
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#FFFFFF] to-[#FAF6ED] border border-[#1B5E20]/30 flex items-center justify-center shadow-[0_0_60px_rgba(27,94,32,0.2)] overflow-hidden">
                      <Image
                        src="/logo.jpeg"
                        alt="Thaarwin Enterprises"
                        fill
                        sizes="224px"
                        className="object-cover scale-90 rounded-full"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Floating stat cards */}
                {[
                  { label: "Products", value: "10K+", pos: "top-0 right-0" },
                  { label: "Brands", value: "200+", pos: "bottom-8 left-0" },
                  { label: "Clinics", value: "5K+", pos: "bottom-0 right-8" },
                ].map(({ label, value, pos }) => (
                  <motion.div
                    key={label}
                    className={`absolute ${pos} card-glass rounded-xl px-4 py-3 text-center border border-[#1B5E20]/15`}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 3 + Math.random() * 2, ease: "easeInOut" }}
                  >
                    <div className="text-lg font-bold gradient-text">{value}</div>
                    <div className="text-xs text-[#5D4037]">{label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Trust Badges ──────────────────────────────────────────────────── */}
      <section className="border-y border-[#1B5E20]/08 bg-[#FFFFFF]/50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[#1B5E20]/08">
            {[
              { icon: ShieldCheck, title: "100% Genuine", sub: "Verified authentic products" },
              { icon: Truck, title: "Free Shipping", sub: "On orders above ₹5,000" },
              { icon: Clock, title: "Express Delivery", sub: "Pan-India within 48 hrs" },
              { icon: Award, title: "1-Year Warranty", sub: "On all equipment" },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex flex-col items-center text-center gap-2.5 px-6 py-4 group hover:bg-[#1B5E20]/03 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#1B5E20]/10 flex items-center justify-center group-hover:bg-[#1B5E20]/15 group-hover:shadow-[0_0_16px_rgba(27,94,32,0.2)] transition-all">
                  <Icon className="h-5 w-5 text-[#1B5E20]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#3E2723]">{title}</div>
                  <div className="text-xs text-[#5D4037] mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Categories ────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading label="Explore" title="Shop by" accent="Category" />
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/categories/${cat.slug}`}>
                <div className="group relative p-4 rounded-xl border border-[#1B5E20]/08 bg-[#FFFFFF]/60 hover:border-[#1B5E20]/35 hover:shadow-[0_0_20px_rgba(27,94,32,0.1)] transition-all cursor-pointer text-center">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                  <div className="text-xs font-semibold text-[#3E2723] group-hover:text-[#1B5E20] transition-colors leading-tight">{cat.name}</div>
                  <div className="text-[10px] text-[#5D4037] mt-0.5">{cat.count} items</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Flash Deals Banner ──────────────────────────────────────────────── */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B5E20]/05 via-[#FFFFFF] to-[#00796B]/05" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1B5E20]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1B5E20]/30 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <Badge className="mb-3 bg-[#FF6B6B]/15 text-[#FF6B6B] border border-[#FF6B6B]/30 text-xs">⚡ Limited Time</Badge>
              <h2 className="text-3xl md:text-4xl font-black font-outfit text-[#3E2723]">Flash <span className="gradient-text">Deals</span></h2>
              <p className="text-[#5D4037] mt-2">Up to 25% off on select professional tools</p>
            </div>
            <div className="flex gap-4 text-center">
              {["08", "14", "32"].map((val, i) => (
                <div key={i} className="flex flex-col">
                  <div className="w-14 h-14 rounded-xl bg-[#FFFFFF] border border-[#1B5E20]/20 flex items-center justify-center text-2xl font-black text-[#1B5E20] shadow-[0_0_16px_rgba(27,94,32,0.15)]">
                    {val}
                  </div>
                  <div className="text-[10px] text-[#5D4037] mt-1">{["HRS", "MIN", "SEC"][i]}</div>
                </div>
              ))}
            </div>
            <Link href="/deals">
              <Button className="neon-btn text-[#FFFDF5] font-bold px-8 h-12 rounded-xl">
                Shop Deals
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Best Sellers ──────────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading label="Top Picks" title="Best" accent="Sellers" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BEST_SELLERS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ─── Top Brands ─────────────────────────────────────────────────────── */}
      <section className="py-16 border-y border-[#1B5E20]/08 bg-[#FFFFFF]/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Partners" title="Trusted" accent="Brands" />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {BRANDS.map((brand, i) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/brands/${brand.toLowerCase().replace(/\s+/g, "-")}`}>
                  <div className="group h-16 rounded-xl border border-[#1B5E20]/08 bg-[#FFFFFF] flex items-center justify-center hover:border-[#1B5E20]/30 hover:shadow-[0_0_16px_rgba(27,94,32,0.08)] transition-all">
                    <span className="text-xs font-semibold text-[#5D4037] group-hover:text-[#1B5E20] transition-colors text-center px-2 leading-tight">
                      {brand}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── New Arrivals ────────────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading label="Just In" title="New" accent="Arrivals" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.slice(3, 7).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-[#1B5E20]/08 bg-gradient-to-b from-[#FFFDF5] to-[#FFFFFF]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-[#1B5E20]" />
              <span className="text-xs font-semibold text-[#1B5E20] uppercase tracking-widest">Testimonials</span>
              <span className="h-px w-6 bg-[#1B5E20]" />
            </div>
            <h2 className="text-3xl font-bold font-outfit text-[#3E2723]">
              Trusted by <span className="gradient-text">Professionals</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Dr. Priya Sharma", role: "BDS, MDS – Prosthodontist", rating: 5, text: "Thaarwin is my go-to for implant systems. Fast delivery, genuine products, and the pricing is unbeatable for my clinic." },
              { name: "Dr. Arjun Mehta", role: "Dental Surgeon, Delhi", rating: 5, text: "Ordered ProTaper Gold files at 3 AM and they arrived before my first patient. The neon website makes browsing actually enjoyable!" },
              { name: "Dr. Kavitha Reddy", role: "Orthodontist, Hyderabad", rating: 5, text: "Bulk orders for our chain of clinics are seamless. Dedicated dealer support and authentic products every single time." },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-glass rounded-xl p-6 hover:border-[#1B5E20]/25 transition-all"
              >
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, s) => (
                    <Star key={s} className="h-4 w-4 text-[#F59E0B] fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#3E2723] leading-relaxed mb-5 italic">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1B5E20]/30 to-[#81C784]/30 border border-[#1B5E20]/20 flex items-center justify-center text-[#1B5E20] font-bold text-sm">
                    {review.name[3]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#3E2723]">{review.name}</div>
                    <div className="text-xs text-[#5D4037]">{review.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B5E20]/08 via-[#00796B]/05 to-[#81C784]/08" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%231B5E20%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-[#1B5E20]/15 text-[#1B5E20] border border-[#1B5E20]/30">For Clinics & Dealers</Badge>
            <h2 className="text-4xl font-black font-outfit text-[#3E2723] mb-4">
              Setting Up a New <span className="gradient-text">Clinic?</span>
            </h2>
            <p className="text-[#5D4037] max-w-2xl mx-auto mb-8 text-lg">
              Get curated Clinic Setup Packages with the best dental chair units, sterilization, imaging, and consumables — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/packages">
                <Button className="neon-btn text-[#FFFDF5] font-bold px-10 h-12 rounded-xl text-sm">
                  Explore Clinic Packages
                </Button>
              </Link>
              <Link href="/bulk-order">
                <Button variant="outline" className="h-12 px-10 rounded-xl border-[#1B5E20]/30 text-[#1B5E20] hover:bg-[#1B5E20]/10 text-sm font-medium">
                  Dealer / Bulk Inquiry
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
