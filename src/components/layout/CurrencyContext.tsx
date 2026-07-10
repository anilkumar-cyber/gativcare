"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { CURRENCIES, convertFromUsd, formatCurrency, parseUsdAmounts, type CurrencyCode } from "@/lib/currency";

const STORAGE_KEY = "gativcare-currency";

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  /** Converts a USD amount (or a string like "$3,000 - $7,000") to the selected currency, formatted. */
  display: (usd: string | number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");

  useEffect(() => {
    // localStorage is only readable client-side; syncing after mount avoids an SSR hydration mismatch.
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && CURRENCIES.some((c) => c.code === stored)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrencyState(stored as CurrencyCode);
    }
  }, []);

  function setCurrency(code: CurrencyCode) {
    setCurrencyState(code);
    window.localStorage.setItem(STORAGE_KEY, code);
  }

  function display(usd: string | number): string {
    const amounts = parseUsdAmounts(usd);
    if (amounts.length === 0) return String(usd);
    return amounts.map((a) => formatCurrency(convertFromUsd(a, currency), currency)).join(" - ");
  }

  return <CurrencyContext.Provider value={{ currency, setCurrency, display }}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
