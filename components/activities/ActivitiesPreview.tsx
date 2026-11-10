import Link from "next/link";

import ActivityImage from "@/components/activities/ActivityImage";
import { activities } from "@/lib/data/activities";

/**
 * Aperçu des activités sur la page d'accueil.
 *
 * Les données proviennent de lib/data/activities.ts.
 * Cela garantit une source unique pour :
 * - La page d'accueil.
 * - La liste complète des activités.
 * - Les pages détaillées.
 *
 * Les services externes sont identifiés par un badge.
 *
 * Emplacement : components/activities/ActivitiesPreview.tsx
 */
export default function ActivitiesPreview() {
  return (
    <section aria-labelledby="activities-title" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Introduction de la section */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Nos activités
          </p>

          <h2
            id="activities-title"
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Des activités sportives pour tous
          </h2>

          <p className="mt-4 text-muted-foreground">
            Découvrez les activités proposées par Gymnastique Val de Saâne ainsi
            qu&lsquo;un service externe de coaching sportif présenté en
            complément.
          </p>
        </div>

        {/* Grille des activités */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity) => (
            <article
              key={activity.slug}
              className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md motion-reduce:transition-none"
            >
              {/* Image de l'activité */}
              <ActivityImage
                src={activity.image.src}
                alt={activity.image.alt}
              />

              {/* Contenu de la carte */}
              <div className="flex flex-1 flex-col p-6">
                {/* Badge affiché uniquement pour les services externes */}
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

                {/* Lien vers la page détaillée */}
                <Link
                  href={`/activites/${activity.slug}`}
                  className="mt-auto inline-flex min-h-11 items-center pt-6 font-medium text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
                >
                  Découvrir
                  {/* Distingue les liens pour les lecteurs d'écran */}
                  <span className="sr-only"> : {activity.title}</span>
                  <span
                    aria-hidden="true"
                    className="ml-2 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                  >
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Accès à la liste complète */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/activites"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            Voir toutes nos activités
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
