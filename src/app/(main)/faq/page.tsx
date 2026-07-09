import type { Metadata } from "next";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";
import { getPublishedFaqs } from "@/lib/queries/admin";

export const metadata: Metadata = {
  title: "FAQ | GativCare",
  description: "Frequently asked questions about medical tourism in India, costs, visas, and treatment with GativCare.",
};

export const dynamic = "force-dynamic";

export default async function FAQPage() {
  const faqs = await getPublishedFaqs();
  return (
    <div className="min-h-screen">
      <FAQ faqs={faqs.map((f) => ({ q: f.question, a: f.answer }))} />
      <CTASection />
    </div>
  );
}
