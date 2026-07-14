"use client";

import { Search, CheckCircle2, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

const checklist = [
  "JCI & NABH accredited hospitals",
  "24/7 patient support",
  "Free expert medical opinions",
  "Transparent, upfront pricing",
];

export default function HeroAlt() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-accent" />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/hero-doctor-patient.png)",
          filter: "brightness(0.55) saturate(1.15)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/30 mix-blend-overlay" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-28">
        <FadeIn>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6 tracking-wide">
            <ShieldCheck size={14} className="text-emerald-400" /> Trusted Medical Tourism Partner
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-tight mb-5 [text-wrap:balance] [text-shadow:0_4px_24px_rgb(0_0_0_/_45%)]">
            India&apos;s Most Trusted <span className="text-gradient-gold">Medical Tourism</span> Platform
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-base sm:text-lg text-white/85 max-w-2xl mb-10 leading-relaxed [text-shadow:0_2px_12px_rgb(0_0_0_/_40%)]">
            Connect with JCI-accredited hospitals and world-class specialists — get a free medical opinion within 24 hours.
          </p>
        </FadeIn>

        <FadeIn delay={0.3} className="w-full max-w-xl mb-10">
          <form action="/treatments" className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <input
              type="text"
              name="q"
              placeholder="Search for a treatment, hospital, or doctor"
              className="w-full bg-white rounded-full pl-12 pr-32 py-4 text-base text-foreground outline-none focus:ring-4 focus:ring-white/30 shadow-2xl shadow-black/30"
            />
            <button type="submit" className="absolute right-1.5 top-1.5 bottom-1.5 px-6 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30">
              Search
            </button>
          </form>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {checklist.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-xs sm:text-sm text-white font-medium bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2"
              >
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
