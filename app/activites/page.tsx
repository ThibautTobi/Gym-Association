import type { Metadata } from "next";

import ActivityCard from "@/components/activities/ActivityCard";
import PageIntro from "@/components/sections/PageIntro";
import { activities } from "@/lib/data/activities";

export const metadata: Metadata = {
  title: "Activités",
  description:
    "Découvrez les activités de gymnastique proposées par Gym'Association pour les enfants, adolescents et adultes.",
};

/**
 * Page présentant l'ensemble des activités de l'association.
 */
export default function ActivitiesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Nos activités"
        title="La gymnastique pour tous"
        description="Découvrez nos différentes activités et trouvez la pratique adaptée à votre âge, votre niveau et vos envies."
        schedule="Consultez les horaires et les lieux de nos activités pour planifier votre participation."
      />

      <section
        aria-labelledby="activities-list-title"
        className="py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="activities-list-title" className="sr-only">
            Liste des activités
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {activities.map((activity) => (
              <ActivityCard key={activity.slug} activity={activity} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
