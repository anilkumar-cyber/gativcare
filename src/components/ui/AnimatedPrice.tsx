"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { useCurrency } from "@/components/layout/CurrencyContext";
import { parseUsdAmounts, convertFromUsd, formatCurrency } from "@/lib/currency";

/** Displays a USD price (or "$3,000 - $7,000" range) in the selected currency, tweening the digits when the currency changes. */
export function AnimatedPrice({ value, className }: { value: string | number; className?: string }) {
  const { currency } = useCurrency();
  const amounts = parseUsdAmounts(value);
  const targets = amounts.map((a) => convertFromUsd(a, currency));
  const [displayed, setDisplayed] = useState(targets);
  const prevRef = useRef(targets);
  const prevCurrencyRef = useRef(currency);

  useEffect(() => {
    if (prevCurrencyRef.current === currency) return;
    const from = prevRef.current;
    const controls = targets.map((target, i) =>
      animate(from[i] ?? target, target, {
        duration: 0.6,
        ease: "easeOut",
        onUpdate: (v) => {
          setDisplayed((prev) => {
            const next = [...prev];
            next[i] = v;
            return next;
          });
        },
      })
    );
    prevRef.current = targets;
    prevCurrencyRef.current = currency;
    return () => controls.forEach((c) => c.stop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  if (amounts.length === 0) return <span className={className}>{String(value)}</span>;

  return <span className={className}>{displayed.map((v) => formatCurrency(v, currency)).join(" - ")}</span>;
}
