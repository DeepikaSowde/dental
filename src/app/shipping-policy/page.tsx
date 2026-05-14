import { Metadata } from "next";
import { PolicyLayout } from "@/components/layout/PolicyLayout";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | Thaarwin Enterprises",
  description: "Information about our shipping and delivery processes.",
};

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout title="Shipping & Delivery Policy" lastUpdated="May 12, 2026">
      <div className="space-y-6">
        <p>
          <strong>Thaarwin Enterprises</strong> is committed to delivering your dental supplies and equipment as quickly and safely as possible.
        </p>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">1. Processing Time</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>All orders are processed within <strong>1-2 business days</strong> (excluding weekends and public holidays).</li>
          <li>You will receive a confirmation email with a tracking link once your order has been dispatched.</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">2. Shipping Rates and Delivery Estimates</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Standard Shipping:</strong> ₹150 for orders below ₹5000. Delivery in 4-7 business days.</li>
          <li><strong>Express Shipping:</strong> ₹300. Delivery in 2-4 business days.</li>
          <li><strong>Free Shipping:</strong> Available on all orders above ₹5000 via Standard Shipping.</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">3. Courier Partners</h2>
        <p>
          We partner with leading logistic providers such as BlueDart, Delhivery, and DTDC to ensure safe and timely delivery across India.
        </p>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">4. Damages During Transit</h2>
        <p>
          If your order arrives damaged, please do not accept the package or take photos of the damaged box before opening. Contact us within 24 hours of delivery at support@thaarwin.com so we can investigate and process a replacement.
        </p>
      </div>
    </PolicyLayout>
  );
}
