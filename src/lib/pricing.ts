export interface TreatmentPricing {
  treatment: string;
  slug: string;
  indiaUSD: number;
  usaUSD: number;
  ukUSD?: number;
  germanyUSD?: number;
  australiaUSD?: number;
}

// Single source of truth for treatment cost comparisons — previously
// CostComparison.tsx and BodyCostMap.tsx each maintained their own
// divergent numbers for the same treatments (e.g. two different India
// prices for "Heart Bypass Surgery" shown on the same homepage scroll).
// Where the two disagreed, the more specific/recent figure wins; treatments
// only priced against the USA (no UK/Germany/Australia data) are still
// included, just omitted from the 5-country comparison table.
export const treatmentPricing: TreatmentPricing[] = [
  { treatment: "Heart Bypass Surgery", slug: "heart-bypass-surgery", indiaUSD: 5200, usaUSD: 144000, ukUSD: 42000, germanyUSD: 28000, australiaUSD: 55000 },
  { treatment: "Knee Replacement", slug: "knee-replacement", indiaUSD: 6200, usaUSD: 50000, ukUSD: 30000, germanyUSD: 22000, australiaUSD: 35000 },
  { treatment: "Liver Transplant", slug: "liver-transplant", indiaUSD: 25000, usaUSD: 300000, ukUSD: 180000, germanyUSD: 150000, australiaUSD: 200000 },
  { treatment: "IVF Treatment", slug: "ivf-treatment", indiaUSD: 3000, usaUSD: 15000, ukUSD: 8000, germanyUSD: 6000, australiaUSD: 10000 },
  { treatment: "Dental Implant", slug: "dental-implant", indiaUSD: 1000, usaUSD: 2800, ukUSD: 3000, germanyUSD: 2500, australiaUSD: 4000 },
  { treatment: "Spine Surgery", slug: "spine-surgery", indiaUSD: 6000, usaUSD: 80000, ukUSD: 45000, germanyUSD: 35000, australiaUSD: 50000 },
  { treatment: "Cosmetic Surgery", slug: "cosmetic-surgery", indiaUSD: 3000, usaUSD: 20000, ukUSD: 12000, germanyUSD: 10000, australiaUSD: 15000 },
  { treatment: "Hip Replacement", slug: "hip-replacement", indiaUSD: 7000, usaUSD: 50000, ukUSD: 25000, germanyUSD: 20000, australiaUSD: 38000 },
  { treatment: "Heart Valve Replacement", slug: "heart-valve-replacement", indiaUSD: 5500, usaUSD: 170000 },
  { treatment: "Angioplasty", slug: "angioplasty", indiaUSD: 3300, usaUSD: 57000 },
];

export function getTreatmentPricing(slug: string): TreatmentPricing | undefined {
  return treatmentPricing.find((t) => t.slug === slug);
}
