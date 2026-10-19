import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

/**
 * SEO GLOBAL
 *
 * À personnaliser dans lib/site.ts :
 * - nom officiel de l'association ;
 * - description générale ;
 * - URL publique du site via NEXT_PUBLIC_SITE_URL.
 *
 * Chaque page importante doit définir ses propres métadonnées.
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

  alternates: {
    // La page d'accueil utilise la racine du domaine.
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Association sportive`,
    description: SITE_DESCRIPTION,

    // TODO : ajouter une image Open Graph réelle lorsque le visuel
    // définitif sera disponible, par exemple /images/og-image.jpg.
  },

  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Association sportive`,
    description: SITE_DESCRIPTION,
  },
};

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
