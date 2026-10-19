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
    ageRange: "Dès 18 mois",
    time: "10 h – 10 h 45",
  },
  {
    type: "course",
    day: "Mercredi",
    activity: "Gym artistique découverte",
    ageRange: "Dès 5 ans (1re année)",
    time: "10 h 50 – 11 h 45",
  },
  {
    // À vérifier : le flyer ne mentionne pas de pause, c'est le creux
    // entre 11 h 45 et 14 h. Supprime cet élément si tu ne veux pas l'afficher.
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
    // À vérifier : public non précisé sur le flyer (visuel avec adultes).
    ageRange: "Adultes",
    time: "14 h – 14 h 55",
  },
  {
    type: "course",
    day: "Mercredi",
    activity: "Gymnastique – Loisirs",
    ageRange: "Plus de 6 ans",
    time: "15 h – 15 h 55",
  },
  {
    type: "course",
    day: "Mercredi",
    activity: "Gymnastique Aérobic",
    // À vérifier : public non précisé sur le flyer.
    ageRange: "Tous publics",
    time: "16 h – 17 h 50",
  },
  {
    type: "course",
    day: "Mercredi",
    activity: "Gymnastique – Loisirs",
    ageRange: "Plus de 6 ans",
    time: "17 h 50 – 18 h 45",
  },
  {
    type: "course",
    day: "Mercredi",
    activity: "cardio training",
    // À vérifier : public non précisé sur le flyer.
    ageRange: "Adultes",
    time: "18 h 55 – 19 h 40",
  },
  {
    type: "course",
    day: "Mercredi",
    activity: "Pilates",
    // À vérifier : public non précisé sur le flyer.
    ageRange: "Adultes",
    time: "19 h 45 – 20 h 30",
  },
];
