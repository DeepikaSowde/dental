import { Metadata } from "next";
import { PolicyLayout } from "@/components/layout/PolicyLayout";

export const metadata: Metadata = {
  title: "Return & Exchange Policy | Thaarwin Enterprises",
  description: "Information about returning or exchanging products.",
};

export default function ReturnExchangePage() {
  return (
    <PolicyLayout title="Return & Exchange Policy" lastUpdated="May 12, 2026">
      <div className="space-y-6">
        <p>
          We want you to be completely satisfied with your purchase from <strong>Thaarwin Enterprises</strong>. If you are not, you may be eligible for a return or exchange under the following conditions.
        </p>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">1. Eligibility for Returns</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Returns must be initiated within <strong>7 days</strong> of the delivery date.</li>
          <li>Items must be unused, in their original condition, and in the original packaging with all seals intact.</li>
          <li>Certain sterile items, opened consumables, and custom-ordered equipment are <strong>strictly non-returnable</strong> for hygiene and safety reasons.</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">2. Exchange Policy</h2>
        <p>
          Exchanges are permitted if you received a defective or incorrect item. Please contact our support team immediately with photographic evidence, and we will arrange a reverse pickup and dispatch the replacement free of cost.
        </p>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">3. Return Process</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Email us at <strong>returns@thaarwin.com</strong> with your Order ID and reason for return.</li>
          <li>Once approved, we will arrange a reverse pickup. If your location is not serviceable, you may be required to ship the item back to us.</li>
          <li>Upon receiving the returned item, it will undergo a quality check.</li>
          <li>If approved, the refund will be initiated to your original payment method within 5-7 business days.</li>
        </ol>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">4. Restocking Fee</h2>
        <p>
          Returns that are not due to our error (e.g., ordered wrong item) may be subject to a 10% restocking fee, and the return shipping cost will be borne by the customer.
        </p>
      </div>
    </PolicyLayout>
  );
}
