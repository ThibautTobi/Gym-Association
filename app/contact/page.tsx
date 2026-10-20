import type { Metadata } from "next";

import ContactForm from "@/components/contact/ContactForm";
import PageIntro from "@/components/sections/PageIntro";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Gym'Association pour obtenir des informations sur nos activités, horaires et inscriptions.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Nous contacter"
        description="Une question concernant nos activités, nos horaires ou les inscriptions ? Écrivez-nous."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold">Parlons de votre projet</h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Notre équipe peut vous renseigner sur les activités, les horaires,
              les tarifs et les modalités d inscription.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-semibold">E-mail</h3>

                <a
                  href="mailto:gymnastique.vds@gmail.com"
                  className="mt-2 inline-block text-sm text-primary hover:underline"
                >
                  gymnastique.vds@gmail.com
                </a>
              </div>

              {/* <div>
                <h3 className="font-semibold">Adresse</h3>

                <address className="mt-2 not-italic text-sm leading-6 text-muted-foreground">
                  Adresse de l association
                  <br />
                  00000 Ville
                </address>
              </div> */}
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
