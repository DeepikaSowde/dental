import { Metadata } from "next";
import { PolicyLayout } from "@/components/layout/PolicyLayout";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Thaarwin Enterprises",
  description: "Understand our refund and cancellation policies for dental products.",
};

export default function RefundCancellationPage() {
  return (
    <PolicyLayout title="Refund & Cancellation Policy" lastUpdated="May 12, 2026">
      <div className="space-y-6">
        <p>
          At <strong>Thaarwin Enterprises</strong>, we strive to ensure a smooth shopping experience. 
          Please read our Refund and Cancellation Policy carefully.
        </p>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">1. Order Cancellation</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Before Dispatch:</strong> You can cancel your order anytime before it is dispatched from our warehouse. The full amount will be refunded to your original payment method.</li>
          <li><strong>After Dispatch:</strong> Once the order has been shipped, cancellations are no longer permitted. You may choose to return the item under our Return Policy instead.</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">2. Refunds</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Refunds will be processed within <strong>5-7 business days</strong> after the cancellation request is approved or the returned item is received and inspected.</li>
          <li>Refunds will be credited to the original mode of payment (via Razorpay).</li>
          <li>Shipping charges (if any) are non-refundable unless the product received was defective or incorrect.</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">3. Exceptional Cases</h2>
        <p>
          If an order is cancelled by Thaarwin Enterprises due to inventory stockouts or technical errors, a full refund will be initiated immediately.
        </p>

        <h2 className="text-xl font-semibold text-[#1B5E20] mt-8 mb-4">4. Contact Information</h2>
        <p>For cancellation or refund requests, please contact our support team:</p>
        <div className="bg-[#FAF6ED] p-4 rounded-lg mt-4 border border-[#D7CEC3]">
          <p className="font-semibold text-[#3E2723]">Thaarwin Enterprises Support</p>
          <p>Email: returns@thaarwin.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>
    </PolicyLayout>
  );
}
