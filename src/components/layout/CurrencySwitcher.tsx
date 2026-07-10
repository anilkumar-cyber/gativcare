"use client";

import { useEffect, useRef, useState } from "react";
import { Coins, Check } from "lucide-react";
import { CURRENCIES } from "@/lib/currency";
import { useCurrency } from "@/components/layout/CurrencyContext";

export function CurrencySwitcher({ compact = false }: { compact?: boolean }) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative notranslate" translate="no" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 ${compact ? "text-sm" : "px-3 py-1.5 rounded-lg hover:bg-surface"} transition-colors`}
        aria-label="Change currency"
      >
        <Coins size={compact ? 13 : 16} />
        <span>{currency}</span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-56 rounded-xl border border-border bg-white dark:bg-slate-900 shadow-xl z-50 text-foreground flex flex-col max-h-80 overflow-y-auto py-1">
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              onClick={() => { setCurrency(c.code); setOpen(false); }}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-surface transition-colors"
            >
              <span className="flex items-baseline gap-2">
                <span className="font-medium w-6 inline-block">{c.symbol}</span>
                <span>{c.name}</span>
                <span className="text-xs text-muted">{c.code}</span>
              </span>
              {currency === c.code && <Check size={14} className="text-primary flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
