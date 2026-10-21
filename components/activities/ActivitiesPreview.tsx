import Link from "next/link";

import ActivityImage from "@/components/activities/ActivityImage";
import { activities } from "@/lib/data/activities";

/**
 * Aperçu des activités sur la page d'accueil.
 *
 * Emplacement : components/activities/ActivitiesPreview.tsx
 *
 * Les activités viennent de lib/data/activities.ts : une seule source
 * de données pour l'accueil, la liste et les pages de détail.
 * Pour afficher seulement les 4 premières : activities.slice(0, 4).
 */
export default function ActivitiesPreview() {
  return (
    <section aria-labelledby="activities-title" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Nos activités
          </p>

          <h2
            id="activities-title"
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Les cours collectifs et la gymnastique pour tous
          </h2>

          <p className="mt-4 text-muted-foreground">
            Découvrez nos différentes pratiques et trouvez l&apos;activité
            adaptée à vos envies et à votre niveau.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity) => (
            /**
             * `group` : l'image peut réagir au survol de toute la carte.
             * `overflow-hidden` : l'image suit les coins arrondis.
             * Le padding est dans le bloc de texte, pour que l'image
             * occupe toute la largeur de la carte.
             */
            <article
              key={activity.slug}
              className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              {/* `sizes` : valeur par défaut de ActivityImage (grille 1/2/4 colonnes). */}
              <ActivityImage
                src={activity.image.src}
                alt={activity.image.alt}
              />

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold">{activity.title}</h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {activity.shortDescription}
                </p>

                {/*
                  Plusieurs liens "Découvrir" identiques pointent vers
                  des pages différentes : le nom de l'activité, masqué
                  visuellement (sr-only), les distingue pour les lecteurs
                  d'écran.
                */}
                <Link
                  href={`/activites/${activity.slug}`}
                  className="mt-auto inline-flex min-h-11 items-center pt-6 font-medium text-primary hover:text-accent hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Découvrir
                  <span className="sr-only"> {activity.title}</span>
                  <span aria-hidden="true" className="ml-2">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
