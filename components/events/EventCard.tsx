import Link from "next/link";

import type { EventItem } from "@/lib/data/events";

interface EventCardProps {
  event: EventItem;
}

/**
 * Carte de présentation d'un événement.
 */
export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border bg-card p-6 shadow-sm">
      <time dateTime={event.date} className="text-sm font-medium text-primary">
        {new Intl.DateTimeFormat("fr-FR", {
          dateStyle: "long",
        }).format(new Date(event.date))}
      </time>

      <h2 className="mt-3 text-xl font-semibold">{event.title}</h2>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {event.description}
      </p>

      <p className="mt-4 text-sm">
        <span className="font-semibold">Lieu :</span>{" "}
        <span className="text-muted-foreground">{event.location}</span>
      </p>

      <Link
        href={`/evenements/${event.slug}`}
        className="mt-auto pt-6 font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Voir l événement →
      </Link>
    </article>
  );
}
