import type { Metadata } from "next";

import PageIntro from "@/components/sections/PageIntro";
import { teamMembers } from "@/lib/data/team";
import {
  SITE_NAME,
  SITE_URL,
  SITE_OG_IMAGE,
  SITE_OG_IMAGE_ALT,
  SITE_OG_IMAGE_DIMENSIONS,
} from "@/lib/site";

const PAGE_TITLE = "Notre équipe";

const PAGE_DESCRIPTION =
  "Découvrez les personnes qui participent à la vie et à l'encadrement de Gymnastique Val de Saâne.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/association/equipe",
  },

  openGraph: {
    type: "website",
    url: `${SITE_URL}/association/equipe`,
    siteName: SITE_NAME,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: SITE_OG_IMAGE_DIMENSIONS.width,
        height: SITE_OG_IMAGE_DIMENSIONS.height,
        alt: SITE_OG_IMAGE_ALT,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
};

export default function TeamPage() {
  return (
    <>
      <PageIntro
        eyebrow="L'association"
        title="Notre équipe"
        description="Découvrez les personnes qui participent à la vie et à l'encadrement de l'association."
      />

      <section aria-labelledby="team-title" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="team-title" className="sr-only">
            Membres de l&lsquo;équipe
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <article
                key={member.id}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                {/* 
                  Placeholder temporaire.
                  Les photographies réelles pourront être ajoutées
                  lorsque les visuels de l'équipe seront disponibles.
                */}
                <div
                  aria-hidden="true"
                  className="aspect-square rounded-xl bg-muted"
                />

                <h3 className="mt-6 text-xl font-semibold">{member.name}</h3>

                <p className="mt-1 text-sm font-medium text-primary">
                  {member.role}
                </p>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {member.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
