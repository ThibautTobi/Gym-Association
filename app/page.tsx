import type { Metadata } from "next";

import AboutPreview from "@/components/home/AboutPreview";
import Hero from "@/components/home/Hero";
import RegistrationCTA from "@/components/home/RegistrationCTA";
import ActivitiesPreview from "@/components/activities/ActivitiesPreview";

import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_OG_IMAGE_ALT,
  SITE_OG_IMAGE_DIMENSIONS,
  SITE_URL,
} from "@/lib/site";

/**
 * Emplacement : app/page.tsx
 *
 * Page d'accueil de Gymnastique Val de Saâne.
 */

/**
 * Métadonnées SEO de la page d'accueil.
 *
 * Le titre absolu évite l'ajout automatique du modèle de titre
 * défini dans app/layout.tsx.
 */
export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} | Association sportive`,
  },

  description: SITE_DESCRIPTION,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Association sportive`,
    description: SITE_DESCRIPTION,
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
    title: `${SITE_NAME} | Association sportive`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_OG_IMAGE,
        alt: SITE_OG_IMAGE_ALT,
      },
    ],
  },
};

/**
 * Données structurées JSON-LD de la page d'accueil.
 *
 * WebPage :
 * Décrit la page d'accueil et la relie au site global.
 *
 * BreadcrumbList :
 * Décrit le fil d'Ariane.
 *
 * Les identifiants permettent de relier ces données
 * aux entités déclarées dans app/layout.tsx.
 */
const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: `${SITE_NAME} | Association sportive`,
      description: SITE_DESCRIPTION,
      inLanguage: "fr-FR",

      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },

      about: {
        "@id": `${SITE_URL}/#organization`,
      },

      breadcrumb: {
        "@id": `${SITE_URL}/#breadcrumb`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: `${SITE_URL}/`,
        },
      ],
    },
  ],
};

/**
 * Affichage de la page d'accueil.
 */
export default function HomePage() {
  return (
    <>
      {/* Données structurées JSON-LD de la page d'accueil */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Présentation principale */}
      <Hero />

      {/* Aperçu des activités proposées */}
      <ActivitiesPreview />

      {/* Présentation de l'association */}
      <AboutPreview />

      {/* Appel à l'inscription ou à la prise de contact */}
      <RegistrationCTA />
    </>
  );
}
