import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Indique aux moteurs de recherche les règles d'exploration.
 *
 * Attention : robots.txt ne garantit pas l'indexation.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
