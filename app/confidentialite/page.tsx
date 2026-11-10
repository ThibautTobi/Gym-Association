import type { Metadata } from "next";
import Link from "next/link";

import PageIntro from "@/components/sections/PageIntro";

/**
 * Métadonnées SEO de la politique de confidentialité.
 *
 * Cette page est volontairement indexable :
 * elle apporte une information utile aux visiteurs et aux moteurs
 * de recherche sur la gestion des données personnelles du site.
 */
export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Consultez la politique de confidentialité de Gymnastique Val de Saâne : données collectées, formulaires, droits des utilisateurs et protection des données.",
  alternates: {
    canonical: "/confidentialite",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Politique de confidentialité | Gymnastique Val de Saâne",
    description:
      "Informations sur la collecte, l'utilisation et la protection des données personnelles sur le site de Gymnastique Val de Saâne.",
    url: "/confidentialite",
    siteName: "Gymnastique Val de Saâne",
    images: [
      {
        url: "/images/og/og-gymnastique-val-de-saane.webp",
        width: 1200,
        height: 630,
        alt: "Gymnastique Val de Saâne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Politique de confidentialité | Gymnastique Val de Saâne",
    description:
      "Informations sur la gestion des données personnelles du site Gymnastique Val de Saâne.",
    images: ["/images/og/og-gymnastique-val-de-saane.webp"],
  },
};

/**
 * À compléter avant publication définitive.
 *
 * Ne pas confondre le siège social de l'association
 * avec le lieu où se déroulent les cours.
 */
const PRIVACY_CONTACT = {
  associationName: "Gymnastique Val de Saâne",
  postalAddress: "[Adresse du siège social à compléter]",
  email: "[Adresse e-mail de contact à confirmer]",
  lastUpdated: "[Date de dernière mise à jour à compléter]",
};

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Vie privée et données personnelles"
        title="Politique de confidentialité"
        description="Découvrez quelles données personnelles sont collectées sur le site Gymnastique Val de Saâne, pourquoi elles sont utilisées et comment exercer vos droits."
      />

      <article
        aria-label="Politique de confidentialité de Gymnastique Val de Saâne"
        className="py-16 sm:py-20"
      >
        <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <section aria-labelledby="introduction-title">
            <h2 id="introduction-title" className="text-2xl font-bold">
              Introduction
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              La présente politique de confidentialité explique comment
              l&lsquo;association {PRIVACY_CONTACT.associationName} traite les
              données personnelles communiquées par les visiteurs du site
              internet.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Elle concerne notamment les informations transmises au moyen du
              formulaire de contact et du formulaire de demande de séance
              d&lsquo;essai.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              L&lsquo;association s&lsquo;engage à limiter la collecte aux
              informations nécessaires au traitement des demandes et à respecter
              la réglementation applicable en matière de protection des données
              personnelles, notamment le règlement général sur la protection des
              données (RGPD).
            </p>
          </section>

          {/* Responsable du traitement */}
          <section aria-labelledby="responsable-title">
            <h2 id="responsable-title" className="text-2xl font-bold">
              1. Responsable du traitement
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Le responsable des traitements de données personnelles présentés
              dans cette politique est :
            </p>

            <ul className="mt-4 list-inside list-disc space-y-2 leading-7 text-muted-foreground">
              <li>Association : {PRIVACY_CONTACT.associationName}</li>
              <li>Adresse du siège social : {PRIVACY_CONTACT.postalAddress}</li>
              <li>Adresse e-mail : {PRIVACY_CONTACT.email}</li>
            </ul>
          </section>

          {/* Données collectées */}
          <section aria-labelledby="donnees-title">
            <h2 id="donnees-title" className="text-2xl font-bold">
              2. Données personnelles collectées
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les données collectées dépendent du formulaire utilisé sur le
              site.
            </p>

            <h3 className="mt-6 text-lg font-semibold">
              2.1. Formulaire de contact
            </h3>

            <p className="mt-3 leading-7 text-muted-foreground">
              Lorsque vous utilisez le formulaire de contact, les informations
              suivantes sont demandées :
            </p>

            <ul className="mt-3 list-inside list-disc space-y-2 leading-7 text-muted-foreground">
              <li>Prénom ;</li>
              <li>Nom ;</li>
              <li>Adresse e-mail ;</li>
              <li>Sujet du message ;</li>
              <li>Contenu du message.</li>
            </ul>

            <h3 className="mt-6 text-lg font-semibold">
              2.2. Formulaire de demande de séance d&lsquo;essai
            </h3>

            <p className="mt-3 leading-7 text-muted-foreground">
              Pour traiter une demande de séance d&lsquo;essai, le formulaire
              recueille les informations suivantes :
            </p>

            <ul className="mt-3 list-inside list-disc space-y-2 leading-7 text-muted-foreground">
              <li>Prénom ;</li>
              <li>Nom ;</li>
              <li>Date de naissance ;</li>
              <li>Numéro de téléphone ;</li>
              <li>Adresse e-mail ;</li>
              <li>Activité souhaitée ;</li>
              <li>Niveau de pratique déclaré ;</li>
              <li>Message complémentaire facultatif.</li>
            </ul>

            <p className="mt-4 leading-7 text-muted-foreground">
              La date de naissance peut concerner une personne mineure. Lorsque
              la demande concerne un enfant, il appartient à la personne qui
              effectue la démarche de s&lsquo;assurer qu&lsquo;elle est
              autorisée à transmettre ces informations.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les visiteurs sont invités à ne pas transmettre dans les champs de
              message des informations sensibles ou des informations
              personnelles qui ne sont pas nécessaires à leur demande.
            </p>
          </section>

          {/* Finalités */}
          <section aria-labelledby="finalites-title">
            <h2 id="finalites-title" className="text-2xl font-bold">
              3. Finalités des traitements
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les données personnelles sont utilisées uniquement pour les
              besoins liés aux demandes adressées à l&lsquo;association,
              notamment pour :
            </p>

            <ul className="mt-4 list-inside list-disc space-y-2 leading-7 text-muted-foreground">
              <li>
                Recevoir et traiter les messages envoyés par les visiteurs ;
              </li>
              <li>Répondre aux demandes de renseignements ;</li>
              <li>
                Recontacter les personnes intéressées par une séance
                d&lsquo;essai ;
              </li>
              <li>Identifier l&lsquo;activité et le niveau souhaités ;</li>
              <li>
                Organiser et assurer le suivi des demandes de séance
                d&lsquo;essai ;
              </li>
              <li>Assurer la sécurité et le bon fonctionnement du site.</li>
            </ul>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les informations ne doivent pas être réutilisées à des fins
              incompatibles avec celles pour lesquelles elles ont été
              recueillies.
            </p>
          </section>

          {/* Base légale */}
          <section aria-labelledby="base-legale-title">
            <h2 id="base-legale-title" className="text-2xl font-bold">
              4. Base juridique des traitements
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              La base juridique doit être déterminée en fonction de la finalité
              de chaque traitement.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Pour les demandes de séance d&lsquo;essai, le traitement peut
              notamment être nécessaire à la réalisation de démarches
              précontractuelles effectuées à la demande de la personne
              concernée. Pour les messages de contact, la base juridique
              applicable doit être précisée selon la nature de la demande et
              l&lsquo;utilisation qui en est faite.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              La case à cocher présente dans les formulaires permet de confirmer
              la prise de connaissance de la politique de confidentialité. Elle
              ne doit pas être interprétée comme un consentement général à toute
              utilisation des données personnelles.
            </p>

            <p className="mt-4 rounded-lg border bg-muted p-4 text-sm leading-6 text-muted-foreground">
              À vérifier avant publication définitive : confirmer la base
              juridique retenue pour chaque formulaire et adapter, si
              nécessaire, le libellé de la case à cocher.
            </p>
          </section>

          {/* Destinataires et prestataires */}
          <section aria-labelledby="destinataires-title">
            <h2 id="destinataires-title" className="text-2xl font-bold">
              5. Destinataires et prestataires
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les données sont destinées aux personnes habilitées de
              l&lsquo;association qui en ont besoin pour répondre aux demandes
              et assurer leur suivi.
            </p>

            <h3 className="mt-6 text-lg font-semibold">5.1. Formspree</h3>

            <p className="mt-3 leading-7 text-muted-foreground">
              Les formulaires du site utilisent le service Formspree pour
              transmettre les informations saisies. Les données communiquées
              peuvent donc être traitées par ce prestataire dans le cadre de son
              service de gestion des formulaires.
            </p>

            <p className="mt-3 leading-7 text-muted-foreground">
              Pour en savoir plus sur les pratiques de ce prestataire, vous
              pouvez consulter sa politique de confidentialité :
            </p>

            <p className="mt-3 leading-7">
              <a
                href="https://formspree.io/legal/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-4"
              >
                Politique de confidentialité de Formspree
              </a>
            </p>

            <h3 className="mt-6 text-lg font-semibold">5.2. Hébergement</h3>

            <p className="mt-3 leading-7 text-muted-foreground">
              Le site est déployé à l&lsquo;aide de la plateforme Vercel. Des
              données techniques nécessaires à l&lsquo;hébergement, à la
              sécurité et au fonctionnement du site peuvent être traitées par ce
              prestataire.
            </p>

            <p className="mt-3 leading-7">
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-4"
              >
                Politique de confidentialité de Vercel
              </a>
            </p>

            <p className="mt-4 rounded-lg border bg-muted p-4 text-sm leading-6 text-muted-foreground">
              À vérifier avant publication : les éventuels transferts de données
              hors de l&lsquo;Union européenne et les garanties applicables
              auprès des prestataires Formspree et Vercel.
            </p>
          </section>

          {/* Conservation */}
          <section aria-labelledby="conservation-title">
            <h2 id="conservation-title" className="text-2xl font-bold">
              6. Durée de conservation des données
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les données personnelles sont conservées pendant une durée
              proportionnée à la finalité pour laquelle elles ont été
              collectées. Elles doivent être supprimées ou archivées lorsque
              leur conservation n&lsquo;est plus nécessaire au traitement de la
              demande, sous réserve des obligations légales applicables.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les durées de conservation doivent être définies par
              l&lsquo;association pour les demandes de contact et les demandes
              de séance d&lsquo;essai. Il convient également de tenir compte des
              éventuelles durées de conservation appliquées par les
              prestataires.
            </p>

            <ul className="mt-4 list-inside list-disc space-y-2 leading-7 text-muted-foreground">
              <li>
                Formulaire de contact : [Durée de conservation à définir].
              </li>
              <li>
                Demande de séance d&lsquo;essai : [Durée de conservation à
                définir].
              </li>
              <li>
                Données conservées par les prestataires : [Modalités à vérifier
                dans les paramètres et conditions des services utilisés].
              </li>
            </ul>
          </section>

          {/* Droits */}
          <section aria-labelledby="droits-title">
            <h2 id="droits-title" className="text-2xl font-bold">
              7. Vos droits sur vos données personnelles
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Conformément à la réglementation applicable, vous disposez, selon
              les conditions prévues par celle-ci, de plusieurs droits
              concernant vos données personnelles :
            </p>

            <ul className="mt-4 list-inside list-disc space-y-2 leading-7 text-muted-foreground">
              <li>Droit d&lsquo;accès à vos données ;</li>
              <li>Droit de rectification des données inexactes ;</li>
              <li>
                Droit à l&lsquo;effacement, lorsque les conditions sont réunies
                ;
              </li>
              <li>Droit à la limitation du traitement ;</li>
              <li>Droit d&lsquo;opposition à certains traitements ;</li>
              <li>
                Droit à la portabilité, lorsque les conditions légales
                applicables sont réunies.
              </li>
            </ul>

            <p className="mt-4 leading-7 text-muted-foreground">
              Pour exercer vos droits ou poser une question relative à
              l&lsquo;utilisation de vos données, vous pouvez contacter
              l&lsquo;association :
            </p>

            <p className="mt-3 leading-7 text-muted-foreground">
              {PRIVACY_CONTACT.email}
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Si vous estimez, après avoir contacté l&lsquo;association, que vos
              droits ne sont pas respectés, vous pouvez adresser une réclamation
              à la Commission nationale de l&lsquo;informatique et des libertés
              (CNIL).
            </p>

            <p className="mt-3 leading-7">
              <a
                href="https://www.cnil.fr/fr/plaintes"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-4"
              >
                Consulter la procédure de réclamation de la CNIL
              </a>
            </p>
          </section>

          {/* Cookies */}
          <section aria-labelledby="cookies-title">
            <h2 id="cookies-title" className="text-2xl font-bold">
              8. Cookies et autres traceurs
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Un cookie ou un autre traceur peut être utilisé pour assurer
              certaines fonctionnalités techniques d&lsquo;un site internet ou
              mesurer son audience.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              La présence de cookies dépend des fonctionnalités effectivement
              installées et de la configuration des services utilisés. Les
              éventuels traceurs soumis au consentement ne doivent pas être
              déposés avant le recueil de celui-ci.
            </p>

            <p className="mt-4 rounded-lg border bg-muted p-4 text-sm leading-6 text-muted-foreground">
              À vérifier avant publication : contrôler les cookies et traceurs
              réellement déposés par le site, notamment ceux éventuellement
              associés à l&lsquo;hébergement, aux formulaires ou à des services
              tiers. Indiquer ici le résultat de cette vérification.
            </p>

            <p className="mt-4 leading-7">
              <a
                href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-4"
              >
                Comprendre les règles de la CNIL sur les cookies et traceurs
              </a>
            </p>
          </section>

          {/* Sécurité */}
          <section aria-labelledby="securite-title">
            <h2 id="securite-title" className="text-2xl font-bold">
              9. Sécurité des données
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              L&lsquo;association veille à limiter l&lsquo;accès aux données
              personnelles aux seules personnes qui en ont besoin pour traiter
              les demandes.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les mesures de sécurité applicables dépendent notamment des outils
              utilisés pour transmettre, héberger et consulter les informations.
              Aucun système de transmission ou de stockage ne pouvant garantir
              une sécurité absolue, les visiteurs sont invités à ne pas
              communiquer d&lsquo;informations sensibles dans les formulaires.
            </p>
          </section>

          {/* Mise à jour */}
          <section aria-labelledby="mise-a-jour-title">
            <h2 id="mise-a-jour-title" className="text-2xl font-bold">
              10. Mise à jour de la politique de confidentialité
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Cette politique peut être modifiée en cas d&lsquo;évolution du
              site, des formulaires, des prestataires ou des traitements de
              données personnelles.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Dernière mise à jour : {PRIVACY_CONTACT.lastUpdated}.
            </p>
          </section>

          {/* Navigation complémentaire */}
          <section
            aria-labelledby="informations-complementaires-title"
            className="border-t pt-8"
          >
            <h2
              id="informations-complementaires-title"
              className="text-xl font-semibold"
            >
              Informations complémentaires
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              Pour en savoir plus sur l&lsquo;association et les informations
              relatives à l&lsquo;édition du site, consultez également les
              mentions légales.
            </p>

            <Link
              href="/mentions-legales"
              className="mt-3 inline-flex font-medium text-primary underline underline-offset-4"
            >
              Consulter les mentions légales
            </Link>
          </section>
        </div>
      </article>
    </>
  );
}
