"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { hospitals } from "@/lib/constants";

export default function Hospitals() {
  return (
    <section className="section-padding bg-surface relative overflow-hidden" id="hospitals">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Building2 size={14} /> Partner Hospitals
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            India&apos;s <span className="text-gradient">Top Hospitals</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            JCI and NABH accredited hospitals with world-class infrastructure and technology
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {hospitals.map((hospital) => (
            <StaggerItem key={hospital.id}>
              <motion.div
                className="group glass-card rounded-2xl overflow-hidden card-hover h-full"
                whileHover={{ scale: 1.01 }}
              >
                <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
                  <div className="text-6xl">{hospital.image}</div>
                  <div className="absolute top-4 right-4 flex gap-1.5">
                    {hospital.accreditations.map((acc) => (
                      <span key={acc} className="text-[10px] font-bold px-2 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 text-primary shadow-sm">
                        {acc}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-4 left-4 glass rounded-xl px-3 py-1.5 text-white text-sm font-medium">
                    Est. {hospital.established}
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {hospital.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm text-muted mt-1">
                      <MapPin size={13} /> {hospital.city}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {hospital.specialties.slice(0, 3).map((spec) => (
                      <span key={spec} className="text-xs px-2.5 py-1 rounded-full bg-surface text-muted">
                        {spec}
                      </span>
                    ))}
                    {hospital.specialties.length > 3 && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        +{hospital.specialties.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-y border-border">
                    <div className="text-center">
                      <div className="text-sm font-bold text-primary">{hospital.beds}</div>
                      <div className="text-[10px] text-muted">Beds</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-primary">{hospital.doctors}</div>
                      <div className="text-[10px] text-muted">Doctors</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <Link
                      href="/hospitals"
                      className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      View Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3} className="text-center mt-12">
          <Link href="/hospitals" className="btn-primary inline-flex items-center gap-2">
            Explore All Hospitals <ArrowRight size={18} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
