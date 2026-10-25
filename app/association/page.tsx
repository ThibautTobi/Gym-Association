import type { Metadata } from "next";
import { HeartHandshake, TrendingUp, Smile, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import PageIntro from "@/components/sections/PageIntro";

export const metadata: Metadata = {
  title: "L'association",
  description:
    "Découvrez Gym'Association, son histoire, son fonctionnement et ses valeurs.",
};

type Value = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const values: Value[] = [
  {
    title: "Respect",
    description: "Respect des pratiquants, des encadrants et des règles.",
    icon: HeartHandshake,
  },
  {
    title: "Progression",
    description: "Chacun progresse selon ses capacités et ses objectifs.",
    icon: TrendingUp,
  },
  {
    title: "Convivialité",
    description: "Le sport est aussi un moment de partage.",
    icon: Smile,
  },
  {
    title: "Engagement",
    description: "Une implication collective dans la vie de l'association.",
    icon: Users,
  },
];

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
                {values.map(({ title, description, icon: Icon }) => (
                  <li
                    key={title}
                    className="group flex items-start gap-4 rounded-xl border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>

                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
