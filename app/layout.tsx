import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

import "./globals.css";

/**
 * Métadonnées SEO globales du site Gym'Association.
 *
 * À personnaliser dans lib/site.ts :
 * - nom officiel de l'association ;
 * - description générale ;
 * - URL publique du site via NEXT_PUBLIC_SITE_URL.
 *
 * Chaque page importante peut définir ses propres métadonnées
 * pour améliorer son référencement naturel.
 */
export const metadata: Metadata = {
  // URL de référence utilisée pour résoudre les URL relatives.
  metadataBase: new URL(SITE_URL),

  // Titre global et modèle utilisé par les pages.
  title: {
    default: `${SITE_NAME} | Association sportive`,
    template: `%s | ${SITE_NAME}`,
  },

  // Description générale du site.
  description: SITE_DESCRIPTION,

  applicationName: SITE_NAME,
  category: "sports",

  // URL canonique de la page d'accueil.
  alternates: {
    canonical: "/",
  },

  // Autoriser l'indexation du site par les moteurs de recherche.
  robots: {
    index: true,
    follow: true,
  },

  // Métadonnées pour les aperçus de partage sur les réseaux sociaux.
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Association sportive`,
    description: SITE_DESCRIPTION,

    // TODO : ajouter une image Open Graph définitive.
    // Exemple : images: ["/images/og-image.jpg"],
  },

  // Métadonnées pour les aperçus compatibles avec Twitter/X.
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Association sportive`,
    description: SITE_DESCRIPTION,

    // TODO : ajouter une image de partage lorsque le visuel sera prêt.
  },
};

/**
 * Layout racine de l'application Next.js.
 *
 * Le Header et le Footer sont partagés entre les pages.
 * L'attribut lang="fr" précise la langue principale du document.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen">
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
