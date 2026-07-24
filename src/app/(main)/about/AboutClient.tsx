"use client";

import { motion } from "framer-motion";
import { Shield, Heart, Globe, Award, Target, Eye, MessageCircle, ClipboardList, Plane, HeartPulse } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const values = [
  { icon: Heart, title: "Patient First", description: "Every decision we make puts the patient's health, safety, and comfort at the center" },
  { icon: Shield, title: "Trust & Transparency", description: "Honest pricing, verified hospitals, and clear communication throughout your journey" },
  { icon: Globe, title: "Global Standards", description: "We help patients access JCI and NABH accredited hospitals meeting international quality benchmarks" },
  { icon: Award, title: "Excellence", description: "Handpicked specialists with proven track records and exceptional patient outcomes" },
];

const steps = [
  { icon: MessageCircle, title: "Free Consultation", description: "Share your medical reports and requirements — our care team reviews them and gets back to you within 24 hours" },
  { icon: ClipboardList, title: "Personalized Treatment Plan", description: "We help you compare hospitals, specialists, and costs so you can choose the option that fits your needs" },
  { icon: Plane, title: "Travel & Hospital Coordination", description: "We assist with appointments, travel logistics, and hospital coordination from arrival to admission" },
  { icon: HeartPulse, title: "Recovery & Aftercare Support", description: "Our team stays in touch through treatment and recovery, coordinating follow-ups as needed" },
];

export default function AboutClient() {
  return (
    <div className="min-h-screen">
      <section className="relative py-24 overflow-hidden hero-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                About GativCare
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Making World-Class Healthcare <span className="text-gradient">Accessible</span>
              </h1>
              <p className="text-lg text-muted leading-relaxed mb-8">
                Founded with a vision to bridge the gap between international patients and
                India&apos;s exceptional healthcare ecosystem. We combine cutting-edge technology
                with compassionate care to deliver seamless medical travel experiences.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 border border-white/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">🌏</div>
                    <h3 className="text-xl font-bold">Global Healthcare Partner</h3>
                    <p className="text-sm text-muted mt-2">Connecting patients worldwide with India&apos;s finest medical care</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our <span className="text-gradient">Core Values</span></h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <motion.div className="glass-card rounded-2xl p-6 text-center card-hover h-full" whileHover={{ scale: 1.03 }}>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted">{value.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How <span className="text-gradient">It Works</span></h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              From first message to full recovery, here&apos;s how we support you at every step.
            </p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {steps.map((step, i) => (
              <StaggerItem key={step.title}>
                <motion.div className="glass-card rounded-2xl p-6 text-center card-hover h-full relative" whileHover={{ scale: 1.03 }}>
                  <div className="absolute top-4 right-4 text-xs font-bold text-primary/40">0{i + 1}</div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted">{step.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Eye size={24} className="text-primary" />
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-muted leading-relaxed">
                  To be the world&apos;s most trusted medical tourism platform, making
                  quality healthcare accessible to every person regardless of geography
                  or economic status.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Target size={24} className="text-accent" />
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-muted leading-relaxed">
                  To deliver an unparalleled healthcare travel experience by combining
                  India&apos;s medical excellence with technology-driven personalized care,
                  transparency, and compassion.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
