"use client";

import { motion } from "framer-motion";
import {
  FileCheck, Car, Hotel, Languages, Coins, Smartphone,
  Shield, Headphones, Siren
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { conciergeServices } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  FileCheck, Car, Hotel, Languages, Coins, Smartphone, Shield, Headphones, Siren,
};

export default function Concierge() {
  return (
    <section className="section-padding relative overflow-hidden" id="concierge">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn direction="right">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Premium Services
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Healthcare <span className="text-gradient">Concierge</span>
            </h2>
            <p className="text-lg text-muted mb-8 leading-relaxed">
              Experience luxury healthcare travel with our comprehensive concierge services.
              From visa assistance to post-treatment tourism, we handle everything so you
              can focus on your health.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { label: "24/7 Support", value: "Always Available" },
                { label: "Languages", value: "20+ Supported" },
                { label: "Response Time", value: "Under 30 min" },
                { label: "Satisfaction", value: "99.2% Rating" },
              ].map((item) => (
                <div key={item.label} className="glass-card rounded-xl p-4">
                  <div className="text-lg font-bold text-primary">{item.value}</div>
                  <div className="text-xs text-muted">{item.label}</div>
                </div>
              ))}
            </div>

            <motion.a
              href="/contact"
              className="btn-primary inline-flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Headphones size={18} /> Contact Concierge
            </motion.a>
          </FadeIn>

          <div>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.06}>
              {conciergeServices.map((service) => {
                const Icon = iconMap[service.icon] || Shield;
                return (
                  <StaggerItem key={service.title}>
                    <motion.div
                      className="group glass-card rounded-xl p-4 card-hover"
                      whileHover={{ scale: 1.03, x: 5 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                          <Icon size={18} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-0.5">{service.title}</h4>
                          <p className="text-xs text-muted leading-relaxed">{service.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
