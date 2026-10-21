import Image from "next/image";

/**
 * Image d'une activité, réutilisable partout (accueil, liste, détail).
 *
 * Emplacement : components/activities/ActivityImage.tsx
 *
 * Avantage : le cadre, le recadrage et les tailles sont réglés à UN seul
 * endroit. Si tu changes le rendu ici, toutes les pages suivent.
 */

/**
 * Proportions du cadre (largeur / hauteur).
 * Les noms de classes Tailwind sont écrits EN ENTIER : Tailwind ne
 * détecte que les noms tels quels dans le code, jamais assemblés.
 */
const aspectClasses = {
  card: "aspect-3/2",
  wide: "aspect-16/9",
  square: "aspect-square",
};

/**
 * Comment l'image occupe son cadre.
 *
 * - contain : image visible EN ENTIER, avec d'éventuelles bandes grises
 *             si ses proportions diffèrent de celles du cadre.
 * - cover   : image qui remplit tout le cadre, bords coupés. Léger zoom
 *             au survol si un parent possède la classe `group`.
 *             `motion-reduce` coupe l'animation pour les visiteurs qui
 *             ont demandé moins de mouvement.
 */
const fitClasses = {
  contain: "object-contain",
  cover:
    "object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
};

/**
 * Largeur affichée d'une carte d'activité dans la grille
 * (mobile : 1 colonne, tablette : 2, desktop : 4).
 *
 * Partagée par la page d'accueil et la page "Activités" : si la grille
 * change, on ne modifie qu'ici. Le navigateur s'en sert pour télécharger
 * une image de la bonne taille.
 */
export const ACTIVITY_CARD_SIZES =
  "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw";

interface ActivityImageProps {
  /** Chemin à partir de `public/` : "/images/baby-gym.png" */
  src: string;

  /** Description pour les lecteurs d'écran. alt="" si purement décorative. */
  alt: string;

  /**
   * Largeur réellement affichée. Par défaut : celle d'une carte de la
   * grille d'activités. À préciser pour un autre emplacement
   * (ex. la page de détail : "(min-width: 1024px) 640px, 100vw").
   */
  sizes?: string;

  aspect?: keyof typeof aspectClasses;
  fit?: keyof typeof fitClasses;

  /** Classes supplémentaires pour le cadre (ex. "rounded-xl border"). */
  className?: string;
}

export default function ActivityImage({
  src,
  alt,
  sizes = ACTIVITY_CARD_SIZES,
  aspect = "card",
  fit = "contain",
  className = "",
}: ActivityImageProps) {
  return (
    /**
     * relative : obligatoire avec `fill`.
     * La classe d'aspect réserve la place avant le chargement
     * (la page ne "saute" pas).
     */
    <div
      className={`relative w-full overflow-hidden bg-muted ${aspectClasses[aspect]} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={fitClasses[fit]}
      />
    </div>
  );
}
