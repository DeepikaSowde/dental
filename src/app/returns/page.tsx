import React from "react";

export default function ReturnsPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-24 text-[#3E2723] min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-[#1B5E20]">Return Policy</h1>
      <div className="prose prose-invert max-w-4xl">
        <p className="mb-4">
          At Thaarwin Enterprises, we strive to ensure that our customers are completely satisfied with their purchases.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#3E2723]">7-Day Return Policy</h2>
        <p className="mb-4">
          We accept returns within 7 days of delivery for most products. Items must be unused, in their original packaging, and with all seals intact. 
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#3E2723]">Non-Returnable Items</h2>
        <p className="mb-4">
          Due to hygiene and safety standards, certain dental supplies and equipment (such as open composites, used handpieces, and sterile surgical items) cannot be returned once the seal is broken.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#3E2723]">How to Initiate a Return</h2>
        <p className="mb-4">
          Please contact our support team at support@thaarwin.com or call us at +91 98765 43210 with your order details to initiate a return request. Our team will guide you through the process.
        </p>
      </div>
    </div>
  );
}
