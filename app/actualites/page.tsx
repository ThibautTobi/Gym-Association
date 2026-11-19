import type { Metadata } from "next";

import NewsCard from "@/components/news/NewsCard";
import PageIntro from "@/components/sections/PageIntro";

import { newsArticles } from "@/lib/data/news";

import {
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_OG_IMAGE_ALT,
  SITE_OG_IMAGE_DIMENSIONS,
  SITE_URL,
} from "@/lib/site";

/**
 * Emplacement : app/actualites/page.tsx
 *
 * Page présentant les actualités de l'association.
 */

// ============================================================
// CONFIGURATION SEO
// ============================================================

/**
 * URL canonique de la page.
 *
 * Elle est utilisée dans les données structurées JSON-LD
 * et dans les métadonnées Open Graph.
 */
const PAGE_URL = `${SITE_URL}/actualites`;

const PAGE_TITLE = `Actualités | ${SITE_NAME}`;

const PAGE_DESCRIPTION =
  "Suivez la vie de Gymnastique Val de Saâne et retrouvez les informations sur l'association, ses activités sportives et ses événements.";

// ============================================================
// DONNÉES STRUCTURÉES JSON-LD
// ============================================================

/**
 * Décrit la page Actualités et son fil d'Ariane.
 *
 * Les références permettent de relier cette page :
 * - au WebSite global déclaré dans app/layout.tsx ;
 * - à l'organisation globale de l'association ;
 * - à son fil d'Ariane.
 *
 * Ces identifiants doivent correspondre à ceux du JSON-LD global.
 */
const newsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: "fr-FR",

      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },

      about: {
        "@id": `${SITE_URL}/#organization`,
      },

      breadcrumb: {
        "@id": `${PAGE_URL}#breadcrumb`,
      },
    },

    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Actualités",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

/**
 * Métadonnées SEO de la page actualités.
 */
export const metadata: Metadata = {
  title: "Actualités",
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/actualites",
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: PAGE_URL,
    siteName: SITE_NAME,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: SITE_OG_IMAGE_DIMENSIONS.width,
        height: SITE_OG_IMAGE_DIMENSIONS.height,
        alt: SITE_OG_IMAGE_ALT,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: SITE_OG_IMAGE,
        alt: SITE_OG_IMAGE_ALT,
      },
    ],
  },
};

export default function NewsPage() {
  return (
    <>
      {/* Données structurées JSON-LD de la page Actualités */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(newsJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <PageIntro
        eyebrow="Actualités"
        title="La vie de l'association"
        description="Retrouvez les dernières informations concernant Gymnastique Val de Saâne."
      />

      <section aria-labelledby="news-list-title" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="news-list-title" className="sr-only">
            Liste des actualités
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsArticles.length > 0 ? (
              newsArticles.map((article) => (
                <NewsCard key={article.slug} article={article} />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground">
                Aucune actualité n&rsquo;est disponible pour le moment.
                Retrouvez prochainement les nouvelles de l&rsquo;association.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
