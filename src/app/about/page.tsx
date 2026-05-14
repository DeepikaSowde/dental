import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Award, ShieldCheck, HeartPulse } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Thaarwin Enterprises",
  description: "Learn about Thaarwin Enterprises, India's leading dental marketplace.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF5] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-[#5D4037] mb-8">
          <Link href="/" className="hover:text-[#1B5E20] transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 text-[#D7CEC3]" />
          <span className="text-[#3E2723] font-medium">About Us</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-[#FFFFFF] rounded-3xl p-8 md:p-16 border border-[#D7CEC3]/60 shadow-[0_4px_20px_rgba(27,94,32,0.05)] text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-outfit text-[#3E2723] mb-6">
            Empowering Dental Professionals
          </h1>
          <p className="text-lg text-[#5D4037] max-w-2xl mx-auto leading-relaxed mb-8">
            Thaarwin Enterprises is India's most trusted marketplace for dental supplies, equipment, and materials. 
            We bridge the gap between world-class manufacturers and clinics, ensuring you get genuine products at the best prices.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#D7CEC3]/50">
            <div>
              <div className="text-3xl font-black text-[#1B5E20] mb-2">10K+</div>
              <div className="text-sm text-[#5D4037] font-medium">Products Catalog</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#00796B] mb-2">5,000+</div>
              <div className="text-sm text-[#5D4037] font-medium">Clinics Served</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#81C784] mb-2">200+</div>
              <div className="text-sm text-[#5D4037] font-medium">Global Brands</div>
            </div>
          </div>
        </div>

        {/* Business Info */}
        <div className="bg-[#FFFFFF] rounded-2xl p-8 border border-[#D7CEC3]/60 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-[#3E2723] mb-6">Business Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-[#5D4037]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#3E2723] mb-1">GSTIN</p>
              <p className="font-mono font-semibold text-[#1B5E20]">34AAJFT6857B2Z1</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#3E2723] mb-1">Constitution</p>
              <p>Partnership Firm</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#3E2723] mb-1">Registered Address</p>
              <p>Ground Floor, 29/B/41, Thiyagaraja Street,<br/>Puducherry - 605001</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#3E2723] mb-1">Partners</p>
              <p>Nambiar Jeyaraj<br/>Asirvatham Hemajayanthi</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "100% Genuine",
              icon: ShieldCheck,
              desc: "We source directly from manufacturers and authorized distributors to guarantee authenticity."
            },
            {
              title: "Premium Quality",
              icon: Award,
              desc: "From basic consumables to advanced imaging systems, we only list products that meet our high standards."
            },
            {
              title: "Dedicated Support",
              icon: HeartPulse,
              desc: "Our team of dental product experts is always ready to assist you with technical queries and setup."
            }
          ].map((val, i) => (
            <div key={i} className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#D7CEC3]/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#1B5E20]/10 flex items-center justify-center mb-6">
                <val.icon className="h-6 w-6 text-[#1B5E20]" />
              </div>
              <h3 className="text-xl font-bold text-[#3E2723] mb-3">{val.title}</h3>
              <p className="text-[#5D4037] leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
