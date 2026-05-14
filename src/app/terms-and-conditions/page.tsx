import { Metadata } from "next";
import { PolicyLayout } from "@/components/layout/PolicyLayout";

export const metadata: Metadata = {
  title: "Terms and Conditions | Thaarwin Enterprises",
  description: "Terms and Conditions for using Thaarwin Enterprises services.",
};

export default function TermsAndConditionsPage() {
  return (
    <PolicyLayout title="Terms & Conditions" lastUpdated="May 12, 2026">
      <div className="space-y-6">
        <p>
          Welcome to <strong>Thaarwin Enterprises</strong>. By accessing our website and purchasing our products, you agree to be bound by the following Terms and Conditions.
        </p>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">1. Use of Website</h2>
        <p>
          You must be at least 18 years of age or a registered dental professional to purchase restricted medical supplies from our website. You agree to provide accurate and current information during registration and checkout.
        </p>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">2. Product Information and Pricing</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>We make every effort to display accurate product descriptions, images, and prices. However, errors may occasionally occur.</li>
          <li>Prices are subject to change without prior notice.</li>
          <li>All prices listed on the website are inclusive of GST unless otherwise stated.</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">3. Payments</h2>
        <p>
          Payments are securely processed via Razorpay. By providing your payment information, you authorize our payment gateway to charge the total order amount. We do not store your payment credentials.
        </p>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">4. Limitation of Liability</h2>
        <p>
          Thaarwin Enterprises shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products. Medical equipment should only be used by trained professionals.
        </p>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">5. Governing Law</h2>
        <p>
          These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in Puducherry.
        </p>
      </div>
    </PolicyLayout>
  );
}
