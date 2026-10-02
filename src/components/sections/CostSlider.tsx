"use client";

import { useState } from "react";
import { GripVertical } from "lucide-react";
import { treatmentPricing } from "@/lib/pricing";
import { useCurrency } from "@/components/layout/CurrencyContext";

export function CostSlider() {
  const { display } = useCurrency();
  const [slug, setSlug] = useState(treatmentPricing[0].slug);
  const [pos, setPos] = useState(50);
  const treatment = treatmentPricing.find((t) => t.slug === slug) ?? treatmentPricing[0];

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-bold">Drag to Compare: India vs USA</h3>
        <select
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="bg-surface rounded-xl px-3 py-2 text-sm border border-border outline-none focus:ring-2 focus:ring-primary/30"
        >
          {treatmentPricing.map((t) => (
            <option key={t.slug} value={t.slug}>{t.treatment}</option>
          ))}
        </select>
      </div>

      <div className="relative h-40 rounded-2xl overflow-hidden select-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-end pr-6 sm:pr-10">
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-white/60 mb-1">USA (avg.)</p>
            <p className="text-2xl sm:text-3xl font-bold text-white">{display(treatment.usaUSD)}</p>
          </div>
        </div>

        <div
          className="absolute inset-y-0 left-0 overflow-hidden flex items-center pl-6 sm:pl-10 bg-gradient-to-br from-emerald-500 to-primary"
          style={{ width: `${pos}%` }}
        >
          <div className="text-left" style={{ width: "min(280px, 60vw)" }}>
            <p className="text-xs uppercase tracking-wide text-white/70 mb-1">India</p>
            <p className="text-2xl sm:text-3xl font-bold text-white">{display(treatment.indiaUSD)}</p>
          </div>
        </div>

        <div
          className="absolute inset-y-0 flex items-center justify-center w-8 -ml-4 pointer-events-none"
          style={{ left: `${pos}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
            <GripVertical size={16} className="text-foreground" />
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
          aria-label="Drag to compare India and USA treatment costs"
        />
      </div>

      <p className="text-xs text-muted text-center mt-4">
        Drag the handle to compare {treatment.treatment.toLowerCase()} costs. Prices are approximate estimates.
      </p>
    </div>
  );
}
