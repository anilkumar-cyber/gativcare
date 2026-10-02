"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const cityPins: Record<string, { top: string; left: string }> = {
  Delhi: { top: "20%", left: "48%" },
  Gurugram: { top: "27%", left: "43%" },
  Mumbai: { top: "58%", left: "26%" },
  Bangalore: { top: "83%", left: "42%" },
};

export function CityMap({
  cities,
  counts,
  selectedCity,
  onSelect,
}: {
  cities: string[];
  counts: Record<string, number>;
  selectedCity: string;
  onSelect: (city: string) => void;
}) {
  const pinned = cities.filter((c) => cityPins[c]);

  return (
    <div className="relative mx-auto max-w-md h-64 rounded-3xl overflow-hidden glass-card mb-6">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          color: "var(--border-color)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />

      {pinned.map((city) => {
        const pos = cityPins[city];
        const isActive = selectedCity === city;
        return (
          <button
            key={city}
            onClick={() => onSelect(isActive ? "All" : city)}
            className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center group"
            style={{ top: pos.top, left: pos.left }}
          >
            {isActive && (
              <motion.span
                className="absolute bottom-0 w-8 h-8 rounded-full bg-primary/30"
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1 whitespace-nowrap transition-colors ${
                isActive ? "bg-primary text-white" : "bg-white dark:bg-slate-800 text-foreground shadow-sm group-hover:bg-primary/10"
              }`}
            >
              {city} · {counts[city] ?? 0}
            </span>
            <MapPin
              size={26}
              className={`transition-colors drop-shadow-sm ${isActive ? "text-primary" : "text-primary/70 group-hover:text-primary"}`}
            />
          </button>
        );
      })}
    </div>
  );
}
