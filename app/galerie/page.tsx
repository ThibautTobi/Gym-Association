import type { Metadata } from "next";

import PageIntro from "@/components/sections/PageIntro";

import {
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_OG_IMAGE_ALT,
  SITE_OG_IMAGE_DIMENSIONS,
  SITE_URL,
} from "@/lib/site";

/**
 * Emplacement : app/galerie/page.tsx
 *
 * Galerie photos de Gymnastique Val de Saâne.
 *
 * La galerie est actuellement en préparation.
 */

// ============================================================
// CONFIGURATION SEO
// ============================================================

/**
 * URL canonique de la page.
 */
const PAGE_URL = `${SITE_URL}/galerie`;

const PAGE_TITLE = `Galerie photos | ${SITE_NAME}`;

const PAGE_DESCRIPTION = `Découvrez prochainement les photos et les moments forts de la vie de ${SITE_NAME}, de ses activités sportives et de ses événements associatifs.`;

// ============================================================
// DONNÉES STRUCTURÉES JSON-LD
// ============================================================

/**
 * Décrit la page Galerie et son fil d'Ariane.
 *
 * La galerie étant encore en préparation, nous ne déclarons
 * pas de données ImageGallery ou ImageObject.
 */
const galleryJsonLd = {
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
          name: "Galerie photos",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

// ============================================================
// MÉTADONNÉES SEO ET RÉSEAUX SOCIAUX
// ============================================================

export const metadata: Metadata = {
  title: "Galerie photos",
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/galerie",
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
 * Page de galerie photos.
 */
export default function GalleryPage() {
  return (
    <>
      {/* Données structurées JSON-LD de la page Galerie */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <PageIntro
        eyebrow="En images"
        title="Galerie photos"
        description="Découvrez prochainement les moments forts de la vie de l'association en images."
      />

      <section
        aria-labelledby="gallery-section-title"
        className="py-16 sm:py-20"
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-2xl border bg-muted p-10">
            <h2 id="gallery-section-title" className="text-2xl font-bold">
              Galerie en préparation
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les photos de l&rsquo;association seront ajoutées ici lorsque les
              ressources seront disponibles.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
