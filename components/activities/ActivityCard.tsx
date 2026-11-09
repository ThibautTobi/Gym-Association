import Link from "next/link";

import ActivityImage from "@/components/activities/ActivityImage";
import type { Activity } from "@/lib/data/activities";

interface ActivityCardProps {
  activity: Activity;
}

/**
 * Carte de présentation d'une activité.
 *
 * Utilisée sur la page complète des activités.
 *
 * Les activités externes sont identifiées par un badge.
 *
 * Emplacement : components/activities/ActivityCard.tsx
 */
export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md motion-reduce:transition-none">
      {/* Image de l'activité */}
      <ActivityImage src={activity.image.src} alt={activity.image.alt} />

      {/* Informations principales */}
      <div className="flex flex-1 flex-col p-6">
        <div>
          {/* Identification des services externes */}
          {activity.isExternal && (
            <span className="mb-3 inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              Service externe
            </span>
          )}

          {/* Titre de l'activité */}
          <h3 className="text-xl font-semibold">{activity.title}</h3>

          {/* Description courte */}
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {activity.shortDescription}
          </p>
        </div>

        {/* Informations complémentaires */}
        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <dt className="shrink-0 font-semibold">Âge :</dt>

            <dd className="text-muted-foreground">{activity.ageRange}</dd>
          </div>

          <div className="flex items-start gap-2">
            <dt className="shrink-0 font-semibold">Niveau :</dt>

            <dd className="text-muted-foreground">{activity.level}</dd>
          </div>
        </dl>

        {/* Lien vers la page détaillée */}
        <div className="mt-auto pt-6">
          <Link
            href={`/activites/${activity.slug}`}
            className="inline-flex min-h-11 items-center font-medium text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
          >
            Découvrir l&lsquo;activité
            <span className="sr-only"> : {activity.title}</span>
            <span
              aria-hidden="true"
              className="ml-2 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
