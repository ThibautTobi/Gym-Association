
import type { Metadata } from "next";

import PageIntro from "@/components/sections/PageIntro";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Découvrez comment Gym’Association protège vos données personnelles et respecte votre vie privée.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Vie privée"
        title="Politique de confidentialité"
        description="Découvrez comment vos données personnelles sont collectées, utilisées et protégées."
      />

      <article className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6 lg:px-8">
          {/* Responsable du traitement */}
          <section aria-labelledby="responsable-title">
            <h2
              id="responsable-title"
              className="text-2xl font-bold"
            >
              1. Responsable du traitement
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Le responsable du traitement des données personnelles est :
            </p>

            <ul className="mt-4 list-inside list-disc space-y-2 leading-7 text-muted-foreground">
              <li>
                Nom de l’association : [Nom officiel de l’association]
              </li>
              <li>
                Adresse : [Adresse postale de l’association]
              </li>
              <li>
                Contact : [Adresse e-mail de contact]
              </li>
            </ul>
          </section>

          {/* Données collectées */}
          <section aria-labelledby="donnees-title">
            <h2
              id="donnees-title"
              className="text-2xl font-bold"
            >
              2. Données personnelles collectées
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Selon le formulaire utilisé, l’association peut collecter
              les informations nécessaires pour répondre aux demandes
              des visiteurs ou organiser une séance d’essai.
            </p>

            <ul className="mt-4 list-inside list-disc space-y-2 leading-7 text-muted-foreground">
              <li>Nom et prénom du demandeur.</li>
              <li>Adresse e-mail et numéro de téléphone, si demandés.</li>
              <li>
                Informations nécessaires à l’organisation d’une séance
                d’essai, comme l’activité souhaitée et la tranche d’âge.
              </li>
              <li>Contenu du message transmis par le formulaire.</li>
            </ul>

            <p className="mt-4 leading-7 text-muted-foreground">
              Seules les informations nécessaires au traitement de la
              demande doivent être collectées. Merci de ne pas transmettre
              d’informations sensibles dans les formulaires.
            </p>
          </section>

          {/* Finalités */}
          <section aria-labelledby="finalites-title">
            <h2
              id="finalites-title"
              className="text-2xl font-bold"
            >
              3. Utilisation des données
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les données sont utilisées, selon la demande, pour :
            </p>

            <ul className="mt-4 list-inside list-disc space-y-2 leading-7 text-muted-foreground">
              <li>Répondre aux messages envoyés à l’association.</li>
              <li>Recontacter les personnes intéressées par une séance d’essai.</li>
              <li>Organiser et assurer le suivi de ces demandes.</li>
              <li>Assurer le bon fonctionnement et la sécurité du site.</li>
            </ul>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les données ne doivent pas être utilisées à d’autres fins
              incompatibles avec celles annoncées lors de leur collecte.
            </p>
          </section>

          {/* Base légale */}
          <section aria-labelledby="base-legale-title">
            <h2
              id="base-legale-title"
              className="text-2xl font-bold"
            >
              4. Base légale du traitement
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Selon la nature de la demande, le traitement repose sur
              les mesures précontractuelles demandées par la personne,
              l’intérêt légitime de l’association à répondre aux messages
              reçus ou une autre base légale applicable. La base retenue
              doit être déterminée pour chaque formulaire et chaque usage.
            </p>
          </section>

          {/* Prestataires et destinataires */}
          <section aria-labelledby="destinataires-title">
            <h2
              id="destinataires-title"
              className="text-2xl font-bold"
            >
              5. Destinataires des données
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les données sont accessibles uniquement aux personnes
              habilitées de l’association qui en ont besoin pour traiter
              la demande.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Le site utilise Formspree pour transmettre les informations
              envoyées par ses formulaires. Ce prestataire peut traiter
              les données nécessaires à la fourniture de son service,
              conformément à ses conditions et à sa politique de
              confidentialité.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Politique de confidentialité de Formspree :{" "}
              <a
                href="https://formspree.io/legal/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-4"
              >
                consulter la politique de confidentialité
              </a>.
            </p>
          </section>

          {/* Durée de conservation */}
          <section aria-labelledby="conservation-title">
            <h2
              id="conservation-title"
              className="text-2xl font-bold"
            >
              6. Durée de conservation
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les données personnelles sont conservées pendant une durée
              limitée, proportionnée à la finalité de chaque traitement.
              Les demandes de contact et de séance d’essai doivent faire
              l’objet d’une durée de conservation définie par l’association.
              Les éventuelles données conservées par les prestataires sont
              également soumises à leurs propres modalités de conservation.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Durées applicables aux formulaires du site :
              [À compléter après vérification des pratiques de l’association
              et des paramètres de Formspree].
            </p>
          </section>

          {/* Droits des personnes */}
          <section aria-labelledby="droits-title">
            <h2
              id="droits-title"
              className="text-2xl font-bold"
            >
              7. Vos droits
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Conformément à la réglementation applicable en matière de
              protection des données, vous pouvez, selon les conditions
              prévues par celle-ci, demander l’accès à vos données, leur
              rectification, leur effacement, la limitation de leur
              traitement ou vous opposer à certains traitements. Vous
              pouvez également demander la portabilité lorsque ce droit
              s’applique et retirer votre consentement lorsque le
              traitement repose sur celui-ci.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Pour exercer vos droits, contactez l’association à l’adresse
              suivante : [Adresse e-mail de contact].
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Si vous estimez, après nous avoir contactés, que vos droits
              ne sont pas respectés, vous pouvez introduire une réclamation
              auprès de la Commission nationale de l’informatique et des
              libertés (CNIL).
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              <a
                href="https://www.cnil.fr/fr/plaintes"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-4"
              >
                Consulter la procédure de réclamation de la CNIL
              </a>.
            </p>
          </section>

          {/* Cookies */}
          <section aria-labelledby="cookies-title">
            <h2
              id="cookies-title"
              className="text-2xl font-bold"
            >
              8. Cookies et traceurs
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Le site peut utiliser des éléments techniques nécessaires
              à son fonctionnement. La présence éventuelle de cookies
              ou d’autres traceurs dépend des fonctionnalités réellement
              installées et de leur configuration.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Si des traceurs nécessitant le consentement sont utilisés,
              un mécanisme permettant de recueillir ce consentement avant
              leur dépôt ou leur lecture doit être mis en place. Les
              modalités applicables doivent être vérifiées avant la
              publication du site.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              <a
                href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-4"
              >
                En savoir plus sur les cookies et traceurs avec la CNIL
              </a>.
            </p>
          </section>

          {/* Sécurité */}
          <section aria-labelledby="securite-title">
            <h2
              id="securite-title"
              className="text-2xl font-bold"
            >
              9. Sécurité des données
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              L’association met en œuvre des mesures techniques et
              organisationnelles adaptées pour protéger les données
              personnelles contre les accès non autorisés, la perte,
              l’altération ou la divulgation. L’accès aux données doit
              être limité aux personnes qui en ont besoin.
            </p>
          </section>

          {/* Mise à jour */}
          <section aria-labelledby="mise-a-jour-title">
            <h2
              id="mise-a-jour-title"
              className="text-2xl font-bold"
            >
              10. Mise à jour de la politique
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Cette politique peut être mise à jour en cas d’évolution
              du site, des formulaires ou des traitements de données.
              La date de dernière mise à jour devra être indiquée ici :
              [Date à compléter].
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
