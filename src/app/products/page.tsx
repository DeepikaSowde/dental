"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Grid3X3, List, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCTS, CATEGORIES, BRANDS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

const SORT_OPTIONS = [
  "Relevance",
  "Price: Low to High",
  "Price: High to Low",
  "Newest First",
  "Best Rated",
  "Most Reviewed",
];

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("Relevance");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filter logic
  let filtered = PRODUCTS.filter((p) => {
    const catOk = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const brandOk = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
    const priceOk = p.price >= priceRange[0] && p.price <= priceRange[1];
    const stockOk = !inStockOnly || p.inStock;
    return catOk && brandOk && priceOk && stockOk;
  });

  // Sort
  if (sortBy === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "Best Rated") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (sortBy === "Most Reviewed") filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);

  const toggleCategory = (cat: string) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const toggleBrand = (b: string) =>
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold text-[#3E2723] mb-4 flex items-center gap-2">
          <span className="w-1 h-3 rounded-full bg-[#1B5E20]" /> Price Range
        </h3>
        <Slider
          value={priceRange}
          onValueChange={(v) => setPriceRange(v)}
          min={0}
          max={20000}
          step={500}
          className="mb-3"
        />
        <div className="flex justify-between text-xs text-[#5D4037]">
          <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
          <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-[#3E2723] mb-4 flex items-center gap-2">
          <span className="w-1 h-3 rounded-full bg-[#1B5E20]" /> Categories
        </h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label key={cat.slug} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => toggleCategory(cat.name)}
                className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all ${
                  selectedCategories.includes(cat.name)
                    ? "bg-[#1B5E20] border-[#1B5E20] shadow-[0_0_8px_rgba(27,94,32,0.6)]"
                    : "border-[#1B5E20]/25 bg-transparent hover:border-[#1B5E20]/50"
                }`}
              >
                {selectedCategories.includes(cat.name) && (
                  <svg className="w-2.5 h-2.5 text-[#FFFDF5]" viewBox="0 0 10 10" fill="currentColor">
                    <path d="M8.5 2L4 7.5 1.5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-[#3E2723] group-hover:text-[#1B5E20] transition-colors">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-sm font-semibold text-[#3E2723] mb-4 flex items-center gap-2">
          <span className="w-1 h-3 rounded-full bg-[#1B5E20]" /> Brands
        </h3>
        <div className="space-y-2">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => toggleBrand(brand)}
                className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all ${
                  selectedBrands.includes(brand)
                    ? "bg-[#1B5E20] border-[#1B5E20] shadow-[0_0_8px_rgba(27,94,32,0.6)]"
                    : "border-[#1B5E20]/25 bg-transparent hover:border-[#1B5E20]/50"
                }`}
              >
                {selectedBrands.includes(brand) && (
                  <svg className="w-2.5 h-2.5 text-[#FFFDF5]" viewBox="0 0 10 10" fill="currentColor">
                    <path d="M8.5 2L4 7.5 1.5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-[#3E2723] group-hover:text-[#1B5E20] transition-colors">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* In Stock Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#3E2723]">In Stock Only</span>
        <button
          onClick={() => setInStockOnly(!inStockOnly)}
          className={`relative w-10 h-5 rounded-full transition-all ${inStockOnly ? "bg-[#1B5E20] shadow-[0_0_10px_rgba(27,94,32,0.5)]" : "bg-[#374151]"}`}
        >
          <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${inStockOnly ? "translate-x-5" : ""}`} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-[#5D4037] mb-3">
          <span>Home</span><span>/</span><span className="text-[#1B5E20]">All Products</span>
        </div>
        <h1 className="text-3xl font-bold font-outfit text-[#3E2723]">
          All <span className="gradient-text">Products</span>
        </h1>
        <p className="text-[#5D4037] mt-1">{filtered.length} products found</p>
      </div>

      {/* Active Filters */}
      {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedCategories.map((cat) => (
            <Badge
              key={cat}
              className="bg-[#1B5E20]/15 text-[#1B5E20] border border-[#1B5E20]/30 cursor-pointer hover:bg-[#1B5E20]/25 transition-colors"
              onClick={() => toggleCategory(cat)}
            >
              {cat} <X className="h-3 w-3 ml-1.5" />
            </Badge>
          ))}
          {selectedBrands.map((brand) => (
            <Badge
              key={brand}
              className="bg-[#1B5E20]/15 text-[#1B5E20] border border-[#1B5E20]/30 cursor-pointer hover:bg-[#1B5E20]/25 transition-colors"
              onClick={() => toggleBrand(brand)}
            >
              {brand} <X className="h-3 w-3 ml-1.5" />
            </Badge>
          ))}
        </div>
      )}

      <div className="flex gap-8">
        {/* Sidebar Filters – Desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="card-glass rounded-xl p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-[#3E2723] flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-[#1B5E20]" /> Filters
              </h2>
              <button
                className="text-xs text-[#1B5E20] hover:text-[#81C784]"
                onClick={() => { setSelectedCategories([]); setSelectedBrands([]); setPriceRange([0, 20000]); setInStockOnly(false); }}
              >
                Clear All
              </button>
            </div>
            <FilterPanel />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 mb-6 p-4 rounded-xl border border-[#1B5E20]/08 bg-[#FFFFFF]/60">
            {/* Mobile Filter Button */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden border-[#1B5E20]/25 text-[#3E2723] hover:text-[#1B5E20] hover:border-[#1B5E20]/50"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="h-4 w-4 mr-1.5" /> Filters
            </Button>

            {/* Sort */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-[#5D4037] hidden sm:block">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FAF6ED] border border-[#1B5E20]/15 text-[#3E2723] text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-[#1B5E20]/40"
              >
                {SORT_OPTIONS.map((opt) => <option key={opt}>{opt}</option>)}
              </select>
              {/* View Toggle */}
              <div className="flex gap-1 border border-[#1B5E20]/15 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-[#1B5E20]/20 text-[#1B5E20]" : "text-[#5D4037] hover:text-[#3E2723]"}`}
                >
                  <Grid3X3 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-[#1B5E20]/20 text-[#1B5E20]" : "text-[#5D4037] hover:text-[#3E2723]"}`}
                >
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {filterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="lg:hidden mb-6 card-glass rounded-xl p-6 overflow-hidden"
            >
              <FilterPanel />
            </motion.div>
          )}

          {/* Product Grid */}
          <div className={`grid gap-5 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
            {filtered.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="text-4xl mb-4">🦷</div>
                <h3 className="text-[#3E2723] font-semibold mb-2">No products found</h3>
                <p className="text-[#5D4037] text-sm">Try adjusting your filters</p>
              </div>
            ) : (
              filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
