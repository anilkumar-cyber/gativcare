import { describe, it, expect } from "vitest";
import { treatmentPricing, getTreatmentPricing } from "@/lib/pricing";

describe("treatmentPricing", () => {
  it("has no duplicate slugs", () => {
    const slugs = treatmentPricing.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every entry has a positive India and USA price", () => {
    for (const t of treatmentPricing) {
      expect(t.indiaUSD).toBeGreaterThan(0);
      expect(t.usaUSD).toBeGreaterThan(0);
    }
  });

  it("India price is always cheaper than the USA price", () => {
    for (const t of treatmentPricing) {
      expect(t.indiaUSD).toBeLessThan(t.usaUSD);
    }
  });
});

describe("getTreatmentPricing", () => {
  it("finds a treatment by slug", () => {
    expect(getTreatmentPricing("dental-implant")?.indiaUSD).toBe(1000);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getTreatmentPricing("not-a-real-treatment")).toBeUndefined();
  });
});
