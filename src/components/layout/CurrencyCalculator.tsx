"use client";

import { useEffect, useRef, useState } from "react";
import { Calculator, ArrowLeftRight } from "lucide-react";
import { CURRENCIES, convertBetween, formatCurrency, type CurrencyCode } from "@/lib/currency";

export function CurrencyCalculator({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("1000");
  const [from, setFrom] = useState<CurrencyCode>("USD");
  const [to, setTo] = useState<CurrencyCode>("INR");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const parsed = Number(amount.replace(/,/g, ""));
  const result = Number.isFinite(parsed) ? convertBetween(parsed, from, to) : 0;

  return (
    <div className="relative notranslate" translate="no" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 ${compact ? "text-sm" : "px-3 py-1.5 rounded-lg hover:bg-surface"} transition-colors`}
        aria-label="Currency calculator"
      >
        <Calculator size={compact ? 13 : 16} />
        <span>Currency</span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-72 rounded-xl border border-border bg-white dark:bg-slate-900 shadow-xl z-50 text-foreground p-4 space-y-3">
          <p className="text-xs font-semibold text-muted uppercase">Currency Calculator</p>

          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full bg-surface rounded-lg px-3 py-2 text-sm border border-border outline-none focus:ring-2 focus:ring-primary/30"
          />

          <div className="flex items-center gap-2">
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value as CurrencyCode)}
              className="flex-1 bg-surface rounded-lg px-2 py-2 text-sm border border-border outline-none min-w-0"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
              ))}
            </select>
            <button
              onClick={() => { setFrom(to); setTo(from); }}
              aria-label="Swap currencies"
              className="p-2 rounded-lg hover:bg-surface text-muted flex-shrink-0"
            >
              <ArrowLeftRight size={14} />
            </button>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value as CurrencyCode)}
              className="flex-1 bg-surface rounded-lg px-2 py-2 text-sm border border-border outline-none min-w-0"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
              ))}
            </select>
          </div>

          <div className="p-3 rounded-lg bg-surface border border-border text-center">
            <p className="text-[11px] text-muted">{formatCurrency(Number.isFinite(parsed) ? parsed : 0, from)} equals</p>
            <p className="text-lg font-bold text-primary">{formatCurrency(result, to)}</p>
          </div>

          <p className="text-[10px] text-muted text-center">Approximate rates, for reference only.</p>
        </div>
      )}
    </div>
  );
}
