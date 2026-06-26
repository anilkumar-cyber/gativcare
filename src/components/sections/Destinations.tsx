"use client";

import { motion } from "framer-motion";
import { MapPin, Building2, ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { destinations } from "@/lib/constants";

export default function Destinations() {
  return (
    <section className="section-padding bg-surface relative overflow-hidden" id="destinations">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <MapPin size={14} /> Medical Tourism Destinations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Top <span className="text-gradient">Destinations</span> in India
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            World-class healthcare combined with incredible cultural experiences
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {destinations.map((dest) => (
            <StaggerItem key={dest.id}>
              <motion.div
                className="group relative glass-card rounded-2xl overflow-hidden card-hover h-full"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-44 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{dest.image}</span>
                  <div className="absolute bottom-3 left-3 glass rounded-lg px-3 py-1.5 text-sm font-semibold text-foreground">
                    {dest.name}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 size={14} className="text-primary" />
                    <span className="text-sm font-semibold">{dest.hospitals} Hospitals</span>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-muted mb-1 font-medium uppercase tracking-wider">Top Specialties</p>
                    <p className="text-sm">{dest.specialties}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-muted mb-1 font-medium uppercase tracking-wider">Must Visit</p>
                    <p className="text-sm">{dest.attraction}</p>
                  </div>

                  <a href="/contact" className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
                    Explore Hospitals <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
