import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_OG_IMAGE_ALT,
  SITE_OG_IMAGE_DIMENSIONS,
  SITE_PHONE,
  SITE_SHORT_NAME,
  SITE_URL,
} from "@/lib/site";

/**
 * Métadonnées SEO globales.
 *
 * Elles servent de valeurs par défaut pour l'ensemble du site.
 * Chaque page peut les compléter ou les remplacer.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} | Association sportive`,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  applicationName: SITE_NAME,

  category: "sports",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Association sportive`,
    description: SITE_DESCRIPTION,
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
    title: `${SITE_NAME} | Association sportive`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_OG_IMAGE,
        alt: SITE_OG_IMAGE_ALT,
      },
    ],
  },
};

/**
 * Graphe JSON-LD global.
 *
 * SportsOrganization :
 * Décrit l'association sportive.
 *
 * WebSite :
 * Décrit le site Internet et son éditeur.
 *
 * Les identifiants @id permettent aux autres pages
 * de faire référence aux mêmes entités.
 *
 * Aucune adresse administrative, aucun logo et aucun
 * profil social ne sont inventés.
 */
const globalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SportsOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: SITE_SHORT_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      email: SITE_EMAIL,
      telephone: SITE_PHONE,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "fr-FR",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  ],
};

/**
 * Sécurisation de la chaîne JSON-LD avant son insertion
 * dans le document HTML.
 */
const globalJsonLdString = JSON.stringify(globalJsonLd).replace(
  /</g,
  "\\u003c",
);

/**
 * Propriétés du layout racine.
 */
interface RootLayoutProps {
  children: ReactNode;
}

/**
 * Layout racine de l'application Next.js.
 *
 * Header et Footer sont partagés entre toutes les pages.
 * lang="fr" indique la langue principale du document.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* Identité structurée globale de l'association et du site */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: globalJsonLdString }}
        />

        <div className="flex min-h-screen flex-col">
          <Header />

          <main id="main-content" className="flex-1">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
