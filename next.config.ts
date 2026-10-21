import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Autorise les hôtes utilisés par Playwright en développement.
   *
   * Sans cela, Next.js bloque certaines ressources de développement
   * quand le site est ouvert via 127.0.0.1 : la page peut s'afficher
   * sans être "hydratée" par React, et les clics n'ont alors aucun effet
   * (validation absente, menu mobile qui ne s'ouvre pas...).
   *
   * Ne concerne que `npm run dev` : aucun effet en production.
   */
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
