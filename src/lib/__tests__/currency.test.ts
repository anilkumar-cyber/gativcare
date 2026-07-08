import { describe, it, expect } from "vitest";
import { formatCurrency, USD_TO_INR_RATE } from "@/lib/currency";

describe("formatCurrency", () => {
  it("formats USD with no decimal places", () => {
    expect(formatCurrency(5200, "USD")).toBe("$5,200");
  });

  it("formats INR with the rupee symbol and Indian digit grouping", () => {
    expect(formatCurrency(431600, "INR")).toBe("₹4,31,600");
  });

  it("rounds to whole units", () => {
    expect(formatCurrency(1999.6, "USD")).toBe("$2,000");
  });
});

describe("USD_TO_INR_RATE", () => {
  it("is a positive number", () => {
    expect(USD_TO_INR_RATE).toBeGreaterThan(0);
  });
});
