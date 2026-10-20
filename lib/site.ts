/**
 * Configuration centrale du site Gym'Association.
 *
 * TODO AVANT LA MISE EN PRODUCTION DÉFINITIVE :
 * 1. Remplacer les valeurs provisoires par les informations réelles.
 * 2. Configurer NEXT_PUBLIC_SITE_URL dans les variables d'environnement
 *    de Vercel et de GitHub Actions.
 * 3. Vérifier les coordonnées et les lieux avant publication.
 *
 * Les composants et les métadonnées doivent réutiliser ces valeurs
 * au lieu de recopier les informations à plusieurs endroits.
 */

// TODO SEO : remplacer par le nom officiel de l'association.
export const SITE_NAME = "Gymnastique val de saâne";

// TODO SEO : remplacer par une description fidèle à l'association.
export const SITE_DESCRIPTION =
  "Découvrez nos activités sportives : Pilates, yoga, circuit training, marche, Baby Gym et gymnastique.";

// TODO SEO LOCAL : confirmer la commune exacte.
export const SITE_CITY = "Saint-Pierre-Bénouville";

// TODO SEO LOCAL : indiquer les communes réellement desservies.
export const SITE_SERVICE_AREAS = "[COMMUNES_DESSERVIES]";

// TODO CONTACT : renseigner les coordonnées officielles.
export const SITE_EMAIL = "[EMAIL_CONTACT]";
export const SITE_PHONE = "[TELEPHONE_CONTACT]";

// TODO ADRESSE : vérifier l'adresse exacte de la salle avant publication.
export const SITE_ADDRESS = "Salle du foyer rural de Val-de-Saâne, 76890";

// URL publique du site.
//
// En production, NEXT_PUBLIC_SITE_URL doit être définie dans Vercel.
// En développement et dans les environnements de test, localhost est
// utilisé par défaut si la variable est absente.
//
// IMPORTANT : le fallback évite de bloquer le build CI, mais ne doit
// pas remplacer l'URL publique réelle pour le SEO en production.
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const fallbackSiteUrl = "http://localhost:3000";

export const SITE_URL = new URL(configuredSiteUrl || fallbackSiteUrl).origin;
