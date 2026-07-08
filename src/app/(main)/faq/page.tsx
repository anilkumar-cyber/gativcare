import type { Metadata } from "next";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "FAQ | GativCare",
  description: "Frequently asked questions about medical tourism in India, costs, visas, and treatment with GativCare.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <FAQ />
      <CTASection />
    </div>
  );
}
