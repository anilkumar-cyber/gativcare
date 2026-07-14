"use client";

import { Search, CheckCircle2 } from "lucide-react";

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
        style={{ backgroundImage: "url(/images/hero-doctor-patient.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />

      <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-tight mb-6">
          India&apos;s Most Trusted <span className="text-gradient">Medical Tourism</span> Platform
        </h1>

        <form action="/treatments" className="w-full max-w-xl relative mb-10">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          <input
            type="text"
            name="q"
            placeholder="Search for a treatment, hospital, or doctor"
            className="w-full bg-white rounded-full pl-12 pr-32 py-4 text-base text-foreground outline-none focus:ring-2 focus:ring-primary/40 shadow-xl"
          />
          <button type="submit" className="absolute right-1.5 top-1.5 bottom-1.5 px-6 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors">
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {checklist.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm sm:text-base text-white/90 font-medium">
              <CheckCircle2 size={16} className="text-white shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
