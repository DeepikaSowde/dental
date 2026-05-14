import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Thaarwin Enterprises — The Dental Marker Space", template: "%s | Thaarwin Enterprises" },
  description: "India's premium dental e-commerce platform for dentists, clinics, students, and dealers. Genuine products, best prices, fast delivery.",
  keywords: ["dental supplies", "dental equipment", "implants", "endodontics", "dental marketplace India"],
  authors: [{ name: "Thaarwin Enterprises" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Thaarwin Enterprises — The Dental Marker Space",
    description: "Premium dental products for professionals",
    siteName: "Thaarwin Enterprises",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col font-sans bg-[#FFFDF5]">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: "#FFFFFF",
              border: "1px solid rgba(27,94,32,0.2)",
              color: "#E2F8FF",
            },
          }}
        />
      </body>
    </html>
  );
}
