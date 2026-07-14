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
          filter: "brightness(0.5) saturate(1.15)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/50" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
        <FadeIn className="w-full max-w-3xl">
          <div className="rounded-3xl bg-black/55 backdrop-blur-md border border-white/15 shadow-2xl shadow-black/40 px-6 sm:px-12 py-10 sm:py-14 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6">
              <ShieldCheck size={14} className="text-emerald-400" /> Trusted Medical Tourism Partner
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 [text-wrap:balance]">
              India&apos;s Most Trusted <span className="text-gradient-gold">Medical Tourism</span> Platform
            </h1>

            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-9 leading-relaxed">
              Connect with JCI-accredited hospitals and world-class specialists — get a free medical opinion within 24 hours.
            </p>

            <form action="/treatments" className="relative mb-8">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
              <input
                type="text"
                name="q"
                placeholder="Search for a treatment, hospital, or doctor"
                className="w-full bg-white rounded-full pl-12 pr-32 py-4 text-base text-foreground outline-none focus:ring-4 focus:ring-white/30 shadow-xl"
              />
              <button type="submit" className="absolute right-1.5 top-1.5 bottom-1.5 px-6 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30">
                Search
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {checklist.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs sm:text-sm text-white font-medium bg-white/10 border border-white/15 rounded-full px-4 py-2"
                >
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
