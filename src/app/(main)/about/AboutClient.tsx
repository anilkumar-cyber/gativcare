"use client";

import { motion } from "framer-motion";
import { Shield, Heart, Globe, Award, Target, Eye } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, AnimatedCounter } from "@/components/ui/motion";

const values = [
  { icon: Heart, title: "Patient First", description: "Every decision we make puts the patient's health, safety, and comfort at the center" },
  { icon: Shield, title: "Trust & Transparency", description: "Honest pricing, verified hospitals, and clear communication throughout your journey" },
  { icon: Globe, title: "Global Standards", description: "We partner only with JCI and NABH accredited hospitals meeting international quality benchmarks" },
  { icon: Award, title: "Excellence", description: "Handpicked specialists with proven track records and exceptional patient outcomes" },
];

const milestones = [
  { year: "2018", title: "Founded", description: "GativCare was born with a mission to make world-class healthcare accessible globally" },
  { year: "2019", title: "100 Hospitals", description: "Partnered with 100+ accredited hospitals across 8 Indian cities" },
  { year: "2020", title: "Virtual Care", description: "Launched telemedicine platform enabling remote consultations during COVID-19" },
  { year: "2021", title: "25,000 Patients", description: "Milestone of 25,000 international patients served from 40+ countries" },
  { year: "2022", title: "AI Integration", description: "Introduced AI-powered treatment matching and cost estimation" },
  { year: "2023", title: "Global Expansion", description: "Offices in 5 countries, serving patients from 65+ nations" },
  { year: "2024", title: "50,000+ Patients", description: "Crossed 50,000 patients with 98.5% satisfaction rate" },
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
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 50000, suffix: "+", label: "Patients Served" },
                  { value: 250, suffix: "+", label: "Partner Hospitals" },
                  { value: 65, suffix: "+", label: "Countries" },
                  { value: 98, suffix: "%", label: "Satisfaction Rate" },
                ].map((stat) => (
                  <div key={stat.label} className="glass-card rounded-xl p-4">
                    <div className="text-2xl font-bold text-gradient">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our <span className="text-gradient">Journey</span></h2>
          </FadeIn>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-accent/30 to-primary/30" />
            <div className="space-y-8">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-20"
                >
                  <div className="absolute left-4 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    {milestone.year.slice(-2)}
                  </div>
                  <div className="glass-card rounded-xl p-5">
                    <span className="text-xs font-bold text-primary">{milestone.year}</span>
                    <h3 className="text-lg font-semibold mb-1">{milestone.title}</h3>
                    <p className="text-sm text-muted">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
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
