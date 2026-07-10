export type CurrencyCode = "INR" | "USD" | "GBP" | "EUR" | "AUD";

export const USD_TO_INR_RATE = 83;

const localeByCurrency: Record<CurrencyCode, string> = {
  INR: "en-IN",
  USD: "en-US",
  GBP: "en-GB",
  EUR: "de-DE",
  AUD: "en-AU",
};

export function formatCurrency(amount: number, currency: CurrencyCode): string {
  return new Intl.NumberFormat(localeByCurrency[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  /** Units of this currency per 1 USD. */
  rateFromUsd: number;
}

// Static approximate rates — good enough for display purposes on a
// marketing site; not used for actual billing/payment amounts.
export const CURRENCIES: CurrencyInfo[] = [
  { code: "USD", symbol: "$", name: "US Dollar", rateFromUsd: 1 },
  { code: "INR", symbol: "₹", name: "Indian Rupee", rateFromUsd: USD_TO_INR_RATE },
  { code: "GBP", symbol: "£", name: "British Pound", rateFromUsd: 0.79 },
  { code: "EUR", symbol: "€", name: "Euro", rateFromUsd: 0.92 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rateFromUsd: 1.52 },
];

export function convertFromUsd(amountUsd: number, currency: CurrencyCode): number {
  const info = CURRENCIES.find((c) => c.code === currency);
  return amountUsd * (info?.rateFromUsd ?? 1);
}

export function convertBetween(amount: number, from: CurrencyCode, to: CurrencyCode): number {
  const fromRate = CURRENCIES.find((c) => c.code === from)?.rateFromUsd ?? 1;
  const toRate = CURRENCIES.find((c) => c.code === to)?.rateFromUsd ?? 1;
  return (amount / fromRate) * toRate;
}
