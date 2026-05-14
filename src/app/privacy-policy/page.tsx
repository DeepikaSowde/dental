import { Metadata } from "next";
import { PolicyLayout } from "@/components/layout/PolicyLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Thaarwin Enterprises",
  description: "Learn how Thaarwin Enterprises collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="May 12, 2026">
      <div className="space-y-6">
        <p>
          Welcome to <strong>Thaarwin Enterprises</strong>. We value your privacy and are committed to protecting your personal data. 
          This privacy policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.
        </p>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">1. Information We Collect</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Personal Details:</strong> Name, email address, phone number, shipping and billing addresses.</li>
          <li><strong>Transaction Data:</strong> Payment details, order history, and Razorpay transaction IDs. (We do not store your card details).</li>
          <li><strong>Technical Data:</strong> IP address, browser type, device identifiers, and usage analytics.</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">2. How We Use Your Data</h2>
        <p>We use your information to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Process your orders and manage payments securely through Razorpay.</li>
          <li>Deliver products and provide tracking updates.</li>
          <li>Provide customer support and resolve disputes.</li>
          <li>Improve our platform, products, and user experience.</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">3. Data Sharing</h2>
        <p>
          We do not sell or rent your data. We only share it with essential third parties such as our payment gateway partner (Razorpay) and shipping partners to fulfill your order.
        </p>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">4. Contact Information</h2>
        <p>If you have any questions or concerns regarding your privacy, please contact our Grievance Officer:</p>
        <div className="bg-[#FAF6ED] p-4 rounded-lg mt-4 border border-[#D7CEC3]">
          <p className="font-semibold text-[#3E2723]">Thaarwin Enterprises</p>
          <p>Ground Floor, 29/B/41, Thiyagaraja Street, Puducherry - 605001</p>
          <p>GSTIN: 34AAJFT6857B2Z1</p>
          <p>Email: support@thaarwin.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>
    </PolicyLayout>
  );
}
