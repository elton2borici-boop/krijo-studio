import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Bump these when a page's content actually changes. A `new Date()` here would
 * change on every build, and crawlers learn to ignore a lastmod that always
 * says "today".
 */
const HOME_UPDATED = "2026-10-06";
const PRIVACY_UPDATED = "2026-10-06";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: HOME_UPDATED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/privatesia`,
      lastModified: PRIVACY_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
