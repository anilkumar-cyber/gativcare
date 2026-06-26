"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, Filter } from "lucide-react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { treatments } from "@/lib/constants";

export default function TreatmentsPage() {
  const [search, setSearch] = useState("");
  const filtered = treatments.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden hero-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              50+ Specialties
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Treatment <span className="text-gradient">Categories</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
              Explore our comprehensive range of medical treatments available at India&apos;s top hospitals
            </p>
            <div className="max-w-xl mx-auto relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search treatments..."
                className="w-full bg-white dark:bg-slate-900 rounded-2xl pl-12 pr-4 py-4 text-base outline-none focus:ring-2 focus:ring-primary/30 shadow-lg border border-border"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" staggerDelay={0.06}>
            {filtered.map((treatment) => (
              <StaggerItem key={treatment.id}>
                <motion.div
                  className="group glass-card rounded-2xl overflow-hidden card-hover h-full"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`h-40 bg-gradient-to-br ${treatment.color} bg-opacity-10 flex items-center justify-center relative`}>
                    <span className="text-5xl group-hover:scale-110 transition-transform">{treatment.image}</span>
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 text-xs font-bold text-foreground">
                      {treatment.cost}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {treatment.name}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-4">{treatment.description}</p>
                    <div className="flex gap-2">
                      <Link href="/contact" className="flex-1 text-center py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors">
                        Book Consultation
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

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted">No treatments found matching &ldquo;{search}&rdquo;</p>
              <button onClick={() => setSearch("")} className="mt-4 btn-primary">Clear Search</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
