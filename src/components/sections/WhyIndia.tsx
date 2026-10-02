"use client";

import { GraduationCap, Award, Cpu, Clock, Languages, Globe, Palmtree } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";
import { whyIndiaReasons } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap, Award, Cpu, Clock, Languages, Globe, Palmtree,
};

export default function WhyIndia() {
  const [costReason, ...rest] = whyIndiaReasons;
  // JCI accreditation is already covered by the trust strip and the
  // certifications section elsewhere on this page — no need to repeat it here.
  const otherReasons = rest.filter((r) => r.title !== "JCI Accredited Hospitals");

  return (
    <section className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="grid lg:grid-cols-[0.85fr_1.65fr] gap-12 lg:gap-16">
            <div>
              <p className="text-sm font-semibold text-primary mb-3">Why India</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                India: the world&apos;s healthcare destination
              </h2>
              <p className="text-muted leading-relaxed">
                Millions of patients travel here each year for care that matches Western
                hospitals — at a fraction of the cost.
              </p>

              <div className="mt-10 pt-8 border-t border-border">
                <div className="text-6xl sm:text-7xl font-bold text-primary leading-none tabular-nums">
                  {costReason.title.split(" ")[0]}
                </div>
                <p className="text-sm text-muted mt-3 max-w-xs leading-relaxed">
                  {costReason.description}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-10">
              {otherReasons.map((reason) => {
                const Icon = iconMap[reason.icon] || Globe;
                return (
                  <div key={reason.title} className="flex gap-4 py-5 border-b border-border">
                    <Icon size={20} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">{reason.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{reason.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
