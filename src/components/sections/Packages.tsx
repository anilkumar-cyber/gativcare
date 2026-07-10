"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Clock, Star } from "lucide-react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { packages } from "@/lib/constants";
import { useCurrency } from "@/components/layout/CurrencyContext";

export default function Packages() {
  const { display } = useCurrency();
  return (
    <section className="section-padding relative overflow-hidden" id="packages">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <Star size={14} /> All-Inclusive Packages
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Medical Tourism <span className="text-gradient">Packages</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Comprehensive packages covering treatment, accommodation, travel, and personal assistance
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {packages.map((pkg, i) => (
            <StaggerItem key={pkg.id}>
              <motion.div
                className={`group relative glass-card rounded-2xl overflow-hidden card-hover h-full ${
                  i === 0 ? "ring-2 ring-primary/30" : ""
                }`}
                whileHover={{ scale: 1.02 }}
              >
                {i === 0 && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold z-10">
                    Most Popular
                  </div>
                )}

                <div className={`h-2 bg-gradient-to-r ${pkg.color}`} />

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-gradient">{display(pkg.price)}</span>
                    <span className="text-sm text-muted">starting from</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted mb-6">
                    <Clock size={13} /> {pkg.duration}
                  </div>

                  <ul className="space-y-3 mb-6">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm">
                        <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-green-600" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-2">
                    <Link
                      href="/contact"
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                        i === 0
                          ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20 hover:shadow-primary/40"
                          : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                      }`}
                    >
                      Get Quote <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3} className="text-center mt-12">
          <p className="text-sm text-muted mb-4">All packages are customizable. Contact us for a personalized quote.</p>
          <Link href="/packages" className="btn-secondary inline-flex items-center gap-2">
            View All Packages <ArrowRight size={16} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
