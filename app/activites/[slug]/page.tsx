import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gauge, Users } from "lucide-react";

import ActivityImage from "@/components/activities/ActivityImage";
import PageIntro from "@/components/sections/PageIntro";

import { activities, getActivityBySlug } from "@/lib/data/activities";
import { getBenefitIcon } from "@/lib/data/activity-icons";
import { getScheduleTextBySlug } from "@/lib/data/schedules";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * Emplacement : app/activites/[slug]/page.tsx
 *
 * Page dynamique de présentation d'une activité.
 * Les informations proviennent de lib/data/activities.ts.
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
 * /activites/pilates
 */
export function generateStaticParams() {
  return activities.map((activity) => ({
    slug: activity.slug,
  }));
}

/**
 * Génère les métadonnées SEO propres à chaque activité.
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
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageUrl = `${SITE_URL}/activites/${activity.slug}`;

  // Une description courte est préférable pour les résultats de recherche.
  const description = activity.shortDescription;

  return {
    title: activity.title,
    description,

    alternates: {
      canonical: `/activites/${activity.slug}`,
    },

    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: pageUrl,
      siteName: SITE_NAME,
      title: `${activity.title} | ${SITE_NAME}`,
      description,
      images: [
        {
          url: activity.image.src,
          alt: activity.image.alt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${activity.title} | ${SITE_NAME}`,
      description,
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

  // Affiche la page 404 si le slug ne correspond à aucune activité.
  if (!activity) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/activites/${activity.slug}`;

  /**
   * Données structurées Schema.org.
   *
   * WebPage décrit la page.
   * BreadcrumbList décrit son chemin de navigation.
   *
   * Ces données doivent rester cohérentes avec le contenu visible.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${activity.title} | ${SITE_NAME}`,
        description: activity.shortDescription,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
        },
        breadcrumb: {
          "@id": `${pageUrl}#breadcrumb`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Activités",
            item: `${SITE_URL}/activites`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: activity.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  // Évite qu'un éventuel caractère "<" soit interprété comme du HTML.
  const jsonLdString = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <>
      {/* Données structurées pour les moteurs de recherche */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      <PageIntro
        eyebrow="Activité"
        title={activity.title}
        description={activity.shortDescription}
        schedule={getScheduleTextBySlug(activity.slug)}
      />

      {/* Présentation de l'activité */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
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

            {/* Lien externe facultatif, notamment pour LT Coaching */}
            {activity.lien && activity.titreLien && (
              <Link
                href={activity.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-5 inline-flex overflow-hidden rounded-lg bg-linear-to-br from-[#F5DC9A] via-[#A87B2A] to-[#E0B04F] p-[1.5px] shadow-[0_4px_14px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_22px_rgba(217,164,65,0.45),0_6px_20px_rgba(0,0,0,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] focus-visible:ring-offset-2 focus-visible:ring-offset-black active:translate-y-0 active:scale-[0.98]"
              >
                <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-linear-to-b from-[#141210] to-black px-5 py-2.5 text-sm font-semibold tracking-wide">
                  {/* Reflet doré au survol */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-[#F5DC9A]/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[300%]"
                  />

                  {/* Texte doré */}
                  <span className="relative bg-linear-to-b from-[#F5DC9A] via-[#D9A441] to-[#A87B2A] bg-clip-text text-transparent">
                    {activity.titreLien}
                  </span>

                  {/* Icône de lien externe */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative h-4 w-4 text-[#D9A441] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:text-[#F5DC9A]"
                  >
                    <path d="M7 17L17 7M17 7H8M17 7V16" />
                  </svg>
                </span>
              </Link>
            )}
          </div>

          {/* Informations principales */}
          <aside className="rounded-xl border bg-card p-6 shadow-sm lg:self-start">
            <h2 className="text-lg font-semibold">Informations</h2>

            <dl className="mt-5 space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <Users className="h-4 w-4" strokeWidth={1.75} />
                </span>

                <div>
                  <dt className="font-semibold">Tranche d&rsquo;âge</dt>
                  <dd className="mt-1 text-muted-foreground">
                    {activity.ageRange}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <Gauge className="h-4 w-4" strokeWidth={1.75} />
                </span>

                <div>
                  <dt className="font-semibold">Niveau</dt>
                  <dd className="mt-1 text-muted-foreground">
                    {activity.level}
                  </dd>
                </div>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* Bénéfices de l'activité */}
      <section
        aria-labelledby="benefits-title"
        className="bg-muted py-16 sm:py-20"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 id="benefits-title" className="text-2xl font-bold">
            Les bénéfices de cette activité
          </h2>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {activity.benefits.map((benefit) => {
              const Icon = getBenefitIcon(benefit);

              return (
                <li
                  key={benefit}
                  className="group flex items-center gap-4 rounded-lg border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>

                  <span>{benefit}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
