/**
 * Configuration centrale du site Gym'Association.
 *
 * TODO AVANT LA MISE EN PRODUCTION DÉFINITIVE :
 * 1. Remplacer les valeurs provisoires par les informations réelles.
 * 2. Configurer NEXT_PUBLIC_SITE_URL dans les variables d'environnement.
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

// TODO SEO LOCAL : remplacer par la ville réelle.
// Exemple : "Rouen" — exemple uniquement, à ne pas conserver sans confirmation.
export const SITE_CITY =
  "Route De La Forge, 76890, Saint Pierre Bénouville france";

// Salle du foyer rural de Val-de-Saâne 76890 france

// TODO SEO LOCAL : indiquer les communes réellement desservies.
export const SITE_SERVICE_AREAS = "[COMMUNES_DESSERVIES]";
//

// TODO CONTACT : renseigner les coordonnées officielles.
export const SITE_EMAIL = "[EMAIL_CONTACT]";

export const SITE_PHONE = "[TELEPHONE_CONTACT]";

// TODO ADRESSE : renseigner le lieu réel des activités.
// Ne pas publier une adresse fictive.
export const SITE_ADDRESS =
  "Salle du foyer rural de Val-de-Saâne 76890 france / Route De La Forge, 76890, Saint Pierre Bénouville france";

// URL publique du site.
// En développement, localhost est utilisé par défaut.
// En production, NEXT_PUBLIC_SITE_URL doit être configurée.
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (process.env.NODE_ENV === "production" && !configuredSiteUrl) {
  throw new Error(
    "Configure NEXT_PUBLIC_SITE_URL avant le déploiement en production.",
  );
}

export const SITE_URL = new URL(configuredSiteUrl ?? "http://localhost:3000")
  .origin;
