import type { Metadata } from "next";
import Link from "next/link";

import PageIntro from "@/components/sections/PageIntro";

import {
  SITE_NAME,
  SITE_URL,
  SITE_OG_IMAGE,
  SITE_OG_IMAGE_ALT,
  SITE_OG_IMAGE_DIMENSIONS,
} from "@/lib/site";

/**
 * Métadonnées SEO des mentions légales.
 *
 * Cette page reste accessible aux moteurs de recherche.
 * Les informations juridiques doivent être confirmées
 * par l'association avant publication définitive.
 */

const PAGE_TITLE = `Mentions légales | ${SITE_NAME}`;

const PAGE_DESCRIPTION = `Consultez les mentions légales de ${SITE_NAME} : informations sur l'éditeur du site, la publication, l'hébergement et la propriété intellectuelle.`;

/**
 * URL canonique de la page des mentions légales.
 */
const PAGE_URL = `${SITE_URL}/mentions-legales`;

/**
 * Données structurées JSON-LD des mentions légales.
 *
 * WebPage décrit la page.
 * BreadcrumbList décrit son emplacement dans le site.
 *
 * Les entités SportsOrganization et WebSite sont déjà
 * déclarées globalement dans app/layout.tsx.
 */
const legalNoticeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: "fr-FR",
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#organization`,
      },
      breadcrumb: {
        "@id": `${PAGE_URL}#breadcrumb`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Mentions légales",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: "Mentions légales",
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/mentions-legales",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: PAGE_URL,
    siteName: SITE_NAME,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: SITE_OG_IMAGE_DIMENSIONS.width,
        height: SITE_OG_IMAGE_DIMENSIONS.height,
        alt: SITE_OG_IMAGE_ALT,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: SITE_OG_IMAGE,
        alt: SITE_OG_IMAGE_ALT,
      },
    ],
  },
};

/**
 * Informations à compléter ou à confirmer par l'association.
 *
 * IMPORTANT :
 * L'adresse du siège social doit être celle déclarée
 * administrativement par l'association.
 *
 * Elle ne doit pas être remplacée automatiquement par
 * l'adresse de la salle de pratique sportive.
 */
const LEGAL_INFORMATION = {
  associationName: "Gymnastique Val de Saâne",
  // legalForm: "[Forme juridique de l'association à compléter]",
  // registeredAddress: "[Adresse complète du siège social à compléter]",
  // rnaNumber: "[Numéro RNA à compléter si applicable]",
  // sirenNumber: "[Numéro SIREN à compléter si applicable]",
  // siretNumber: "[Numéro SIRET à compléter si applicable]",
  // email: "[Adresse e-mail de contact à confirmer]",
  // phone: "[Numéro de téléphone à compléter si applicable]",
  // publicationDirector: "[Nom et prénom du directeur de publication]",
  // hostingCompany: "Vercel Inc. [Dénomination à confirmer]",
  // hostingAddress: "[Adresse officielle de l'hébergeur à vérifier]",
  // hostingPhone: "[Coordonnées téléphoniques de l'hébergeur à vérifier]",
  // lastUpdated: "[Date de dernière mise à jour à compléter]",
};

export default function LegalNoticePage() {
  return (
    <>
      {/* Données structurées JSON-LD des mentions légales */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(legalNoticeJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PageIntro
        eyebrow="Informations légales"
        title="Mentions légales"
        description="Retrouvez les informations relatives à l'éditeur, au responsable de publication, à l'hébergement et à l'utilisation des contenus du site."
      />

      <article
        aria-label="Mentions légales du site Gymnastique Val de Saâne"
        className="py-16 sm:py-20"
      >
        <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6 lg:px-8">
          {/* Éditeur du site */}
          <section aria-labelledby="editor-title">
            <h2 id="editor-title" className="text-2xl font-bold">
              1. Éditeur du site
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Le présent site internet est édité par l’association suivante :
            </p>

            <ul className="mt-4 list-inside list-disc space-y-2 leading-7 text-muted-foreground">
              <li>
                Nom de l&rsquo;association : {LEGAL_INFORMATION.associationName}
              </li>
              {/* <li>Forme juridique : {LEGAL_INFORMATION.legalForm}</li>
              <li>Siège social : {LEGAL_INFORMATION.registeredAddress}</li>
              <li>Numéro RNA : {LEGAL_INFORMATION.rnaNumber}</li>
              <li>SIREN : {LEGAL_INFORMATION.sirenNumber}</li>
              <li>SIRET : {LEGAL_INFORMATION.siretNumber}</li>
              <li>Adresse e-mail : {LEGAL_INFORMATION.email}</li>
              <li>Téléphone : {LEGAL_INFORMATION.phone}</li> */}
            </ul>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les informations relatives à l&rsquo;identité et à la situation
              administrative de l&rsquo;association doivent être vérifiées avant
              la publication définitive de cette page.
            </p>
          </section>

          {/* Responsable de publication */}
          <section aria-labelledby="publication-title">
            <h2 id="publication-title" className="text-2xl font-bold">
              2. Directeur ou directrice de la publication
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Le responsable de la publication du site est :
            </p>

            {/* <p className="mt-3 leading-7 text-muted-foreground">
              {LEGAL_INFORMATION.publicationDirector}
            </p> */}

            <p className="mt-4 leading-7 text-muted-foreground">
              Cette information doit être confirmée par le représentant de
              l&rsquo;association avant la mise en ligne définitive des mentions
              légales.
            </p>
          </section>

          {/* Hébergement */}
          <section aria-labelledby="hosting-title">
            <h2 id="hosting-title" className="text-2xl font-bold">
              3. Hébergement du site
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Le site est déployé sur la plateforme Vercel. Les coordonnées
              juridiques et les informations de contact de l&rsquo;entité qui
              assure effectivement l&rsquo;hébergement doivent être vérifiées
              avant publication.
            </p>

            <ul className="mt-4 list-inside list-disc space-y-2 leading-7 text-muted-foreground">
              {/* <li>Hébergeur : {LEGAL_INFORMATION.hostingCompany}</li>
              <li>Adresse : {LEGAL_INFORMATION.hostingAddress}</li>
              <li>Téléphone : {LEGAL_INFORMATION.hostingPhone}</li> */}
              <li>
                Site officiel :{" "}
                <a
                  href="https://vercel.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline underline-offset-4"
                >
                  https://vercel.com/
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
              Les contenus présents sur ce site, notamment les textes, les
              éléments graphiques, les photographies, les illustrations, les
              logos et les éléments de présentation, sont susceptibles
              d&rsquo;être protégés par les dispositions applicables en matière
              de propriété intellectuelle.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Toute reproduction, représentation, modification ou réutilisation
              de ces contenus, en tout ou partie, sans autorisation préalable
              des titulaires des droits concernés peut être interdite, sauf
              exception prévue par la loi.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les contenus appartenant à des tiers restent soumis aux droits de
              leurs auteurs ou titulaires. Les crédits et mentions nécessaires
              doivent être respectés conformément aux licences et autorisations
              applicables.
            </p>
          </section>

          {/* Responsabilité */}
          <section aria-labelledby="liability-title">
            <h2 id="liability-title" className="text-2xl font-bold">
              5. Responsabilité
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              L&rsquo;association s&rsquo;efforce de publier des informations
              exactes et régulièrement mises à jour concernant ses activités,
              ses actualités et les informations pratiques communiquées sur le
              site.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Malgré le soin apporté à la mise à jour des contenus, des erreurs
              ou omissions peuvent subsister. Les visiteurs sont invités à
              contacter l&rsquo;association pour signaler une information qui
              leur semble inexacte ou obsolète.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les liens vers des sites internet externes sont proposés à titre
              informatif. L&rsquo;association ne maîtrise pas nécessairement les
              contenus, les disponibilités ou les pratiques de confidentialité
              de ces services tiers.
            </p>
          </section>

          {/* Données personnelles */}
          <section aria-labelledby="privacy-title">
            <h2 id="privacy-title" className="text-2xl font-bold">
              6. Données personnelles
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Le site propose notamment un formulaire de contact et un
              formulaire de demande de séance d&rsquo;essai. Les informations
              relatives aux données collectées, à leur utilisation, à leur
              conservation et aux droits des personnes sont détaillées dans la
              politique de confidentialité.
            </p>

            <Link
              href="/confidentialite"
              className="mt-3 inline-flex font-medium text-primary underline underline-offset-4"
            >
              Consulter la politique de confidentialité
            </Link>
          </section>

          {/* Liens externes */}
          <section aria-labelledby="external-links-title">
            <h2 id="external-links-title" className="text-2xl font-bold">
              7. Liens externes
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Le site peut proposer des liens vers des plateformes ou des sites
              tiers afin de faciliter l&rsquo;accès à des informations ou
              services complémentaires.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              L&rsquo;ouverture de ces liens entraîne la consultation de
              services indépendants du site de l&rsquo;association. Il est
              recommandé de consulter les conditions d&rsquo;utilisation et les
              politiques de confidentialité propres à ces services.
            </p>
          </section>

          {/* Mise à jour */}
          <section aria-labelledby="update-title">
            <h2 id="update-title" className="text-2xl font-bold">
              8. Mise à jour des mentions légales
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Les présentes mentions légales peuvent être modifiées afin de
              tenir compte des évolutions de l&rsquo;association, du site
              internet ou de la réglementation applicable.
            </p>

            {/* <p className="mt-4 leading-7 text-muted-foreground">
              Dernière mise à jour : {LEGAL_INFORMATION.lastUpdated}.
            </p> */}
          </section>

          {/* Contact */}
          <section aria-labelledby="contact-title" className="border-t pt-8">
            <h2 id="contact-title" className="text-xl font-semibold">
              Contacter l&rsquo;association
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              Pour toute question concernant le site ou son contenu, vous pouvez
              utiliser la page de contact.
            </p>

            <Link
              href="/contact"
              className="mt-3 inline-flex font-medium text-primary underline underline-offset-4"
            >
              Accéder au formulaire de contact
            </Link>
          </section>
        </div>
      </article>
    </>
  );
}
