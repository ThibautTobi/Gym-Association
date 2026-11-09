/**
 * Configuration centrale du site Gymnastique Val de Saâne.
 *
 * Ce fichier centralise :
 * - Les informations générales de l'association.
 * - Les coordonnées.
 * - L'URL publique.
 * - Les lieux de pratique par saison sportive.
 *
 * IMPORTANT :
 * Vérifier les valeurs marquées TODO avant la mise en production.
 */

// ============================================================
// IDENTITÉ DU SITE
// ============================================================

export const SITE_NAME = "Gymnastique Val de Saâne";

export const SITE_SHORT_NAME = "Gym Val de Saâne";

export const SITE_DESCRIPTION =
  "Découvrez les activités sportives de Gymnastique Val de Saâne : gymnastique, Baby Gym, Pilates, aérobic sportive, marche active et activités physiques pour tous.";

// ============================================================
// IMAGE DE PARTAGE : OPEN GRAPH ET TWITTER
// ============================================================

/**
 * Image utilisée lors du partage du site sur les réseaux sociaux.
 *
 * Emplacement physique :
 * public/images/og-image.jpg
 *
 * URL publique :
 * /images/og-image.jpg
 *
 * Dimensions recommandées : 1200 x 630 pixels.
 */
export const SITE_OG_IMAGE = "/images/og/og-gymnastique-val-de-saane.webp";

export const SITE_OG_IMAGE_ALT =
  "Gymnastique Val de Saâne - Association sportive";

export const SITE_OG_IMAGE_DIMENSIONS = {
  width: 1200,
  height: 630,
};

// ============================================================
// COORDONNÉES DE L'ASSOCIATION
// ============================================================

export const SITE_EMAIL = "gymnastique.vds@gmail.com";

export const SITE_PHONE = "07.69.33.08.37";

/**
 * Communes desservies par l'association.
 *
 * TODO :
 * Remplacer par les communes réellement concernées.
 * Ne pas ajouter de communes uniquement pour le SEO.
 */
export const SITE_SERVICE_AREAS = ["Saint-Pierre-Bénouville", "Val-de-Saâne"];

// ============================================================
// URL PUBLIQUE
// ============================================================

/**
 * Configurer NEXT_PUBLIC_SITE_URL dans :
 * - .env.local en développement.
 * - Vercel en production.
 *
 * Exemple :
 * NEXT_PUBLIC_SITE_URL=https://www.votre-domaine.fr
 */

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (process.env.NODE_ENV === "production" && !configuredSiteUrl) {
  throw new Error("NEXT_PUBLIC_SITE_URL doit être configurée en production.");
}

const fallbackSiteUrl = "http://localhost:3000";

const rawSiteUrl = configuredSiteUrl || fallbackSiteUrl;

let parsedSiteUrl: URL;

try {
  parsedSiteUrl = new URL(rawSiteUrl);
} catch {
  throw new Error(`L'URL du site est invalide : ${rawSiteUrl}`);
}

if (!["http:", "https:"].includes(parsedSiteUrl.protocol)) {
  throw new Error("L'URL du site doit utiliser HTTP ou HTTPS.");
}

/**
 * URL de référence du site, sans slash final ni chemin.
 */
export const SITE_URL = parsedSiteUrl.origin;

// ============================================================
// SAISONS SPORTIVES
// ============================================================

/**
 * Saison sportive actuellement concernée par le site.
 *
 * TODO :
 * Modifier cette valeur lors du changement de saison.
 */
export const CURRENT_SEASON = {
  label: "2026-2027",
  startYear: 2026,
  endYear: 2027,
};

// ============================================================
// LIEU ACTUEL : SAISON 2026-2027
// ============================================================

export const CURRENT_VENUE = {
  season: "2026-2027",

  name: "Salle du foyer rural",

  streetAddress: "11 route de la Forge",

  postalCode: "76890",

  city: "Saint-Pierre-Bénouville",

  country: "France",

  get fullAddress() {
    return `${this.streetAddress}, ${this.postalCode} ${this.city}`;
  },
};

// ============================================================
// FUTUR LIEU : SAISON 2027-2028
// ============================================================

/**
 * Déménagement annoncé pour la prochaine saison.
 *
 * ATTENTION :
 * Cette adresse ne doit pas être présentée comme le lieu
 * actuel avant que le déménagement soit effectivement réalisé.
 *
 * TODO :
 * Confirmer la date et le nom officiel de la salle.
 */
export const UPCOMING_VENUE = {
  season: "2027-2028",

  name: "Salle polyvalente",

  streetAddress: "Place Jehan Povremoyne",

  postalCode: "76890",

  city: "Val-de-Saâne",

  country: "France",

  planned: true,

  /**
   * Date effective du déménagement.
   * À renseigner lorsqu'elle sera confirmée.
   */
  effectiveDate: null as string | null,

  get fullAddress() {
    return `${this.streetAddress}, ${this.postalCode} ${this.city}`;
  },
};

// ============================================================
// INFORMATIONS SUR LES LIEUX
// ============================================================

/**
 * Retourne le lieu correspondant à une saison.
 */
export function getVenueBySeason(season: string) {
  if (season === CURRENT_VENUE.season) {
    return CURRENT_VENUE;
  }

  if (season === UPCOMING_VENUE.season) {
    return UPCOMING_VENUE;
  }

  return null;
}
