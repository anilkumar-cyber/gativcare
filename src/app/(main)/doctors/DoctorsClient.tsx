"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Star, MapPin, Video, Calendar, GraduationCap, Languages } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { useCurrency } from "@/components/layout/CurrencyContext";

type Doctor = {
  id: string;
  name: string;
  hospital: string;
  city: string;
  specialization: string;
  experience: number;
  fee: string;
  rating: number;
  reviews: number;
  languages: string[];
  education: string;
  successRate: string;
};

export default function DoctorsClient({ doctors }: { doctors: Doctor[] }) {
  const { display } = useCurrency();
  const [search, setSearch] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("All");

  const specializations = ["All", ...Array.from(new Set(doctors.map((d) => d.specialization)))];

  const filtered = doctors.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase());
    const matchesSpec = selectedSpec === "All" || d.specialization === selectedSpec;
    return matchesSearch && matchesSpec;
  });

  return (
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden hero-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              3000+ Specialists
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Find Your <span className="text-gradient">Doctor</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
              Internationally trained specialists with decades of experience
            </p>
            <div className="max-w-xl mx-auto relative mb-6">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search doctors by name or specialty..."
                className="w-full bg-white dark:bg-slate-900 rounded-2xl pl-12 pr-4 py-4 text-base outline-none focus:ring-2 focus:ring-primary/30 shadow-lg border border-border"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {specializations.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpec(spec)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedSpec === spec
                      ? "bg-accent text-white shadow-lg shadow-accent/30"
                      : "bg-white dark:bg-slate-800 text-foreground hover:bg-accent/10 border border-border"
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {filtered.map((doctor) => (
              <StaggerItem key={doctor.id}>
                <motion.div
                  className="group glass-card rounded-2xl p-6 card-hover h-full"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl font-bold text-primary flex-shrink-0">
                      {doctor.name.split(" ").pop()?.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors truncate">{doctor.name}</h3>
                      <p className="text-sm text-primary font-medium">{doctor.specialization}</p>
                      <p className="text-xs text-muted mt-1 flex items-center gap-1"><MapPin size={11} /> {doctor.hospital}, {doctor.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-md">
                      <Star size={12} className="text-amber-500 fill-amber-500" />
                      <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">{doctor.rating}</span>
                    </div>
                    <span className="text-xs text-muted">{doctor.reviews} reviews</span>
                    <span className="text-xs text-muted">•</span>
                    <span className="text-xs font-medium text-green-600">{doctor.successRate} success</span>
                  </div>

                  <div className="space-y-2.5 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-muted"><GraduationCap size={14} className="text-primary flex-shrink-0" /><span className="truncate">{doctor.education}</span></div>
                    <div className="flex items-center gap-2 text-muted"><Calendar size={14} className="text-primary flex-shrink-0" /><span>{doctor.experience} years experience</span></div>
                    <div className="flex items-center gap-2 text-muted"><Languages size={14} className="text-primary flex-shrink-0" /><span className="truncate">{doctor.languages.join(", ")}</span></div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-xs text-muted">Consultation</span>
                      <span className="block text-lg font-bold text-primary">{display(doctor.fee)}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/contact?doctor=${encodeURIComponent(doctor.name)}&type=video`}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-all"
                      >
                        <Video size={13} /> Video Call
                      </Link>
                      <Link
                        href={`/contact?doctor=${encodeURIComponent(doctor.name)}&type=booking`}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-dark transition-all"
                      >
                        <Calendar size={13} /> Book
                      </Link>
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
