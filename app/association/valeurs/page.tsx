import type { Metadata } from "next";

import PageIntro from "@/components/sections/PageIntro";
import {
  SITE_NAME,
  SITE_URL,
  SITE_OG_IMAGE,
  SITE_OG_IMAGE_ALT,
  SITE_OG_IMAGE_DIMENSIONS,
} from "@/lib/site";

const PAGE_TITLE = "Nos valeurs";

const PAGE_DESCRIPTION =
  "Découvrez les valeurs qui guident Gymnastique Val de Saâne dans sa pratique sportive et sa vie associative.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/association/valeurs",
  },

  openGraph: {
    type: "website",
    url: `${SITE_URL}/association/valeurs`,
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

const values = [
  {
    title: "Respect",
    description:
      "Nous favorisons un environnement dans lequel chaque pratiquant, encadrant et bénévole est respecté.",
  },
  {
    title: "Progression",
    description:
      "Chaque personne doit pouvoir progresser à son rythme, quels que soient son âge et son niveau.",
  },
  {
    title: "Convivialité",
    description:
      "La pratique sportive est également un moment de partage, de rencontre et de plaisir.",
  },
  {
    title: "Engagement",
    description:
      "La vie associative repose sur l'implication des pratiquants, des familles, des bénévoles et des encadrants.",
  },
];

export default function ValuesPage() {
  return (
    <>
      <PageIntro
        eyebrow="L'association"
        title="Nos valeurs"
        description="Les principes qui accompagnent notre projet sportif et notre vie associative."
      />

      <section aria-labelledby="values-title" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="values-title" className="sr-only">
            Les valeurs de l&lsquo;association
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold">{value.title}</h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
