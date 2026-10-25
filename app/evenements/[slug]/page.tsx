import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Gauge, Users } from "lucide-react";

import ActivityImage from "@/components/activities/ActivityImage";
import PageIntro from "@/components/sections/PageIntro";
import { activities, getActivityBySlug } from "@/lib/data/activities";
import { getScheduleTextBySlug } from "@/lib/data/schedules";
import { getBenefitIcon } from "@/lib/data/activity-icons";

interface ActivityPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return activities.map((activity) => ({
    slug: activity.slug,
  }));
}

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
      images: [
        {
          url: activity.image.src,
          alt: activity.image.alt,
        },
      ],
    },
  };
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { slug } = await params;
  const activity = getActivityBySlug(slug);

  if (!activity) {
    notFound();
  }

  // On utilise le slug de l'activité (et non event.activitySlug)
  const scheduleText = getScheduleTextBySlug(activity.slug);

  return (
    <>
      <PageIntro
        eyebrow="Activité"
        title={activity.title}
        description={`${activity.shortDescription}${scheduleText ? ` — ${scheduleText}` : ""}`}
      />

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

            {activity.lien && activity.titreLien && (
              <Link
                href={activity.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-5 inline-flex overflow-hidden rounded-lg bg-linear-to-br from-[#F5DC9A] via-[#A87B2A] to-[#E0B04F] p-[1.5px] shadow-[0_4px_14px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_22px_rgba(217,164,65,0.45),0_6px_20px_rgba(0,0,0,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] focus-visible:ring-offset-2 focus-visible:ring-offset-black active:translate-y-0 active:scale-[0.98]"
              >
                <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-linear-to-b from-[#141210] to-black px-5 py-2.5 text-sm font-semibold tracking-wide">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-[#F5DC9A]/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[300%]"
                  />

                  <span className="relative bg-linear-to-b from-[#F5DC9A] via-[#D9A441] to-[#A87B2A] bg-clip-text text-transparent">
                    {activity.titreLien}
                  </span>

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
                  <dt className="font-semibold">Tranche d&apos;âge</dt>
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
