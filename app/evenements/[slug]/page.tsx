import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageIntro from "@/components/sections/PageIntro";
import { events, getEventBySlug } from "@/lib/data/events";
import { SITE_NAME, SITE_URL, SITE_OG_IMAGE } from "@/lib/site";

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Génère uniquement les pages des événements réellement présents
 * dans lib/data/events.ts.
 */
export function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

/**
 * Métadonnées SEO propres à chaque événement.
 */
export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: "Événement introuvable",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const canonical = `/evenements/${event.slug}`;

  return {
    title: event.title,
    description: event.description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}${canonical}`,
      siteName: SITE_NAME,
      title: event.title,
      description: event.description,
      images: [
        {
          url: SITE_OG_IMAGE,
          alt: `Événement organisé par ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.description,
      images: [SITE_OG_IMAGE],
    },
  };
}

/**
 * Page détaillée d'un événement.
 */
export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

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
