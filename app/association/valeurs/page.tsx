import type { Metadata } from "next";

import PageIntro from "@/components/sections/PageIntro";

import {
  SITE_NAME,
  SITE_URL,
  SITE_OG_IMAGE,
  SITE_OG_IMAGE_ALT,
  SITE_OG_IMAGE_DIMENSIONS,
} from "@/lib/site";

/**
 * Emplacement : app/association/valeurs/page.tsx
 *
 * Présentation des valeurs de l'association.
 */

// URL absolue de la page.
const PAGE_URL = `${SITE_URL}/association/valeurs`;

// Métadonnées SEO et réseaux sociaux.
const PAGE_TITLE = `Nos valeurs | ${SITE_NAME}`;

const PAGE_DESCRIPTION = `Découvrez les valeurs qui guident ${SITE_NAME} dans sa pratique sportive, son encadrement et sa vie associative.`;

/**
 * Données structurées JSON-LD propres à la page Valeurs.
 *
 * Le graphe global SportsOrganization et WebSite est déjà déclaré
 * dans app/layout.tsx. Nous ne le dupliquons donc pas ici.
 */
const valuesJsonLd = {
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
          name: "L'association",
          item: `${SITE_URL}/association`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Nos valeurs",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: "Nos valeurs",
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/association/valeurs",
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

// Valeurs fondamentales de l'association.
const values = [
  {
    title: "Respect",
    description:
      "Nous favorisons un environnement dans lequel chaque pratiquant, encadrant et bénévole est respecté.",
  },
  {
    title: "Progression",
    description:
      "Chaque personne doit pouvoir progresser à son rythme, quels que soient son âge et son niveau.",
  },
  {
    title: "Convivialité",
    description:
      "La pratique sportive est également un moment de partage, de rencontre et de plaisir.",
  },
  {
    title: "Engagement",
    description:
      "La vie associative repose sur l'implication des pratiquants, des familles, des bénévoles et des encadrants.",
  },
];

/**
 * Page des valeurs de l'association.
 */
export default function ValuesPage() {
  return (
    <>
      {/* Données structurées JSON-LD de la page Valeurs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(valuesJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <PageIntro
        eyebrow="L'association"
        title="Nos valeurs"
        description="Les principes qui accompagnent notre projet sportif et notre vie associative."
      />

      <section aria-labelledby="values-title" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="values-title" className="sr-only">
            Les valeurs de l&rsquo;association
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold">{value.title}</h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
