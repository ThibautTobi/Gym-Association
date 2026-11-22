import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageIntro from "@/components/sections/PageIntro";

import { events, getEventBySlug } from "@/lib/data/events";
import {
  SITE_NAME,
  SITE_URL,
  SITE_OG_IMAGE,
  SITE_OG_IMAGE_DIMENSIONS,
} from "@/lib/site";

/**
 * Emplacement : app/evenements/[slug]/page.tsx
 *
 * Page dynamique de présentation d'un événement.
 *
 * Les informations proviennent de :
 * lib/data/events.ts
 */

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Génère uniquement les pages des événements existants.
 */
export function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

/**
 * Génère des métadonnées SEO propres à chaque événement.
 */
export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  // Un événement inexistant ne doit pas être indexé.
  if (!event) {
    return {
      title: "Événement introuvable",
      description: "Cet événement n'existe pas ou n'est plus disponible.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageUrl = `${SITE_URL}/evenements/${event.slug}`;

  return {
    title: event.title,
    description: event.description,

    // URL canonique propre à l'événement.
    alternates: {
      canonical: `/evenements/${event.slug}`,
    },

    // Aperçu lors du partage sur les réseaux sociaux.
    openGraph: {
      type: "article",
      locale: "fr_FR",
      url: pageUrl,
      siteName: SITE_NAME,
      title: `${event.title} | ${SITE_NAME}`,
      description: event.description,
      images: [
        {
          url: SITE_OG_IMAGE,
          alt: `Événement organisé par ${SITE_NAME}`,
          width: SITE_OG_IMAGE_DIMENSIONS.width,
          height: SITE_OG_IMAGE_DIMENSIONS.height,
        },
      ],
    },

    // Aperçu lors du partage sur X.
    twitter: {
      card: "summary_large_image",
      title: `${event.title} | ${SITE_NAME}`,
      description: event.description,
      images: [SITE_OG_IMAGE],
    },
  };
}

/**
 * Affiche le détail d'un événement.
 */
export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  // Affiche la page 404 si l'événement n'existe pas.
  if (!event) {
    notFound();
  }

  // Utilise midi pour éviter les décalages de date liés au fuseau horaire.
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
  }).format(new Date(`${event.date}T12:00:00`));

  return (
    <>
      <PageIntro
        eyebrow="Vie associative"
        title={event.title}
        description={event.description}
      />

      <article className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Informations pratiques</h2>

          <dl className="mt-8 space-y-6 rounded-xl border bg-card p-6">
            <div>
              <dt className="text-sm font-semibold text-muted-foreground">
                Date
              </dt>

              <dd className="mt-1">
                <time dateTime={event.date}>{formattedDate}</time>
              </dd>
            </div>

            <div>
              <dt className="text-sm font-semibold text-muted-foreground">
                Lieu
              </dt>

              <dd className="mt-1">{event.location}</dd>
            </div>
          </dl>
        </div>
      </article>
    </>
  );
}
