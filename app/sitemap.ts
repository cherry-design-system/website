import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/** Bump when the landing page content changes meaningfully. */
const LAST_MODIFIED = "2026-11-25";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
