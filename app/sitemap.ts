import type { MetadataRoute } from "next";

import { activities } from "@/lib/data/activities";
import { events } from "@/lib/data/events";
import { newsArticles } from "@/lib/data/news";
import { SITE_URL } from "@/lib/site";

/**
 * Sitemap XML du site Gymnastique Val de Saâne.
 *
 * Next.js génère automatiquement le fichier :
 * https://votre-domaine.fr/sitemap.xml
 *
 * Seules les pages publiques ayant vocation à être indexées
 * doivent être ajoutées ici.
 *
 * Les URL des pages dynamiques sont générées depuis les données
 * centralisées dans lib/data/.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // ----------------------------------------------------------
  // 1. PAGES STATIQUES
  // ----------------------------------------------------------

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/activites`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/horaires`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/essai`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/association`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/association/equipe`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/association/valeurs`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/actualites`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/evenements`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/galerie`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/confidentialite`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/mentions-legales`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // ----------------------------------------------------------
  // 2. PAGES DÉTAILLÉES DES ACTIVITÉS
  // ----------------------------------------------------------

  const activityRoutes: MetadataRoute.Sitemap = activities.map((activity) => ({
    url: `${SITE_URL}/activites/${activity.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // ----------------------------------------------------------
  // 3. PAGES DÉTAILLÉES DES ACTUALITÉS
  // ----------------------------------------------------------

  const newsRoutes: MetadataRoute.Sitemap = newsArticles.map((article) => ({
    url: `${SITE_URL}/actualites/${article.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // ----------------------------------------------------------
  // 4. PAGES DÉTAILLÉES DES ÉVÉNEMENTS
  // ----------------------------------------------------------

  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${SITE_URL}/evenements/${event.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // ----------------------------------------------------------
  // 5. ASSEMBLAGE DU SITEMAP
  // ----------------------------------------------------------

  return [...staticRoutes, ...activityRoutes, ...newsRoutes, ...eventRoutes];
}
