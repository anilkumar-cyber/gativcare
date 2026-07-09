import { ShieldCheck, Award, BadgeCheck, Landmark, Star, HeartHandshake } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "JCI Accredited Hospitals" },
  { icon: Award, label: "NABH Certified" },
  { icon: BadgeCheck, label: "ISO 9001:2015" },
  { icon: Landmark, label: "Govt. Registered Facilitator" },
  { icon: Star, label: "4.9/5 on Google Reviews" },
  { icon: HeartHandshake, label: "250+ Partner Hospitals" },
];

function BadgeRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex items-center gap-10 shrink-0 pr-10" aria-hidden={ariaHidden}>
      {badges.map((b) => (
        <div key={b.label} className="flex items-center gap-2.5 text-sm font-medium text-muted whitespace-nowrap">
          <b.icon size={18} className="text-primary shrink-0" />
          {b.label}
        </div>
      ))}
    </div>
  );
}

export function TrustLogoStrip() {
  return (
    <div
      role="group"
      aria-label="Accreditations and certifications"
      className="relative w-full overflow-hidden border-y border-border/60 bg-surface/60 py-4"
    >
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <BadgeRow />
        <BadgeRow ariaHidden />
      </div>
    </div>
  );
}
