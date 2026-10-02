import type { Metadata } from "next";
import CostEstimatorClient from "./CostEstimatorClient";

export const metadata: Metadata = {
  title: "Cost Estimator | GativCare",
  description: "Estimate the cost of your medical treatment in India — pick a treatment, add a travel package and companions, and get an instant price range.",
};

export default function CostEstimatorPage() {
  return <CostEstimatorClient />;
}
