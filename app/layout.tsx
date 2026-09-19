import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: {
    default: "Gym'Association",
    template: "%s | Gym'Association",
  },
  description:
    "Découvrez Gym'Association, notre association de gymnastique et nos activités pour enfants, adolescents et adultes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Header />

        {children}
      </body>
    </html>
  );
}