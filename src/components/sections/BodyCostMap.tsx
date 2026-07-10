"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { PersonStanding, Coins, TrendingDown, X, Smile, HeartPulse, Heart, Activity, Bone, Sparkles, Award, GraduationCap, ReceiptText, Plane, Headphones, ArrowRight, type LucideIcon } from "lucide-react";
import { getTreatmentPricing } from "@/lib/pricing";
import { CURRENCIES } from "@/lib/currency";
import { useCurrency } from "@/components/layout/CurrencyContext";

const trustPoints: { title: string; description: string; icon: LucideIcon }[] = [
  { title: "JCI & NABH Accredited Hospitals", description: "Same global safety standards as US and UK hospitals", icon: Award },
  { title: "3,000+ Specialist Surgeons", description: "Many trained at Harvard, Johns Hopkins, and other top institutes", icon: GraduationCap },
  { title: "All-Inclusive, Transparent Quotes", description: "No hidden fees — the price we quote is the price you pay", icon: ReceiptText },
  { title: "Free Visa & Travel Assistance", description: "Medical visa, flights, and airport pickup handled for you", icon: Plane },
  { title: "Dedicated Case Manager, 24/7", description: "One point of contact from first call to your flight home", icon: Headphones },
];

const bodyCostSpots: { id: string; slug: string; name: string; top: number; left: number; icon: LucideIcon }[] = [
  { id: "dental", slug: "dental-implant", name: "Dental Implant", top: 33.2, left: 51.9, icon: Smile },
  { id: "heart-bypass", slug: "heart-bypass-surgery", name: "Heart Bypass Surgery", top: 38.5, left: 55.6, icon: HeartPulse },
  { id: "heart-valve", slug: "heart-valve-replacement", name: "Heart Valve Replacement", top: 43.5, left: 57.5, icon: Heart },
  { id: "angioplasty", slug: "angioplasty", name: "Angioplasty", top: 59.2, left: 41.25, icon: Activity },
  { id: "hip", slug: "hip-replacement", name: "Hip Replacement", top: 65, left: 55, icon: Bone },
  { id: "knee", slug: "knee-replacement", name: "Knee Replacement", top: 70, left: 48.75, icon: Bone },
];

const bodyCostData = bodyCostSpots.map((spot) => {
  const pricing = getTreatmentPricing(spot.slug);
  if (!pricing) throw new Error(`Missing pricing for treatment slug: ${spot.slug}`);
  return { ...spot, india: pricing.indiaUSD, usa: pricing.usaUSD };
});

function savingsPct(india: number, usa: number) {
  return Math.round(((usa - india) / usa) * 100);
}

const maxSavings = Math.max(...bodyCostData.map((p) => savingsPct(p.india, p.usa)));

export default function BodyCostMap() {
  const { currency, display } = useCurrency();
  const currencySymbol = CURRENCIES.find((c) => c.code === currency)?.symbol ?? "$";
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="section-padding bg-surface relative overflow-hidden" id="body-cost-map">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-accent/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <PersonStanding size={14} /> Interactive Cost Explorer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Tap a Body Part, See the <span className="text-gradient-gold">Price in {currencySymbol}</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Hover or tap any highlighted point to see the treatment cost in India vs the USA.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
        <FadeIn delay={0.2}>
          <div
            className="relative mx-auto rounded-2xl bg-white dark:bg-slate-900 shadow-2xl shadow-primary/10 ring-1 ring-border p-3 sm:p-5"
            style={{ maxWidth: 560 }}
            onClick={() => setActiveId(null)}
          >
            <div className="absolute -top-3 -right-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold shadow-lg">
              <Sparkles size={12} /> Save up to {maxSavings}%
            </div>

            <div className="relative mx-auto" style={{ width: "100%", aspectRatio: "4 / 5" }}>
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <Image
                  src="/images/medical-tourism-costs.png"
                  alt="India's medical tourism cost comparison across treatments"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 90vw, 560px"
                />
              </div>

              {bodyCostData.map((part) => {
                const isActive = activeId === part.id;
                const savings = savingsPct(part.india, part.usa);
                const Icon = part.icon;

                return (
                  <div
                    key={part.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ top: `${part.top}%`, left: `${part.left}%` }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={() => setActiveId(part.id)}
                    onMouseLeave={() => setActiveId((cur) => (cur === part.id ? null : cur))}
                  >
                    <button
                      onClick={() => setActiveId((cur) => (cur === part.id ? null : part.id))}
                      aria-label={`${part.name} cost`}
                      className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/40 ring-2 ring-white dark:ring-slate-900 hover:scale-110 transition-transform focus:outline-none"
                    >
                      <span className="absolute inset-0 rounded-full bg-primary/60 animate-ping" />
                      <Icon size={14} className="relative" />
                    </button>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 6 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 6 }}
                          transition={{ duration: 0.18 }}
                          className={`absolute z-20 w-60 rounded-xl overflow-hidden shadow-2xl border border-border bg-white dark:bg-slate-900 ${
                            part.left >= 50 ? "left-8" : "right-8"
                          } ${part.top > 60 ? "bottom-0" : "top-0"}`}
                        >
                          <div className="px-4 py-2 bg-gradient-to-r from-primary to-accent flex items-center gap-2">
                            <Icon size={14} className="text-white shrink-0" />
                            <p className="text-white text-sm font-semibold leading-tight">{part.name}</p>
                            <button
                              onClick={() => setActiveId(null)}
                              className="ml-auto text-white/80 hover:text-white sm:hidden"
                              aria-label="Close"
                            >
                              <X size={14} />
                            </button>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center gap-1.5 text-green-600 font-bold text-lg mb-1">
                              <Coins size={16} />
                              {display(part.india)}
                            </div>
                            <p className="text-xs text-muted mb-2">in India</p>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted line-through">{display(part.usa)} in USA</span>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 font-bold">
                                <TrendingDown size={11} /> {savings}%
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5" staggerDelay={0.05}>
              {bodyCostData.map((part) => {
                const Icon = part.icon;
                return (
                  <StaggerItem key={part.id}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveId((cur) => (cur === part.id ? null : part.id));
                      }}
                      className={`w-full flex items-center gap-2 p-2.5 rounded-lg border transition-colors text-left ${
                        activeId === part.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40 hover:bg-surface-hover"
                      }`}
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent text-white shrink-0">
                        <Icon size={14} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-medium truncate">{part.name}</span>
                        <span className="block text-sm font-bold text-green-600">{display(part.india)}</span>
                      </span>
                    </button>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} direction="left" className="h-full">
          <div className="h-full flex flex-col justify-between glass-card rounded-2xl p-6 sm:p-8">
          <div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-6">
            Why the Price Gap is <span className="text-gradient-gold">Real, Not Risky</span>
          </h3>
          <StaggerContainer className="space-y-5" staggerDelay={0.08}>
            {trustPoints.map((point) => {
              const Icon = point.icon;
              return (
                <StaggerItem key={point.title}>
                  <div className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary shrink-0">
                      <Icon size={20} />
                    </span>
                    <div>
                      <p className="font-semibold text-sm sm:text-base">{point.title}</p>
                      <p className="text-sm text-muted">{point.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
          </div>

          <a href="/contact" className="btn-primary inline-flex items-center justify-center gap-2 mt-8 w-full sm:w-auto self-start">
            Get Your Free Cost Estimate <ArrowRight size={16} />
          </a>
          </div>
        </FadeIn>
        </div>

        <FadeIn delay={0.4} className="mt-10 text-center">
          <p className="text-sm text-muted">Prices are approximate and vary by hospital and case complexity.</p>
        </FadeIn>
      </div>
    </section>
  );
}
