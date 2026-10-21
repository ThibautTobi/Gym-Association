import type { Metadata } from "next";

import PageIntro from "@/components/sections/PageIntro";
import { teamMembers } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "Notre équipe",
  description:
    "Découvrez l'équipe qui participe à la vie et à l'encadrement de Gym'Association.",
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
            Membres de l équipe
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <article
                key={member.id}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                {/* 
                  Placeholder temporaire.
                  Nous utiliserons next/image lorsque nous aurons
                  les vraies photos de l'équipe.
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
