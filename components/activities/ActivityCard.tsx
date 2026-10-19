import Link from "next/link";

import ActivityImage from "@/components/activities/ActivityImage";
import type { Activity } from "@/lib/data/activities";

interface ActivityCardProps {
  activity: Activity;
}

/**
 * Carte permettant de présenter une activité.
 *
 * Emplacement : components/activities/ActivityCard.tsx
 */
export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    /**
     * `group` + `overflow-hidden` : l'image suit les coins arrondis et
     * peut réagir au survol de la carte. Le padding est déplacé dans le
     * bloc de texte pour que l'image occupe toute la largeur.
     */
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md">
      <ActivityImage src={activity.image.src} alt={activity.image.alt} />

      <div className="flex flex-1 flex-col p-6">
        <div>
          {/*
            h3 : la page "Activités" contient déjà un h2 (masqué) qui
            introduit la liste. Les titres des cartes sont donc un niveau
            en dessous, ce qui garde une hiérarchie correcte.
          */}
          <h3 className="text-xl font-semibold">{activity.title}</h3>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {activity.shortDescription}
          </p>
        </div>

        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex gap-2">
            <dt className="font-semibold">Âge :</dt>
            <dd className="text-muted-foreground">{activity.ageRange}</dd>
          </div>

          <div className="flex gap-2">
            <dt className="font-semibold">Niveau :</dt>
            <dd className="text-muted-foreground">{activity.level}</dd>
          </div>
        </dl>

        <div className="mt-auto pt-6">
          <Link
            href={`/activites/${activity.slug}`}
            className="inline-flex min-h-11 items-center font-medium text-primary hover:text-accent hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Découvrir l&apos;activité
            <span className="sr-only"> {activity.title}</span>
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
