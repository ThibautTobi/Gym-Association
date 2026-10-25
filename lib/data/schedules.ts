/**
 * Horaires des cours, saison 2026-2027.
 *
 * Source : flyer de l'association (reprise le mercredi 9 septembre 2026).
 * Tous les cours ont lieu le mercredi.
 *
 * Les lignes sont classées par heure de début : l'affichage suit
 * l'ordre de ce tableau.
 */

export type ScheduleItem =
  | {
      type: "course";
      activitySlug: string;
      day: string;
      activity: string;
      ageRange: string;
      time: string;
    }
  | {
      type: "break";
      day: string;
      title: string;
      time: string;
      description?: string;
    };

/**
 * Lieu des cours.
 *
 * Le flyer indique "Dès 2027" pour la salle polyvalente
 * (Place Jehan Povremoyne, 76890 Val de Sâane). Au changement de lieu,
 * il suffira de modifier cette constante :
 *   const LOCATION = "Salle polyvalente";
 *
 * Adresse actuelle : 11 route de la Forge, 76890 St Pierre Bénouville.
 */

export const schedules: ScheduleItem[] = [
  {
    type: "course",
    day: "Mercredi",
    activity: "Baby Gym",
    activitySlug: "baby-gym",
    ageRange: "Dès 18 mois",
    time: "10 h – 10 h 45",
  },
  {
    type: "course",
    day: "Mercredi",
    activity: "Gym artistique découverte",
    activitySlug: "gymnastique-artistique",
    ageRange: "Dès 5 ans (1re année)",
    time: "10 h 50 – 11 h 45",
  },
  {
    type: "break",
    day: "Mercredi",
    title: "Pause déjeuner",
    time: "11 h 45 – 14 h",
    description: "Aucun cours programmé sur ce créneau",
  },
  {
    type: "course",
    day: "Mercredi",
    activity: "Marche active",
    activitySlug: "marche",
    ageRange: "Adultes",
    time: "14 h – 14 h 55",
  },
  {
    type: "course",
    day: "Mercredi",
    activity: "Gymnastique – Loisirs",
    activitySlug: "gymnastique-artistique",
    ageRange: "Plus de 6 ans",
    time: "15 h – 15 h 55",
  },
  {
    type: "course",
    day: "Mercredi",
    activity: "Gymnastique Aérobic",
    activitySlug: "gymnastique-aerobic",
    ageRange: "Tous publics",
    time: "16 h – 17 h 50",
  },
  {
    type: "course",
    day: "Mercredi",
    activity: "Gymnastique – Loisirs",
    activitySlug: "gymnastique-artistique",
    ageRange: "Plus de 6 ans",
    time: "17 h 50 – 18 h 45",
  },
  {
    type: "course",
    day: "Mercredi",
    activity: "cardio training",
    activitySlug: "cardio-training",
    ageRange: "Adultes",
    time: "18 h 55 – 19 h 40",
  },
  {
    type: "course",
    day: "Mercredi",
    activity: "Pilates",
    activitySlug: "pilates",
    ageRange: "Adultes",
    time: "19 h 45 – 20 h 30",
  },
];

/** Retourne les horaires d'une activité, ex. "Mercredi 10 h – 10 h 45". */
export function getScheduleTextBySlug(slug: string): string {
  return schedules
    .flatMap((item) =>
      item.type === "course" && item.activitySlug === slug
        ? [`${item.day} ${item.time}`]
        : [],
    )
    .join(" · ");
}
