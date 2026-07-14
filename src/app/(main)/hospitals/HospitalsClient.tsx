"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { hospitals } from "@/lib/constants";

const cities = ["All", ...Array.from(new Set(hospitals.map((h) => h.city)))];

export default function HospitalsClient() {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");

  const filtered = hospitals.filter((h) => {
    const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchesCity = selectedCity === "All" || h.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden hero-gradient">
        <div className="absolute inset-0">
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Building2 size={14} /> Partner Hospitals
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              India&apos;s <span className="text-gradient">Top Hospitals</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
              JCI and NABH accredited hospitals with world-class infrastructure
            </p>
            <div className="max-w-xl mx-auto relative mb-6">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search hospitals or specialties..."
                className="w-full bg-white dark:bg-slate-900 rounded-2xl pl-12 pr-4 py-4 text-base outline-none focus:ring-2 focus:ring-primary/30 shadow-lg border border-border"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCity === city
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "bg-white dark:bg-slate-800 text-foreground hover:bg-primary/10 border border-border"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {filtered.map((hospital) => (
              <StaggerItem key={hospital.id}>
                <motion.div
                  className="group glass-card rounded-2xl overflow-hidden card-hover h-full"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <span className="text-6xl">{hospital.image}</span>
                    <div className="absolute top-4 right-4 flex gap-1.5">
                      {hospital.accreditations.map((acc) => (
                        <span key={acc} className="text-[10px] font-bold px-2 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 text-primary shadow-sm">
                          {acc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{hospital.name}</h3>
                      <p className="text-sm text-muted flex items-center gap-1 mt-1"><MapPin size={13} /> {hospital.city}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {hospital.specialties.map((spec) => (
                        <span key={spec} className="text-xs px-2.5 py-1 rounded-full bg-surface text-muted">{spec}</span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-y border-border">
                      <div className="text-center">
                        <div className="text-sm font-bold text-primary">{hospital.beds}</div>
                        <div className="text-[10px] text-muted">Beds</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-primary">{hospital.doctors}</div>
                        <div className="text-[10px] text-muted">Doctors</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link href="/contact" className="flex-1 text-center py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors">
                        Book Appointment
                      </Link>
                      <button className="px-3 py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
