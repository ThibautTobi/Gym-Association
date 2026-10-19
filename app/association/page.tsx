import type { Metadata } from "next";

import PageIntro from "@/components/sections/PageIntro";

export const metadata: Metadata = {
  title: "L'association",
  description:
    "Découvrez Gym'Association, son histoire, son fonctionnement et ses valeurs.",
};

export default function AssociationPage() {
  return (
    <>
      <PageIntro
        eyebrow="Notre association"
        title="Une association sportive à taille humaine"
        description="Découvrez notre histoire, notre fonctionnement et les valeurs qui nous accompagnent au quotidien."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <section aria-labelledby="story-title">
              <h2 id="story-title" className="text-2xl font-bold">
                Notre histoire
              </h2>

              <p className="mt-4 leading-8 text-muted-foreground">
                Gym Val de saâne est une association sportive de cours
                collectifs et specialisée à la pratique et à la découverte de la
                gymnastique.
              </p>
            </section>

            <section aria-labelledby="mission-title">
              <h2 id="mission-title" className="text-2xl font-bold">
                Notre mission
              </h2>

              <p className="mt-4 leading-8 text-muted-foreground">
                Notre objectif est de permettre à chacun de pratiquer une
                activité sportive dans un environnement accessible, convivial et
                respectueux du rythme de chacun.
              </p>
            </section>

            <section aria-labelledby="values-title">
              <h2 id="values-title" className="text-2xl font-bold">
                Nos valeurs
              </h2>

              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                <li className="rounded-xl border bg-card p-5">
                  <h3 className="font-semibold">Respect</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Respect des pratiquants, des encadrants et des règles.
                  </p>
                </li>

                <li className="rounded-xl border bg-card p-5">
                  <h3 className="font-semibold">Progression</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Chacun progresse selon ses capacités et ses objectifs.
                  </p>
                </li>

                <li className="rounded-xl border bg-card p-5">
                  <h3 className="font-semibold">Convivialité</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Le sport est aussi un moment de partage.
                  </p>
                </li>

                <li className="rounded-xl border bg-card p-5">
                  <h3 className="font-semibold">Engagement</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Une implication collective dans la vie de
                    l&apos;association.
                  </p>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
