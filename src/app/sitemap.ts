import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/data";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base = site.baseUrl.replace(/\/$/, "");

  const staticUrls = [
    "",
    "/rendez-vous",
    "/soumission",
    "/contact",
    "/confidentialite",
  ];

  return [
    ...staticUrls.map((p) => ({
      url: `${base}${p || "/"}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
    })),
    ...caseStudies.map((cs) => ({
      url: `${base}/realisations/${cs.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
