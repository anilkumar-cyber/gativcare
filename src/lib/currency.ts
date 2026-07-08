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
