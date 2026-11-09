import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import ActivitiesPreview from "@/components/activities/ActivitiesPreview";
import AboutPreview from "@/components/home/AboutPreview";
import RegistrationCTA from "@/components/home/RegistrationCTA";

import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_OG_IMAGE,
  SITE_OG_IMAGE_ALT,
  SITE_OG_IMAGE_DIMENSIONS,
} from "@/lib/site";

/**
 * Emplacement : app/page.tsx
 *
 * Page d'accueil de Gymnastique Val de Saâne.
 */

/**
 * Métadonnées SEO de la page d'accueil.
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
 * Affichage de la page d'accueil.
 */
export default function HomePage() {
  return (
    <>
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
