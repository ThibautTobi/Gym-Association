import type { Metadata } from "next";

import ContactForm from "@/components/contact/ContactForm";
import PageIntro from "@/components/sections/PageIntro";

import {
  CURRENT_SEASON,
  CURRENT_VENUE,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_OG_IMAGE_ALT,
  SITE_OG_IMAGE_DIMENSIONS,
  SITE_URL,
} from "@/lib/site";

/**
 * Emplacement : app/contact/page.tsx
 *
 * Page de contact de Gymnastique Val de Saâne.
 */

// Coordonnées de contact.
const CONTACT_EMAIL = "gymnastique.vds@gmail.com";

// URL absolue de la page.
const PAGE_URL = `${SITE_URL}/contact`;

// Métadonnées SEO et réseaux sociaux.
const PAGE_TITLE = `Contact et renseignements | ${SITE_NAME}`;

const PAGE_DESCRIPTION = `Contactez ${SITE_NAME} pour obtenir des renseignements sur les activités, les horaires, les tarifs et les modalités d'inscription pour la saison ${CURRENT_SEASON.label}. Notre équipe est à votre écoute.`;

/**
 * Données structurées JSON-LD propres à la page Contact.
 *
 * Le graphe global SportsOrganization et WebSite est déjà déclaré
 * dans app/layout.tsx. Nous ne le dupliquons donc pas ici.
 */
const contactJsonLd = {
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
          name: "Contact",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: "Contact et renseignements",
  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/contact",
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
 * Page de contact.
 */
export default function ContactPage() {
  return (
    <>
      {/* Données structurées JSON-LD de la page Contact */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactJsonLd).replace(/</g, "\\u003c"),
        }}
      />

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
          {/* Informations de contact */}
          <div>
            <h2 id="contact-section-title" className="text-2xl font-bold">
              Parlons de votre projet
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Notre équipe peut vous renseigner sur les activités, les horaires,
              les tarifs et les modalités d’inscription à {SITE_NAME}.
            </p>

            <div className="mt-8 space-y-6">
              {/* Adresse e-mail */}
              <div>
                <h3 className="font-semibold">E-mail</h3>

                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-2 inline-block text-sm text-primary hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>

              {/* Lieu de pratique de la saison actuelle */}
              <div>
                <h3 className="font-semibold">
                  Lieu des activités — saison {CURRENT_SEASON.label}
                </h3>

                <address className="mt-2 not-italic text-sm leading-6 text-muted-foreground">
                  {CURRENT_VENUE.name}
                  <br />
                  {CURRENT_VENUE.streetAddress}
                  <br />
                  {CURRENT_VENUE.postalCode} {CURRENT_VENUE.city}
                </address>
              </div>

              <p className="text-sm leading-6 text-muted-foreground">
                Le lieu des activités est susceptible d&rsquo;évoluer à partir
                de la saison suivante. Les informations seront mises à jour
                lorsque la nouvelle implantation sera confirmée.
              </p>
            </div>
          </div>

          {/* Formulaire de contact existant */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
