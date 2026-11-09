import type { Metadata } from "next";
import Link from "next/link";

import EventCard from "@/components/events/EventCard";
import PageIntro from "@/components/sections/PageIntro";
import { events } from "@/lib/data/events";
import { SITE_NAME, SITE_URL, SITE_OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Événements de l'association",
  description:
    "Retrouvez les événements sportifs et associatifs organisés par Gymnastique Val de Saâne.",
  alternates: {
    canonical: "/evenements",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/evenements`,
    siteName: SITE_NAME,
    title: "Événements de l'association",
    description:
      "Découvrez les événements sportifs et associatifs de Gymnastique Val de Saâne.",
    images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Événements de l'association",
    description:
      "Découvrez les événements sportifs et associatifs de Gymnastique Val de Saâne.",
    images: [SITE_OG_IMAGE],
  },
};

export default function EventsPage() {
  const hasEvents = events.length > 0;

  return (
    <>
      <PageIntro
        eyebrow="Vie associative"
        title="Nos événements"
        description="Retrouvez les événements sportifs et associatifs organisés par Gymnastique Val de Saâne."
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
                Les prochains événements de l&lsquo;association seront publiés
                sur cette page. N&lsquo;hésitez pas à nous contacter pour
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
