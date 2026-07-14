import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import HeroAlt from "@/components/sections/HeroAlt";

export const metadata: Metadata = {
  title: "Hero Preview",
  robots: { index: false, follow: false },
};

export default function HeroPreviewPage() {
  return (
    <div>
      <div className="bg-slate-900 text-white text-center text-sm font-semibold py-2">
        Option A — current homepage hero
      </div>
      <Hero />

      <div className="bg-slate-900 text-white text-center text-sm font-semibold py-2">
        Option B — background-photo variant
      </div>
      <HeroAlt />
    </div>
  );
}
