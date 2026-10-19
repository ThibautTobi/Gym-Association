/**
 * Représente un événement organisé par l'association.
 */
export interface EventItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

export const events: EventItem[] = [
  // {
  //   slug: "journee-portes-ouvertes",
  //   title: "Journée portes ouvertes",
  //   description:
  //     "Une journée pour découvrir l'association, rencontrer les encadrants et découvrir nos activités.",
  //   date: "2026-09-26",
  //   location: "Gymnase principal",
  // },
];

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((event) => event.slug === slug);
}
