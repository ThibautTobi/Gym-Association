import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ActivityImage from "@/components/activities/ActivityImage";
import PageIntro from "@/components/sections/PageIntro";
import { activities, getActivityBySlug } from "@/lib/data/activities";

/**
 * Emplacement : app/activites/[slug]/page.tsx
 */

interface ActivityPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Génère les pages statiques correspondant aux activités connues.
 *
 * Exemple :
 * /activites/baby-gym
 * /activites/pilate
 */
export function generateStaticParams() {
  return activities.map((activity) => ({
    slug: activity.slug,
  }));
}

/**
 * Génère automatiquement les métadonnées SEO
 * de chaque activité.
 */
export async function generateMetadata({
  params,
}: ActivityPageProps): Promise<Metadata> {
  const { slug } = await params;

  const activity = getActivityBySlug(slug);

  if (!activity) {
    return {
      title: "Activité introuvable",
      description: "Cette activité n'existe pas ou n'est plus disponible.",
    };
  }

  return {
    title: activity.title,
    description: activity.description,

    alternates: {
      canonical: `/activites/${activity.slug}`,
    },

    openGraph: {
      title: activity.title,
      description: activity.description,
      type: "article",
      /**
       * NOUVEAU : l'image sert aussi d'aperçu lors d'un partage
       * du lien (réseaux sociaux, messageries).
       * Le chemin relatif est complété par `metadataBase`, à définir
       * dans app/layout.tsx.
       */
      images: [
        {
          url: activity.image.src,
          alt: activity.image.alt,
        },
      ],
    },
  };
}

/**
 * Page détaillée d'une activité.
 */
export default async function ActivityPage({ params }: ActivityPageProps) {
  const { slug } = await params;

  const activity = getActivityBySlug(slug);

  /**
   * Si le slug demandé n'existe pas,
   * Next.js affiche automatiquement la page 404.
   */
  if (!activity) {
    notFound();
  }

  return (
    <>
      <PageIntro
        eyebrow="Activité"
        title={activity.title}
        description={activity.shortDescription}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
            {/*
              NOUVEAU : image de l'activité.
              sizes : la colonne fait environ 640 px sur grand écran,
              toute la largeur sur mobile.
            */}
            <ActivityImage
              src={activity.image.src}
              alt={activity.image.alt}
              sizes="(min-width: 1024px) 640px, 100vw"
              aspect="wide"
              className="rounded-xl border"
            />

            <h2 className="mt-10 text-2xl font-bold">Présentation</h2>

            <p className="mt-5 leading-8 text-muted-foreground">
              {activity.description}
            </p>
          </div>

          <aside className="rounded-xl border bg-card p-6 shadow-sm lg:self-start">
            <h2 className="text-lg font-semibold">Informations</h2>

            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="font-semibold">Tranche d&apos;âge</dt>
                <dd className="mt-1 text-muted-foreground">
                  {activity.ageRange}
                </dd>
              </div>

              <div>
                <dt className="font-semibold">Niveau</dt>
                <dd className="mt-1 text-muted-foreground">{activity.level}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="benefits-title"
        className="bg-muted py-16 sm:py-20"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 id="benefits-title" className="text-2xl font-bold">
            Les bénéfices de cette activité
          </h2>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {activity.benefits.map((benefit) => (
              <li key={benefit} className="rounded-lg border bg-card p-5">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
