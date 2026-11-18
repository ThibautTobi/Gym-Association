import type { Metadata } from "next";

import PageIntro from "@/components/sections/PageIntro";

import { teamMembers } from "@/lib/data/team";
import {
  SITE_NAME,
  SITE_URL,
  SITE_OG_IMAGE,
  SITE_OG_IMAGE_ALT,
  SITE_OG_IMAGE_DIMENSIONS,
} from "@/lib/site";

/**
 * Emplacement : app/association/equipe/page.tsx
 *
 * Présentation des membres de l'équipe associative.
 */

// URL absolue de la page.
const PAGE_URL = `${SITE_URL}/association/equipe`;

// Métadonnées SEO et réseaux sociaux.
const PAGE_TITLE = `Notre équipe | ${SITE_NAME}`;

const PAGE_DESCRIPTION = `Découvrez les personnes qui participent à la vie et à l'encadrement de ${SITE_NAME}.`;

/**
 * Données structurées JSON-LD propres à la page Équipe.
 *
 * Le graphe global SportsOrganization et WebSite est déjà déclaré
 * dans app/layout.tsx. Nous ne le dupliquons donc pas ici.
 */
const teamJsonLd = {
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
          name: "Notre équipe",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: "Notre équipe",
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/association/equipe",
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
 * Page de présentation de l'équipe.
 */
export default function TeamPage() {
  return (
    <>
      {/* Données structurées JSON-LD de la page Équipe */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(teamJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <PageIntro
        eyebrow="L'association"
        title="Notre équipe"
        description="Découvrez les personnes qui participent à la vie et à l'encadrement de l'association."
      />

      <section aria-labelledby="team-title" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="team-title" className="sr-only">
            Membres de l&rsquo;équipe
          </h2>

          {teamMembers.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <article
                  key={member.id}
                  className="rounded-xl border bg-card p-6 shadow-sm"
                >
                  {/* Emplacement réservé à une future photographie */}
                  <div
                    aria-hidden="true"
                    className="aspect-square rounded-xl bg-muted"
                  />

                  <h3 className="mt-6 text-xl font-semibold">{member.name}</h3>

                  <p className="mt-1 text-sm font-medium text-primary">
                    {member.role}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {member.description}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              La présentation des membres de notre équipe sera bientôt
              disponible.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
