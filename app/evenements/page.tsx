import type { Metadata } from "next";

import EventCard from "@/components/events/EventCard";
import PageIntro from "@/components/sections/PageIntro";
import { events } from "@/lib/data/events";

export const metadata: Metadata = {
  title: "Événements",
  description: "Découvrez les événements organisés par Gym'Association.",
};

export default function EventsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Vie associative"
        title="Événements"
        description="Retrouvez les événements sportifs et associatifs organisés tout au long de la saison."
      />

      <section aria-labelledby="events-title" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="events-title" className="sr-only">
            Liste des événements
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
