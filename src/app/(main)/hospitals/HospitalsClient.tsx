"use client";

import { useState } from "react";
import { Search, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { CityMap } from "@/components/sections/CityMap";
import PartnerHospitals from "@/components/sections/PartnerHospitals";
import type { PartnerLogo } from "@/components/sections/PartnerHospitalsCarousel";
import { hospitals } from "@/lib/constants";

const uniqueCities = Array.from(new Set(hospitals.map((h) => h.city)));
const cities = ["All", ...uniqueCities];
const cityCounts = Object.fromEntries(uniqueCities.map((c) => [c, hospitals.filter((h) => h.city === c).length]));

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="text-sm font-bold text-primary tabular-nums">{value}</div>
      <div className="text-[10px] text-muted uppercase tracking-wide">{label}</div>
    </div>
  );
}

export default function HospitalsClient({ partnerLogos }: { partnerLogos: PartnerLogo[] }) {
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Top Accredited Hospital Networks We Facilitate
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-2">
              GativCare is an independent medical travel facilitator. We help patients coordinate and
              compare world-class treatment options across India&apos;s leading healthcare networks,
              including Apollo and Yashoda.
            </p>
            <p className="text-sm text-muted max-w-2xl mx-auto mb-8">
              We are not a healthcare provider and do not have exclusive partnerships with the networks listed below.
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
            <CityMap cities={uniqueCities} counts={cityCounts} selectedCity={selectedCity} onSelect={setSelectedCity} />

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

      <PartnerHospitals logos={partnerLogos} />

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted mb-6">
            {filtered.length} {filtered.length === 1 ? "network" : "networks"}
            {selectedCity !== "All" ? ` in ${selectedCity}` : ""}
          </p>

          <StaggerContainer className="rounded-2xl border border-border divide-y divide-border overflow-hidden bg-white dark:bg-slate-900" staggerDelay={0.06}>
            {filtered.map((hospital) => (
              <StaggerItem key={hospital.id}>
                <div className="flex flex-col lg:flex-row lg:items-center gap-5 p-6 hover:bg-surface/60 transition-colors">
                  <div className="lg:w-64 shrink-0">
                    <h3 className="text-lg font-bold">{hospital.name}</h3>
                    <p className="text-sm text-muted flex items-center gap-1 mt-1"><MapPin size={13} /> {hospital.city} · est. {hospital.established}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {hospital.accreditations.map((acc) => (
                        <span key={acc} className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {acc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 lg:flex-1 lg:border-x lg:border-border lg:px-6">
                    {hospital.specialties.map((spec) => (
                      <span key={spec} className="text-xs px-2.5 py-1 rounded-full bg-surface text-muted">{spec}</span>
                    ))}
                  </div>

                  <div className="flex gap-6 lg:w-72 shrink-0">
                    <Stat label="Rating" value={`${hospital.rating} ★`} />
                    <Stat label="Beds" value={hospital.beds} />
                    <Stat label="Doctors" value={hospital.doctors} />
                    <Stat label="Success" value={hospital.successRate} />
                  </div>

                  <div className="flex gap-2 lg:w-56 shrink-0">
                    <Link href="/contact" className="flex-1 text-center py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors">
                      Get a Free Consultation
                    </Link>
                    <Link href="/contact" className="px-3 py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors flex items-center justify-center">
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
            {filtered.length === 0 && (
              <div className="p-10 text-center text-muted text-sm">
                No hospital networks match &quot;{search}&quot;{selectedCity !== "All" ? ` in ${selectedCity}` : ""}.
              </div>
            )}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
