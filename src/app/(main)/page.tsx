import Hero from "@/components/sections/Hero";
import WhyIndia from "@/components/sections/WhyIndia";
import Treatments from "@/components/sections/Treatments";
import Hospitals from "@/components/sections/Hospitals";
import Doctors from "@/components/sections/Doctors";
import CostComparison from "@/components/sections/CostComparison";
import PatientJourney from "@/components/sections/PatientJourney";
import Packages from "@/components/sections/Packages";
import Testimonials from "@/components/sections/Testimonials";
import Certifications from "@/components/sections/Certifications";
import Destinations from "@/components/sections/Destinations";
import Concierge from "@/components/sections/Concierge";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyIndia />
      <Treatments />
      <Hospitals />
      <Doctors />
      <CostComparison />
      <PatientJourney />
      <Packages />
      <Testimonials />
      <Certifications />
      <Destinations />
      <Concierge />
      <FAQ />
      <CTASection />
    </>
  );
}
