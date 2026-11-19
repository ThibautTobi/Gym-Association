import type { Metadata } from "next";
import Link from "next/link";

import EventCard from "@/components/events/EventCard";
import PageIntro from "@/components/sections/PageIntro";

import { events } from "@/lib/data/events";

import {
  SITE_NAME,
  SITE_URL,
  SITE_OG_IMAGE,
  SITE_OG_IMAGE_ALT,
  SITE_OG_IMAGE_DIMENSIONS,
} from "@/lib/site";

/**
 * Emplacement : app/evenements/page.tsx
 *
 * Page de présentation des événements de l'association.
 */

// ============================================================
// CONFIGURATION SEO
// ============================================================

/**
 * URL canonique de la page.
 */
const PAGE_URL = `${SITE_URL}/evenements`;

const PAGE_TITLE = `Événements de l'association | ${SITE_NAME}`;

const PAGE_DESCRIPTION = `Retrouvez les événements sportifs et les temps forts de la vie associative de ${SITE_NAME}. Consultez les prochaines dates et les informations du club.`;
// ============================================================
// DONNÉES STRUCTURÉES JSON-LD
// ============================================================

/**
 * Décrit la page Événements et son fil d'Ariane.
 *
 * La page est reliée :
 * - au WebSite global ;
 * - à l'organisation de l'association ;
 * - à son propre fil d'Ariane.
 *
 * Les identifiants reprennent ceux déclarés dans app/layout.tsx.
 */
const eventsJsonLd = {
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
          name: "Événements",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

// ============================================================
// MÉTADONNÉES SEO
// ============================================================

export const metadata: Metadata = {
  title: "Événements de l'association",
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/evenements",
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
 * Page des événements.
 */
export default function EventsPage() {
  const hasEvents = events.length > 0;

  return (
    <>
      {/* Données structurées JSON-LD de la page Événements */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventsJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <PageIntro
        eyebrow="Vie associative"
        title="Nos événements"
        description={`Retrouvez les événements sportifs et associatifs organisés par ${SITE_NAME}.`}
      />

      <section aria-labelledby="events-title" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="events-title" className="sr-only">
            Liste des événements
          </h2>

          {hasEvents ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-xl border bg-card px-6 py-12 text-center">
              <h3 className="text-xl font-semibold">
                Aucun événement à annoncer pour le moment
              </h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                Les prochains événements de l&rsquo;association seront publiés
                sur cette page. N&rsquo;hésitez pas à nous contacter pour
                obtenir des renseignements sur nos activités.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Nous contacter
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
