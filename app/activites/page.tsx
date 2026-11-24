import type { Metadata } from "next";

import ActivityCard from "@/components/activities/ActivityCard";
import PageIntro from "@/components/sections/PageIntro";

import { activities } from "@/lib/data/activities";
import {
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_OG_IMAGE_ALT,
  SITE_OG_IMAGE_DIMENSIONS,
  SITE_URL,
} from "@/lib/site";

/**
 * Emplacement : app/activites/page.tsx
 *
 * Page présentant l'ensemble des activités de l'association.
 * Les cartes sont générées depuis lib/data/activities.ts.
 */

const PAGE_TITLE = `Nos activités | ${SITE_NAME}`;

const PAGE_DESCRIPTION =
  "Découvrez les activités de Gymnastique Val de Saâne : Baby Gym, gymnastique artistique, gymnastique aérobic, marche active, Pilates et cardio-training. Retrouvez également notre présentation du coaching sportif.";

/**
 * Métadonnées SEO de la page des activités.
 */
export const metadata: Metadata = {
  title: "Nos activités",
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/activites",
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${SITE_URL}/activites`,
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

/**
 * Données structurées Schema.org.
 *
 * WebPage : décrit la page des activités.
 * BreadcrumbList : décrit son chemin de navigation.
 */
function ActivitiesStructuredData() {
  const pageUrl = `${SITE_URL}/activites`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,

        // Langue principale de la page.
        inLanguage: "fr-FR",

        // Site internet auquel appartient cette page.
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },

        // Association présentée par cette page.
        about: {
          "@id": `${SITE_URL}/#organization`,
        },

        // Fil d'Ariane associé à cette page.
        breadcrumb: {
          "@id": `${pageUrl}#breadcrumb`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
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
            name: "Activités",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  // Sécurise l'insertion du JSON-LD dans le HTML.
  const jsonLdString = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
}

/**
 * Page principale des activités.
 */
export default function ActivitiesPage() {
  return (
    <>
      <ActivitiesStructuredData />

      <PageIntro
        eyebrow="Nos activités"
        title="La gymnastique pour tous"
        description="Découvrez nos différentes activités et trouvez la pratique adaptée à votre âge, votre niveau et vos envies."
        schedule="Consultez les horaires et les lieux de nos activités pour planifier votre participation."
      />

      <section
        aria-labelledby="activities-list-title"
        className="py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="activities-list-title" className="sr-only">
            Liste des activités proposées
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {activities.map((activity, index) => (
              <ActivityCard
                key={activity.slug}
                activity={activity}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
