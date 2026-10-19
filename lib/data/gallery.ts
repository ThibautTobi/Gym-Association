/**
 * Représente une image de la galerie.
 *
 * Les chemins seront remplacés par les véritables photos
 * fournies par l'association.
 */
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
}

/**
 * Galerie de démonstration.
 *
 * Les images seront ajoutées dans /public/images/gallery/.
 */
export const galleryImages: GalleryImage[] = [
  // {
  //   id: "entrainement-01",
  //   src: "/images/gallery/entrainement-01.jpg",
  //   alt: "Séance de gymnastique dans le gymnase",
  //   title: "Séance d'entraînement",
  // },
  // {
  //   id: "entrainement-02",
  //   src: "/images/gallery/entrainement-02.jpg",
  //   alt: "Gymnaste réalisant un exercice",
  //   title: "Entraînement",
  // },
  // {
  //   id: "competition-01",
  //   src: "/images/gallery/competition-01.jpg",
  //   alt: "Gymnastes réunis lors d'une compétition",
  //   title: "Compétition",
  // },
];
