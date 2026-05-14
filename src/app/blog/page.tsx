import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Calendar, User, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Dental Blog | Thaarwin Enterprises",
  description: "Read the latest news and guides on dental supplies.",
};

const POSTS = [
  {
    title: "How to Choose the Right Composite for Anterior Restorations",
    excerpt: "Learn the key differences between nano-hybrid and microfill composites, and discover which one is best for achieving high aesthetic results.",
    category: "Restorative",
    author: "Dr. A. Sharma",
    date: "May 10, 2026",
    img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Maintenance Guide: Extending the Life of Your Handpieces",
    excerpt: "Proper lubrication and sterilization protocols are essential. Here is a step-by-step guide to maintaining your high-speed turbines.",
    category: "Equipment",
    author: "Tech Team",
    date: "April 28, 2026",
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "The Future of Digital Dentistry: Intraoral Scanners",
    excerpt: "Why clinics are moving away from traditional impressions and embracing digital scanning technology for faster, more accurate results.",
    category: "Technology",
    author: "Dr. R. Mehta",
    date: "April 15, 2026",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF5] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-[#5D4037] mb-8">
          <Link href="/" className="hover:text-[#1B5E20] transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 text-[#D7CEC3]" />
          <span className="text-[#3E2723] font-medium">Dental Blog</span>
        </nav>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-outfit text-[#3E2723] mb-4">
            The Dental Marker Blog
          </h1>
          <p className="text-lg text-[#5D4037] max-w-2xl">
            Insights, guides, and the latest trends in dental equipment and materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post, i) => (
            <div key={i} className="bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#D7CEC3]/60 shadow-[0_4px_20px_rgba(27,94,32,0.05)] hover:shadow-[0_8px_30px_rgba(27,94,32,0.1)] transition-all flex flex-col">
              <div className="relative h-48 bg-[#FAF6ED]">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-[#1B5E20] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-[#5D4037] mb-3">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {post.author}</span>
                </div>
                <h3 className="text-xl font-bold text-[#3E2723] mb-3 leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-[#5D4037] text-sm mb-6 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>
                <Link href="#" className="inline-flex items-center text-[#1B5E20] font-semibold text-sm hover:text-[#00796B] transition-colors">
                  Read Article <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
