import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageIntro from "@/components/sections/PageIntro";
import { events, getEventBySlug } from "@/lib/data/events";

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;

  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: "Événement introuvable",
    };
  }

  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;

  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <>
      <PageIntro
        eyebrow="Événement"
        title={event.title}
        description={event.description}
      />

      <article className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <dl className="grid gap-6 rounded-xl border bg-card p-6 sm:grid-cols-2">
            <div>
              <dt className="font-semibold">Date</dt>

              <dd className="mt-2 text-muted-foreground">
                <time dateTime={event.date}>
                  {new Intl.DateTimeFormat("fr-FR", {
                    dateStyle: "long",
                  }).format(new Date(event.date))}
                </time>
              </dd>
            </div>

            <div>
              <dt className="font-semibold">Lieu</dt>

              <dd className="mt-2 text-muted-foreground">{event.location}</dd>
            </div>
          </dl>

          <p className="mt-8 leading-8 text-muted-foreground">
            {event.description}
          </p>
        </div>
      </article>
    </>
  );
}
