import type { Metadata } from "next";

import PageIntro from "@/components/sections/PageIntro";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Découvrez en images la vie de Gym'Association.",
};

export default function GalleryPage() {
  return (
    <>
      <PageIntro
        eyebrow="En images"
        title="Galerie"
        description="Découvrez prochainement les moments forts de la vie de l'association."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-2xl border bg-muted p-10">
            <h2 className="text-2xl font-bold">Galerie en préparation</h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les photos de l association seront ajoutées ici lorsque les
              ressources seront disponibles.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
