import Hero from "@/components/sections/Hero";
import WhyIndia from "@/components/sections/WhyIndia";
import Treatments from "@/components/sections/Treatments";
import Hospitals from "@/components/sections/Hospitals";
import CostComparison from "@/components/sections/CostComparison";
import BodyCostMap from "@/components/sections/BodyCostMap";
import PatientJourney from "@/components/sections/PatientJourney";
import Packages from "@/components/sections/Packages";
import Certifications from "@/components/sections/Certifications";
import Destinations from "@/components/sections/Destinations";
import Concierge from "@/components/sections/Concierge";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";
import { getPublishedFaqs } from "@/lib/queries/admin";

export const dynamic = "force-dynamic";

export default async function Home() {
  const faqs = await getPublishedFaqs();

  return (
    <>
      <Hero />
      <WhyIndia />
      <Treatments />
      <Hospitals />
      <CostComparison />
      <BodyCostMap />
      <PatientJourney />
      <Packages />
      <Certifications />
      <Destinations />
      <Concierge />
      <FAQ faqs={faqs.map((f) => ({ q: f.question, a: f.answer }))} />
      <CTASection />
    </>
  );
}
