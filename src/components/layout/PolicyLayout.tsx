import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PolicyLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function PolicyLayout({ title, lastUpdated, children }: PolicyLayoutProps) {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-[#5D4037] mb-8">
          <Link href="/" className="hover:text-[#1B5E20] transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 text-[#D7CEC3]" />
          <span className="text-[#3E2723] font-medium">{title}</span>
        </nav>

        {/* Content Card */}
        <div className="card-glass rounded-2xl p-8 md:p-12 shadow-primary">
          <div className="border-b border-[#D7CEC3]/50 pb-8 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-outfit text-[#3E2723] mb-3">
              {title}
            </h1>
            <p className="text-sm text-[#5D4037]">Last Updated: {lastUpdated}</p>
          </div>

          <div className="prose prose-stone max-w-none prose-headings:text-[#3E2723] prose-headings:font-outfit prose-headings:font-semibold prose-a:text-[#00796B] hover:prose-a:text-[#1B5E20] prose-p:text-[#5D4037] prose-li:text-[#5D4037] prose-strong:text-[#3E2723]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
