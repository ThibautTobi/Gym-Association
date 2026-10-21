import type { Metadata } from "next";

import PageIntro from "@/components/sections/PageIntro";

export const metadata: Metadata = {
  title: "Nos valeurs",
  description:
    "Découvrez les valeurs qui guident Gym'Association dans sa pratique sportive et sa vie associative.",
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
            Les valeurs de l association
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
