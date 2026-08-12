import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The dashboard and the lead listing are behind Basic Auth, but there is
      // no reason to advertise them to crawlers.
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
