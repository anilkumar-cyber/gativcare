"use client";

import { motion } from "framer-motion";
import {
  MessageCircle, Upload, UserCheck, ClipboardList, Receipt, FileCheck,
  Plane, Car, Building2, Stethoscope, HeartPulse, MapPin, Video, Home
} from "lucide-react";
import { FadeIn } from "@/components/ui/motion";
import { journeySteps } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  MessageCircle, Upload, UserCheck, ClipboardList, Receipt, FileCheck,
  Plane, Car, Building2, Stethoscope, HeartPulse, MapPin, Video, Home,
};

export default function PatientJourney() {
  return (
    <section className="section-padding relative overflow-hidden" id="journey">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Your Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Your <span className="text-gradient">Patient Journey</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            A seamless, end-to-end experience from first inquiry to returning home healthy
          </p>
        </FadeIn>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-accent/30 to-primary/30 -translate-x-1/2" />

          <div className="space-y-6 lg:space-y-0">
            {journeySteps.map((step, i) => {
              const Icon = iconMap[step.icon] || MessageCircle;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`relative lg:flex items-center ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"} lg:gap-8`}
                >
                  <div className={`lg:w-1/2 ${isLeft ? "lg:text-right lg:pr-12" : "lg:text-left lg:pl-12"}`}>
                    <motion.div
                      className="glass-card rounded-2xl p-5 inline-block card-hover"
                      whileHover={{ scale: 1.03 }}
                    >
                      <div className={`flex items-center gap-3 ${isLeft ? "lg:flex-row-reverse" : ""}`}>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center flex-shrink-0">
                          <Icon size={20} className="text-primary" />
                        </div>
                        <div className={isLeft ? "lg:text-right" : ""}>
                          <span className="text-xs font-medium text-primary/60">Step {step.step}</span>
                          <h3 className="text-base font-semibold">{step.title}</h3>
                          <p className="text-sm text-muted">{step.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent items-center justify-center text-white text-sm font-bold shadow-lg shadow-primary/30 z-10">
                    {step.step}
                  </div>

                  <div className="lg:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
