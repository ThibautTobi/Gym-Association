import Image, { type ImageProps } from "next/image";
import { useId } from "react";

/**
 * Formes disponibles pour le cadre ondulé.
 *
 * soft     : ondulations douces, adaptées aux cartes d'activités.
 * playful  : ondulations plus marquées, adaptées à la galerie.
 * dynamic  : forme plus irrégulière, pour un rendu plus sportif.
 */
export type WaveImageVariant = "soft" | "playful" | "dynamic";

export type WaveImageRatio = "square" | "portrait" | "landscape" | "wide";

type WaveImageProps = {
  /** Chemin local ou image statique importée. */
  src: ImageProps["src"];

  /** Texte alternatif obligatoire pour l'accessibilité. */
  alt: string;

  /** Variante de la forme du cadre. */
  variant?: WaveImageVariant;

  /** Format de l'image. */
  ratio?: WaveImageRatio;

  /** Couleur principale du contour. */
  borderColor?: "turquoise" | "pink" | "yellow" | "multicolor";

  /** Épaisseur du contour en pixels. */
  borderWidth?: number;

  /** Classes Tailwind supplémentaires. */
  className?: string;

  /** Classes appliquées à l'image. */
  imageClassName?: string;

  /** Tailles responsive pour optimiser le chargement de l'image. */
  sizes?: string;

  /** Affiche l'image en priorité si elle est immédiatement visible. */
  priority?: boolean;

  /** Position du cadrage de l'image. */
  objectPosition?: string;
};

const CLIP_PATHS: Record<WaveImageVariant, string> = {
  soft: `
    M 0.08,0.04
    C 0.20,0.00 0.30,0.07 0.42,0.04
    S 0.68,0.00 0.80,0.04
    S 0.96,0.02 0.96,0.13
    C 1.00,0.26 0.94,0.35 0.97,0.48
    S 1.00,0.72 0.96,0.84
    C 0.94,0.97 0.82,0.96 0.70,0.97
    S 0.43,1.00 0.30,0.97
    S 0.04,1.00 0.04,0.85
    C 0.00,0.72 0.06,0.61 0.03,0.48
    S 0.00,0.22 0.04,0.13
    C 0.04,0.08 0.04,0.05 0.08,0.04
    Z
  `,
  playful: `
    M 0.12,0.03
    C 0.25,0.10 0.30,0.00 0.43,0.04
    S 0.68,0.10 0.80,0.04
    C 0.94,0.00 0.98,0.08 0.96,0.22
    S 0.90,0.43 0.97,0.56
    S 1.00,0.82 0.91,0.91
    C 0.80,1.00 0.68,0.92 0.55,0.97
    S 0.29,1.00 0.18,0.96
    C 0.04,0.98 0.00,0.88 0.04,0.74
    S 0.10,0.48 0.03,0.34
    C 0.00,0.20 0.00,0.07 0.12,0.03
    Z
  `,
  dynamic: `
    M 0.06,0.07
    C 0.18,0.00 0.30,0.10 0.42,0.04
    S 0.69,0.00 0.81,0.06
    C 0.94,0.12 1.00,0.04 0.97,0.20
    S 0.91,0.42 0.97,0.55
    C 1.02,0.71 0.93,0.78 0.96,0.87
    S 0.82,1.00 0.68,0.96
    C 0.54,0.92 0.43,1.02 0.30,0.96
    S 0.03,1.00 0.04,0.82
    C 0.05,0.67 0.00,0.56 0.04,0.43
    S 0.00,0.15 0.06,0.07
    Z
  `,
};

const RATIO_CLASSES: Record<WaveImageRatio, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

const BORDER_COLORS = {
  turquoise: "#25BFC0",
  pink: "#E95D9F",
  yellow: "#F5CB55",
  multicolor: "#25BFC0",
};

export default function WaveImage({
  src,
  alt,
  variant = "soft",
  ratio = "landscape",
  borderColor = "multicolor",
  borderWidth = 3,
  className = "",
  imageClassName = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  objectPosition = "center",
}: WaveImageProps) {
  const reactId = useId();
  // On retire les caractères spéciaux de useId pour construire une URL SVG.
  const clipId = `wave-clip-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const path = CLIP_PATHS[variant];
  const mainColor = BORDER_COLORS[borderColor];
  const strokeWidth = Math.max(0, Math.min(borderWidth, 12));

  return (
    <div
      className={[
        "relative isolate w-full",
        RATIO_CLASSES[ratio],
        className,
      ].join(" ")}
    >
      {/* Définition SVG utilisée pour découper la photo. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0"
        focusable="false"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={path} />
          </clipPath>
        </defs>
      </svg>

      {/* La photo est découpée selon la forme du tracé SVG. */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `url(#${clipId})` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imageClassName}`}
          style={{ objectPosition }}
        />
      </div>

      {/* Contour décoratif : les traits restent indépendants de la photo. */}
      {strokeWidth > 0 && (
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          focusable="false"
        >
          {borderColor === "multicolor" && (
            <>
              <path
                d={path}
                fill="none"
                stroke="#E95D9F"
                strokeWidth={strokeWidth}
                vectorEffect="non-scaling-stroke"
                transform="translate(0.8 0.8)"
              />
              <path
                d={path}
                fill="none"
                stroke="#F5CB55"
                strokeWidth={strokeWidth}
                vectorEffect="non-scaling-stroke"
                transform="translate(0.4 0.4)"
              />
            </>
          )}

          <path
            d={path}
            fill="none"
            stroke={mainColor}
            strokeWidth={strokeWidth}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </div>
  );
}