import type { Metadata } from "next";

import PageIntro from "@/components/sections/PageIntro";
import RegistrationForm from "@/components/registration/RegistrationForm";

import {
  CURRENT_SEASON,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_OG_IMAGE_ALT,
  SITE_OG_IMAGE_DIMENSIONS,
  SITE_URL,
} from "@/lib/site";

/**
 * Emplacement : app/essai/page.tsx
 *
 * Page de demande de séance d'essai.
 */

// ============================================================
// CONFIGURATION SEO
// ============================================================

// URL canonique complète de la page.
const PAGE_URL = `${SITE_URL}/essai`;

// Titre utilisé pour les métadonnées et les données structurées.
const PAGE_TITLE = `Séance d'essai | ${SITE_NAME}`;

// Description SEO de la page.
const PAGE_DESCRIPTION = `Demandez une séance d'essai auprès de ${SITE_NAME} et découvrez les activités proposées pour la saison ${CURRENT_SEASON.label}. Une première étape pour trouver l'activité qui vous correspond.`;

// ============================================================
// DONNÉES STRUCTURÉES JSON-LD
// ============================================================

/**
 * Décrit la page de demande de séance d'essai
 * et son fil d'Ariane.
 *
 * Les entités SportsOrganization et WebSite sont déjà déclarées
 * globalement dans app/layout.tsx.
 *
 * Nous ne les dupliquons donc pas ici.
 */
const registrationJsonLd = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: "fr-FR",

      // Relation avec le site déclaré dans app/layout.tsx.
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },

      // Relation avec l'association déclarée globalement.
      about: {
        "@id": `${SITE_URL}/#organization`,
      },

      // Référence au fil d'Ariane ci-dessous.
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
          name: "Séance d'essai",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

// ============================================================
// MÉTADONNÉES NEXT.JS
// ============================================================

export const metadata: Metadata = {
  title: "Séance d'essai",
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/essai",
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

/**
 * Page de demande de séance d'essai.
 */
export default function RegistrationPage() {
  return (
    <>
      {/* Données structurées JSON-LD de la page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(registrationJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <PageIntro
        eyebrow="Séance d'essai"
        title="Découvrir Gym Val de Saâne"
        description="Remplissez le formulaire ci-dessous pour demander une séance d'essai et découvrir l'activité qui vous correspond."
      />

      <section
        aria-labelledby="registration-form-title"
        className="py-16 sm:py-20"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2
              id="registration-form-title"
              className="text-2xl font-bold sm:text-3xl"
            >
              Demander une séance d’essai
            </h2>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Cette demande nous permet de mieux connaître vos besoins et de
              vous orienter vers l’activité et le créneau les plus adaptés.
            </p>
          </div>

          {/* Formulaire de demande de séance d'essai */}
          <RegistrationForm />
        </div>
      </section>
    </>
  );
}
