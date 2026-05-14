// ─── Thaarwin Enterprises – Central Data Store ───────────────────────────────

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string | null;
  isNew?: boolean;
  inStock?: boolean;
  description?: string;
  tags?: string[];
}

export interface Category {
  name: string;
  icon: string;
  count: string;
  slug: string;
  gradient: string;
}

export const CATEGORIES: Category[] = [
  { name: "Implants", icon: "🦷", count: "1,200+", slug: "implants", gradient: "from-green-500/20 to-emerald-500/10" },
  { name: "Endodontics", icon: "⚕️", count: "850+", slug: "endodontics", gradient: "from-emerald-500/20 to-teal-500/10" },
  { name: "Restorative", icon: "✨", count: "2,100+", slug: "restorative", gradient: "from-teal-500/20 to-green-500/10" },
  { name: "Orthodontics", icon: "🔧", count: "900+", slug: "orthodontics", gradient: "from-green-400/20 to-emerald-400/10" },
  { name: "Instruments", icon: "🛠️", count: "3,500+", slug: "instruments", gradient: "from-emerald-400/20 to-teal-400/10" },
  { name: "Equipment", icon: "💺", count: "450+", slug: "equipment", gradient: "from-teal-400/20 to-green-400/10" },
  { name: "Preventive", icon: "🛡️", count: "700+", slug: "preventive", gradient: "from-green-600/20 to-teal-600/10" },
  { name: "Radiology", icon: "📡", count: "320+", slug: "radiology", gradient: "from-teal-600/20 to-emerald-600/10" },
];

export const BRANDS = [
  "3M ESPE", "Dentsply Sirona", "GC Corporation", "Ivoclar Vivadent",
  "NSK Dental", "KaVo Kerr", "Woodpecker", "BioHorizons",
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "BioHorizons Tapered Internal Plus Implant",
    brand: "BioHorizons",
    category: "Implants",
    price: 12500,
    originalPrice: 15000,
    rating: 4.8,
    reviews: 124,
    image: "/products/implant.png",
    badge: "Bestseller",
    isNew: false,
    inStock: true,
    description: "Premium titanium implant with resorbable blast media surface for optimal osseointegration.",
    tags: ["titanium", "osseointegration", "surgical"],
  },
  {
    id: 2,
    name: "NSK Ti-Max Z95L High-Speed Handpiece",
    brand: "NSK",
    category: "Instruments",
    price: 8900,
    originalPrice: 10500,
    rating: 4.9,
    reviews: 89,
    image: "/products/handpiece.png",
    badge: "15% OFF",
    isNew: false,
    inStock: true,
    description: "Ultra-high speed air turbine with ceramic bearings and 360° water spray.",
    tags: ["handpiece", "high-speed", "nsk"],
  },
  {
    id: 3,
    name: "3M Filtek Z350 XT Universal Composite",
    brand: "3M ESPE",
    category: "Restorative",
    price: 2100,
    originalPrice: 2400,
    rating: 4.7,
    reviews: 312,
    image: "/products/composite.png",
    badge: null,
    isNew: false,
    inStock: true,
    description: "Universal nanofilled composite for anterior and posterior restorations.",
    tags: ["composite", "nanofilled", "restorative"],
  },
  {
    id: 4,
    name: "Woodpecker UDS-N LED Ultrasonic Scaler",
    brand: "Woodpecker",
    category: "Instruments",
    price: 4500,
    originalPrice: 5200,
    rating: 4.6,
    reviews: 67,
    image: "/products/scaler.png",
    badge: "New",
    isNew: true,
    inStock: true,
    description: "LED-lit ultrasonic scaler with built-in water supply and autoclavable handpiece.",
    tags: ["scaler", "ultrasonic", "periodontics"],
  },
  {
    id: 5,
    name: "GC Fuji IX GP Capsule Glass Ionomer",
    brand: "GC Corporation",
    category: "Restorative",
    price: 1850,
    originalPrice: 2100,
    rating: 4.5,
    reviews: 203,
    image: "/products/glass_ionomer.png",
    badge: "Deal",
    isNew: false,
    inStock: true,
    description: "High-strength glass ionomer cement in pre-dosed capsules for easy mixing.",
    tags: ["glass-ionomer", "restorative", "capsule"],
  },
  {
    id: 6,
    name: "Dentsply ProTaper Gold Rotary Files",
    brand: "Dentsply Sirona",
    category: "Endodontics",
    price: 3200,
    originalPrice: 3800,
    rating: 4.8,
    reviews: 156,
    image: "/products/protaper.png",
    badge: "Bestseller",
    isNew: false,
    inStock: true,
    description: "Gold heat-treated NiTi alloy for superior flexibility and resistance to cyclic fatigue.",
    tags: ["rotary", "endodontics", "NiTi"],
  },
  {
    id: 7,
    name: "Ivoclar Tetric EvoCeram Universal",
    brand: "Ivoclar Vivadent",
    category: "Restorative",
    price: 2800,
    originalPrice: 3200,
    rating: 4.7,
    reviews: 178,
    image: "/products/evoceram.png",
    badge: null,
    isNew: true,
    inStock: true,
    description: "Universal nano-hybrid composite with integrated Ivocerin polymerization optimizer.",
    tags: ["composite", "nano-hybrid", "ivoclar"],
  },
  {
    id: 8,
    name: "KaVo Kerr Bisco Duo-Link Cement",
    brand: "KaVo Kerr",
    category: "Restorative",
    price: 1650,
    originalPrice: 1900,
    rating: 4.4,
    reviews: 92,
    image: "/products/duolink.png",
    badge: null,
    isNew: false,
    inStock: false,
    description: "Dual-cure resin cement for cementation of ceramic and composite restorations.",
    tags: ["cement", "dual-cure", "ceramic"],
  },
];

export const NEW_ARRIVALS = PRODUCTS.filter(p => p.isNew);
export const BEST_SELLERS = PRODUCTS.filter(p => p.badge === "Bestseller" || p.reviews > 100);
export const FLASH_DEALS = PRODUCTS.filter(p => p.originalPrice > p.price).slice(0, 4);
