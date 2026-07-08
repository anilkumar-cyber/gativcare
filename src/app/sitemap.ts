import type { MetadataRoute } from "next";

const BASE_URL = "https://gativcare.com";

const routes = [
  "",
  "/about",
  "/contact",
  "/doctors",
  "/hospitals",
  "/packages",
  "/treatments",
  "/faq",
  "/privacy",
  "/terms",
  "/refund",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
