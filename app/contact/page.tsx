import type { Metadata } from "next";

import ContactForm from "@/components/contact/ContactForm";
import PageIntro from "@/components/sections/PageIntro";

export const metadata: Metadata = {
  title: "Contact et renseignements",
  description:
    "Contactez Gymnastique Val de Saâne pour toute question sur les activités, les horaires, les tarifs et les inscriptions de la saison 2026-2027.",
  alternates: {
    canonical: "/contact",
  },
};

const CONTACT_EMAIL = "gymnastique.vds@gmail.com";

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Nous contacter"
        description="Une question concernant nos activités, nos horaires ou les inscriptions ? Écrivez-nous."
      />

      <section
        aria-labelledby="contact-section-title"
        className="py-16 sm:py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <h2 id="contact-section-title" className="text-2xl font-bold">
              Parlons de votre projet
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Notre équipe peut vous renseigner sur les activités, les horaires,
              les tarifs et les modalités d’inscription à Gymnastique Val de
              Saâne.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-semibold">E-mail</h3>

                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-2 inline-block text-sm text-primary hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>

              <div>
                <h3 className="font-semibold">
                  Lieu des activités — saison 2026-2027
                </h3>

                <address className="mt-2 not-italic text-sm leading-6 text-muted-foreground">
                  11 route de la Forge
                  <br />
                  76890 Saint-Pierre-Bénouville
                </address>
              </div>

              <p className="text-sm leading-6 text-muted-foreground">
                Le lieu des activités est susceptible d’évoluer à partir de la
                saison 2027-2028. Les informations seront mises à jour lorsque
                la nouvelle implantation sera confirmée.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
