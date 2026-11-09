import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * Configuration du fichier robots.txt.
 *
 * Autorise l'exploration des pages publiques
 * et indique aux moteurs de recherche le sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],

    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
