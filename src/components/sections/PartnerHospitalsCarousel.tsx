"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export type PartnerLogo = { id: string; name: string; logoUrl: string };

const CARD_WIDTH = 280;
const SPEED_PX_PER_SEC = 40;
const MIN_REPEATS = 10;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function isFeatured(name: string) {
  return name.toLowerCase().includes("apollo");
}

function LogoCard({ name, logo }: { name: string; logo: string }) {
  const featured = isFeatured(name);
  return (
    <div
      className={
        featured
          ? "relative flex items-center justify-center h-32 w-64 shrink-0 rounded-2xl border-2 border-primary bg-white dark:bg-slate-900 p-8 shadow-lg shadow-primary/20 ring-4 ring-primary/10"
          : "flex items-center justify-center h-32 w-64 shrink-0 rounded-2xl border border-border bg-surface p-8 shadow-sm"
      }
    >
      {featured && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold shadow-sm">
          <Star size={9} className="fill-white" /> Flagship Partner
        </span>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo} alt={`${name} logo`} className="max-h-16 w-auto object-contain" />
    </div>
  );
}

export function PartnerHospitalsCarousel({ logos }: { logos: PartnerLogo[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);

  const setWidth = logos.length * CARD_WIDTH;
  const repeats = Math.max(MIN_REPEATS, logos.length ? Math.ceil(40 / logos.length) : 0);
  const track = Array.from({ length: repeats }, () => logos).flat();

  useEffect(() => {
    if (reducedMotion || logos.length === 0) return;
    let frame: number;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!pausedRef.current) {
        posRef.current -= (SPEED_PX_PER_SEC * dt) / 1000;
        if (posRef.current <= -setWidth) posRef.current += setWidth;
        if (posRef.current > 0) posRef.current -= setWidth;
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${posRef.current}px)`;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, setWidth, logos.length]);

  const nudge = (direction: 1 | -1) => {
    posRef.current += direction * -CARD_WIDTH;
    if (posRef.current <= -setWidth) posRef.current += setWidth;
    if (posRef.current > 0) posRef.current -= setWidth;
    if (trackRef.current) {
      trackRef.current.style.transition = "transform 0.4s ease";
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
      window.setTimeout(() => {
        if (trackRef.current) trackRef.current.style.transition = "";
      }, 400);
    }
  };

  if (logos.length === 0) return null;

  return (
    <div
      role="group"
      aria-label="Official partner hospital networks"
      className="relative w-full overflow-hidden pt-3"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <button
        type="button"
        aria-label="Previous partner"
        onClick={() => nudge(-1)}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-surface border border-border shadow-md text-foreground hover:bg-primary hover:text-white transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        aria-label="Next partner"
        onClick={() => nudge(1)}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-surface border border-border shadow-md text-foreground hover:bg-primary hover:text-white transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      <div ref={trackRef} className="flex w-max gap-6 will-change-transform">
        {track.map((p, i) => (
          <LogoCard key={`${p.id}-${i}`} name={p.name} logo={p.logoUrl} />
        ))}
      </div>
    </div>
  );
}
