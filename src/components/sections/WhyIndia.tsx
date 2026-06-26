"use client";

import { motion } from "framer-motion";
import { DollarSign, GraduationCap, Award, Cpu, Clock, Languages, Globe, Palmtree } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { whyIndiaReasons } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  DollarSign, GraduationCap, Award, Cpu, Clock, Languages, Globe, Palmtree,
};

export default function WhyIndia() {
  return (
    <section className="section-padding bg-surface relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why Choose India
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            India: The World&apos;s <span className="text-gradient">Healthcare Destination</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Discover why millions of patients choose India for world-class medical care at a fraction of the cost
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
          {whyIndiaReasons.map((reason, i) => {
            const Icon = iconMap[reason.icon] || Globe;
            return (
              <StaggerItem key={i}>
                <motion.div
                  className="group relative glass-card rounded-2xl p-6 card-hover h-full"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{reason.description}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
