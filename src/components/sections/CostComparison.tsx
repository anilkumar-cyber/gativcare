"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/motion";
import { treatmentPricing } from "@/lib/pricing";
import { useCurrency } from "@/components/layout/CurrencyContext";
import { TrendingDown, DollarSign, ArrowRight } from "lucide-react";

const countries = ["usa", "uk", "germany", "australia"] as const;
const countryLabels: Record<string, string> = { usa: "🇺🇸 USA", uk: "🇬🇧 UK", germany: "🇩🇪 Germany", australia: "🇦🇺 Australia" };
const countryField = { usa: "usaUSD", uk: "ukUSD", germany: "germanyUSD", australia: "australiaUSD" } as const;

const comparableTreatments = treatmentPricing.filter((t) => t.ukUSD !== undefined);

export default function CostComparison() {
  const { display } = useCurrency();
  const [selectedCountry, setSelectedCountry] = useState<string>("usa");

  return (
    <section className="section-padding bg-surface relative overflow-hidden" id="cost-comparison">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-sm font-medium mb-4">
            <TrendingDown size={14} /> Cost Savings
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Save Up To <span className="text-gradient-gold">90%</span> on Treatment
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Compare treatment costs in India with other countries. Same quality, fraction of the price.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {countries.map((c) => (
              <motion.button
                key={c}
                onClick={() => setSelectedCountry(c)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCountry === c
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-white dark:bg-slate-800 text-foreground hover:bg-primary/10 border border-border"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {countryLabels[c]}
              </motion.button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-4 gap-4 p-5 bg-gradient-to-r from-primary/10 to-accent/10 text-sm font-semibold">
              <div>Treatment</div>
              <div className="text-center">🇮🇳 India</div>
              <div className="text-center">{countryLabels[selectedCountry]}</div>
              <div className="text-center">You Save</div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCountry}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {comparableTreatments.map((item, i) => {
                  const comparePrice = item[countryField[selectedCountry as keyof typeof countryField]] as number;
                  const savings = Math.round(((comparePrice - item.indiaUSD) / comparePrice) * 100);

                  return (
                    <motion.div
                      key={item.treatment}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 p-5 border-b border-border last:border-0 hover:bg-surface-hover transition-colors"
                    >
                      <div className="font-medium text-sm sm:text-base">{item.treatment}</div>
                      <div className="sm:text-center">
                        <span className="sm:hidden text-xs text-muted mr-2">India:</span>
                        <span className="text-green-600 font-bold">{display(item.indiaUSD)}</span>
                      </div>
                      <div className="sm:text-center">
                        <span className="sm:hidden text-xs text-muted mr-2">{countryLabels[selectedCountry]}:</span>
                        <span className="text-muted line-through">{display(comparePrice)}</span>
                      </div>
                      <div className="sm:text-center">
                        <span className="sm:hidden text-xs text-muted mr-2">Savings:</span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm font-bold">
                          <TrendingDown size={13} /> {savings}%
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeIn>

        <FadeIn delay={0.4} className="mt-8 text-center">
          <p className="text-sm text-muted mb-4">Prices are approximate and may vary based on hospital, complexity, and individual requirements.</p>
          <a href="/contact" className="btn-primary inline-flex items-center gap-2">
            <DollarSign size={16} /> Get Your Free Cost Estimate <ArrowRight size={16} />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
