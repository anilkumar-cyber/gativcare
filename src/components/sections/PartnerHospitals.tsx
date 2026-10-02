import { Handshake, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/motion";
import { PartnerHospitalsCarousel, type PartnerLogo } from "./PartnerHospitalsCarousel";

export default function PartnerHospitals({ logos }: { logos: PartnerLogo[] }) {
  if (logos.length === 0) return null;

  const apollo = logos.find((p) => p.name.toLowerCase().includes("apollo"));

  return (
    <section
      className="section-padding border-y border-primary/15 bg-gradient-to-br from-primary/5 via-background to-accent/5"
      id="partner-hospitals"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold mb-4 shadow-sm shadow-primary/30">
            <Handshake size={14} /> Official Partners
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Our Official Partner Hospital Networks
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-10">
            GativCare has signed formal MOUs with these hospital networks to coordinate
            patient care and treatment pathways.
          </p>
        </FadeIn>

        {apollo && (
          <FadeIn>
            <div className="max-w-3xl mx-auto mb-10 rounded-2xl border-2 border-primary bg-white dark:bg-slate-900 shadow-xl shadow-primary/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center justify-center h-24 w-48 shrink-0 rounded-xl bg-surface p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={apollo.logoUrl} alt={`${apollo.name} logo`} className="max-h-14 w-auto object-contain" />
              </div>
              <div className="text-center sm:text-left">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
                  Flagship Partner
                </span>
                <h3 className="text-xl font-bold mb-1.5">{apollo.name}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Our lead MOU partner — one of India&apos;s largest and most accredited hospital
                  networks, coordinated closely across GativCare&apos;s patient journeys.
                </p>
              </div>
              <Link
                href="/hospitals"
                className="sm:ml-auto shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
              >
                Explore <ArrowRight size={15} />
              </Link>
            </div>
          </FadeIn>
        )}
      </div>

      <PartnerHospitalsCarousel logos={logos} />
    </section>
  );
}
