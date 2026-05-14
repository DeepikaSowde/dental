import { Metadata } from "next";
import { PolicyLayout } from "@/components/layout/PolicyLayout";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Thaarwin Enterprises",
  description: "Find answers to common questions about our dental products and services.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Are all your products genuine and authentic?",
      a: "Yes, absolutely. We source all our dental products, equipment, and consumables directly from authorized manufacturers and official distributors. Every product comes with standard warranties."
    },
    {
      q: "How long does shipping usually take?",
      a: "Standard shipping takes 4-7 business days across India. Express shipping is available for select pincodes and takes 2-4 business days. Orders are typically dispatched within 24-48 hours."
    },
    {
      q: "Do you offer bulk discounts for clinics?",
      a: "Yes, we offer special pricing and B2B discounts for bulk orders and clinic setups. Please visit our 'Bulk Order' page or contact our support team to get a custom quotation."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major payment methods through our secure Razorpay gateway, including UPI, Credit/Debit Cards, Net Banking, and Wallets. EMI options are also available."
    },
    {
      q: "Can I return a product if I ordered the wrong one?",
      a: "We accept returns within 7 days of delivery, provided the item is unused, unsealed, and in its original packaging. Please note that sterile items and custom equipment are non-returnable. A restocking fee may apply."
    }
  ];

  return (
    <PolicyLayout title="Frequently Asked Questions" lastUpdated="May 12, 2026">
      <div className="space-y-8">
        <p className="mb-8">
          Find answers to the most commonly asked questions below. If you need further assistance, please don't hesitate to contact our support team.
        </p>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="pb-6 border-b border-[#D7CEC3]/50 last:border-0">
              <h3 className="text-lg font-semibold text-[#1B5E20] mb-3">{faq.q}</h3>
              <p className="text-[#5D4037] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#FAF6ED] p-6 rounded-xl border border-[#D7CEC3]/60 text-center">
          <h4 className="text-lg font-bold text-[#3E2723] mb-2">Still have questions?</h4>
          <p className="text-sm text-[#5D4037] mb-4">Our support team is ready to help you with any inquiries.</p>
          <a href="mailto:support@thaarwin.com" className="inline-flex items-center justify-center h-10 px-6 font-medium text-[#1B5E20] bg-[#FFFFFF] border border-[#1B5E20]/30 rounded-lg hover:bg-[#1B5E20]/5 transition-colors">
            Contact Support
          </a>
        </div>
      </div>
    </PolicyLayout>
  );
}
