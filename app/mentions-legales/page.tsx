import type { Metadata } from "next";

import PageIntro from "@/components/sections/PageIntro";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Consultez les mentions légales du site Gym’Association : éditeur, publication, hébergement et propriété intellectuelle.",
};

export default function LegalNoticePage() {
  return (
    <>
      <PageIntro
        eyebrow="Informations légales"
        title="Mentions légales"
        description="Retrouvez les informations relatives à l’éditeur, à la publication et à l’hébergement du site."
      />

      <article className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6 lg:px-8">
          {/* Identification de l'éditeur */}
          <section aria-labelledby="editor-title">
            <h2 id="editor-title" className="text-2xl font-bold">
              1. Éditeur du site
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Le présent site est édité par l’association suivante :
            </p>

            <ul className="mt-4 list-inside list-disc space-y-2 leading-7 text-muted-foreground">
              <li>Nom officiel : [Nom officiel de l’association]</li>
              <li>Forme juridique : [Forme juridique de l’association]</li>
              <li>Adresse du siège social : [Adresse complète]</li>
              <li>Numéro RNA : [Numéro RNA, si applicable]</li>
              <li>Numéro SIREN/SIRET : [Numéro, si applicable]</li>
              <li>Adresse e-mail : [Adresse e-mail de contact]</li>
              <li>Téléphone : [Numéro de téléphone de l’association]</li>
            </ul>
          </section>

          {/* Directeur de la publication */}
          <section aria-labelledby="publication-title">
            <h2 id="publication-title" className="text-2xl font-bold">
              2. Directeur de la publication
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Directeur ou directrice de la publication : [Nom et prénom du
              représentant désigné].
            </p>
          </section>

          {/* Hébergement */}
          <section aria-labelledby="hosting-title">
            <h2 id="hosting-title" className="text-2xl font-bold">
              3. Hébergement du site
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Le site est hébergé par Vercel, sous réserve de confirmation de la
              configuration de déploiement.
            </p>

            <ul className="mt-4 list-inside list-disc space-y-2 leading-7 text-muted-foreground">
              <li>Hébergeur : Vercel Inc.</li>
              <li>
                Adresse : 440 N Barranca Avenue #4133, Covina, CA 91723,
                États-Unis.
              </li>
              <li>
                Téléphone : [Coordonnées téléphoniques officielles de
                l’hébergeur à vérifier avant publication].
              </li>
              <li>
                Site officiel :{" "}
                <a
                  href="https://vercel.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline underline-offset-4"
                >
                  vercel.com
                </a>
              </li>
            </ul>
          </section>

          {/* Propriété intellectuelle */}
          <section aria-labelledby="intellectual-property-title">
            <h2 id="intellectual-property-title" className="text-2xl font-bold">
              4. Propriété intellectuelle
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les contenus du site, notamment les textes, les éléments
              graphiques, le logo, les photographies et les illustrations, sont
              soumis aux droits de propriété intellectuelle applicables. Leur
              utilisation est réservée aux titulaires des droits concernés, sauf
              autorisation ou exception légale.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les contenus appartenant à des tiers restent soumis aux droits et
              aux conditions d’utilisation de leurs auteurs ou titulaires. Les
              crédits et attributions nécessaires doivent être indiqués lorsque
              les licences applicables l’exigent.
            </p>
          </section>

          {/* Responsabilité */}
          <section aria-labelledby="liability-title">
            <h2 id="liability-title" className="text-2xl font-bold">
              5. Responsabilité
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              L’association s’efforce de fournir des informations exactes et à
              jour. Malgré cette attention, des erreurs ou omissions peuvent
              subsister. Les visiteurs sont invités à contacter l’association
              pour signaler une information qui leur semble inexacte ou
              obsolète.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les liens vers des sites tiers sont fournis à titre d’information.
              L’association ne maîtrise pas nécessairement leur contenu ni leurs
              pratiques de confidentialité.
            </p>
          </section>

          {/* Données personnelles */}
          <section aria-labelledby="privacy-title">
            <h2 id="privacy-title" className="text-2xl font-bold">
              6. Données personnelles
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les informations relatives à la collecte et au traitement des
              données personnelles sont présentées dans notre politique de
              confidentialité.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              <a
                href="/confidentialite"
                className="font-medium text-primary underline underline-offset-4"
              >
                Consulter la politique de confidentialité
              </a>
            </p>
          </section>

          {/* Mise à jour */}
          <section aria-labelledby="update-title">
            <h2 id="update-title" className="text-2xl font-bold">
              7. Mise à jour des mentions légales
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Dernière mise à jour : [Date à compléter].
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
