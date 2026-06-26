"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Clock, Star } from "lucide-react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { packages } from "@/lib/constants";

export default function PackagesPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden hero-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <Star size={14} /> All-Inclusive
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Medical Tourism <span className="text-gradient">Packages</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Comprehensive packages covering treatment, accommodation, travel, and personal assistance
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
            {packages.map((pkg, i) => (
              <StaggerItem key={pkg.id}>
                <motion.div
                  className={`group glass-card rounded-2xl overflow-hidden card-hover h-full ${i === 0 ? "ring-2 ring-primary/30" : ""}`}
                  whileHover={{ scale: 1.02 }}
                >
                  {i === 0 && <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold z-10">Most Popular</div>}
                  <div className={`h-3 bg-gradient-to-r ${pkg.color}`} />
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3">{pkg.name}</h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-gradient">{pkg.price}</span>
                      <span className="text-sm text-muted">starting from</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted mb-8">
                      <Clock size={14} /> {pkg.duration}
                    </div>
                    <ul className="space-y-3 mb-8">
                      {pkg.includes.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                            <Check size={12} className="text-green-600" />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                        i === 0
                          ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20 hover:shadow-primary/40"
                          : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                      }`}
                    >
                      Get Custom Quote <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3} className="mt-16 text-center">
            <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-3">Need a Custom Package?</h3>
              <p className="text-muted mb-6">Every patient is unique. Tell us your requirements and we&apos;ll create a personalized package just for you.</p>
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                Contact Our Team <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
