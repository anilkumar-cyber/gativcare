"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { treatments } from "@/lib/constants";
import { useCurrency } from "@/components/layout/CurrencyContext";

export default function Treatments() {
  const { display } = useCurrency();
  return (
    <section className="section-padding relative overflow-hidden" id="treatments">
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] -translate-y-1/2 -translate-x-1/2 bg-accent/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Our Specialties
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Treatment <span className="text-gradient">Categories</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Comprehensive medical treatments across 50+ specialties with world-class outcomes
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" staggerDelay={0.06}>
          {treatments.map((treatment) => (
            <StaggerItem key={treatment.id}>
              <motion.div
                className="group relative glass-card rounded-2xl overflow-hidden card-hover h-full"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${treatment.color} opacity-60 group-hover:opacity-100 transition-opacity`} />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${treatment.color} bg-opacity-10 flex items-center justify-center text-2xl`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {treatment.image}
                    </motion.div>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-surface text-muted">
                      {display(treatment.cost)}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {treatment.name}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
                    {treatment.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <Link
                      href={`/treatments`}
                      className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Learn More <ArrowRight size={14} />
                    </Link>
                    <Link
                      href="/contact"
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.4} className="text-center mt-12">
          <Link
            href="/treatments"
            className="btn-primary inline-flex items-center gap-2 text-base"
          >
            View All Treatments <ArrowRight size={18} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
