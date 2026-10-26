/**
 * Représente une activité proposée par l'association.
 *
 * Emplacement : lib/data/activities.ts
 *
 * Cette interface sert aujourd'hui pour les données statiques.
 * Plus tard, la structure pourra être alimentée par Prisma/PostgreSQL
 * sans modifier les composants qui affichent les activités.
 */
export interface Activity {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  ageRange: string;
  level: string;
  benefits: string[];
  image: {
    /** Chemin à partir de `public/` : "/images/baby-gym.png" */
    src: string;
    /** Description pour les lecteurs d'écran. */
    alt: string;
  };
  lien?: string;
  titreLien?: string;
}

/**
 * Liste des activités proposées par l'association, saison 2026-2027.
 *
 * Source UNIQUE de vérité : la page d'accueil, la liste des activités et
 * les pages de détail lisent toutes ce tableau. Pour ajouter une
 * activité, il suffit d'ajouter un objet ici (et son image dans
 * `public/images/`).
 *
 * Les âges et intitulés viennent du flyer de la saison. Les champs
 * marqués "À vérifier" ne figurent pas sur le flyer : corrige-les si
 * besoin. Les horaires sont dans lib/data/schedules.ts.
 */
export const activities: Activity[] = [
  {
    slug: "baby-gym",
    title: "Baby Gym",
    shortDescription:
      "Une première découverte de la motricité et de la gymnastique dans un environnement ludique.",
    description:
      "La Baby Gym permet aux plus jeunes, dès 18 mois, de développer leur motricité, leur coordination et leur équilibre grâce à des parcours et des exercices adaptés à leur âge.",
    ageRange: "Dès 18 mois",
    level: "Débutant",
    benefits: [
      "Développement de la motricité",
      "Travail de l'équilibre",
      "Coordination des mouvements",
      "Découverte de l'activité physique",
    ],
    image: {
      src: "/images/baby-gym.webp",
      alt: "Jeunes enfants jouant sur des modules de motricité en salle",
    },
  },
  {
    slug: "gymnastique-artistique",
    title: "Gymnastique artistique",
    shortDescription:
      "Découvrir la gymnastique artistique, puis progresser à son rythme en loisir.",
    description:
      "La gymnastique artistique propose un travail technique autour des différents agrès. Un groupe découverte accueille les enfants dès 5 ans pour leur première année, puis les séances loisirs s'adressent aux plus de 6 ans. Les pratiquants développent progressivement force, souplesse, coordination et maîtrise corporelle.",
    ageRange: "Dès 5 ans (découverte), plus de 6 ans (loisirs)",
    level: "Découverte et loisirs",
    benefits: [
      "Découverte des agrès",
      "Développement de la force",
      "Souplesse",
      "Coordination et précision",
    ],
    image: {
      src: "/images/gymnastique-loisir.webp",
      alt: "Groupe de gymnastes pratiquant sur des tapis",
    },
  },
  {
    slug: "gymnastique-aerobic",
    title: "Aérobic sportive",
    shortDescription:
      "Des enchaînements dynamiques en musique pour travailler la coordination, le rythme et l'endurance.",
    description:
      "L'aérobic sportive associe mouvements gymniques, pas dynamiques et musique. Les séances développent la coordination, le sens du rythme et l'endurance, dans une ambiance énergique.",
    ageRange: "Tous publics",
    level: "Tous niveaux",
    benefits: [
      "Coordination et sens du rythme",
      "Endurance cardiovasculaire",
      "Mémorisation d'enchaînements",
      "Dynamisme et bonne humeur",
    ],
    image: {
      src: "/images/gymnastique-aerobic.webp",
      alt: "Gymnaste réalisant un exercice d'aérobic",
    },
  },
  {
    slug: "marche",
    title: "Marche active",
    shortDescription: "Une séance qui associe marche active.",
    description:
      "Cette séance associe marche active. Ouverte à tous les niveaux, elle vise à améliorer l'endurance cardiovasculaire et la condition physique dans une ambiance conviviale.",
    ageRange: "Adultes",
    level: "Tous niveaux",
    benefits: [
      "Endurance cardiovasculaire",
      "Renforcement musculaire",
      "Condition physique",
      "Moment convivial",
    ],
    image: {
      src: "/images/marche.webp",
      alt: "Séance de marche active",
    },
  },
  {
    slug: "pilates",
    title: "Pilates",
    shortDescription:
      "Un travail en douceur pour renforcer les muscles profonds et améliorer la posture.",
    description:
      "Le cours de pilates s'adresse à tous les niveaux. Il propose des exercices contrôlés qui renforcent les muscles profonds et améliorent la posture, la souplesse et la respiration.",
    ageRange: "Adultes",
    level: "Tous niveaux",
    benefits: [
      "Renforcement des muscles profonds",
      "Amélioration de la posture",
      "Souplesse",
      "Concentration et respiration",
    ],
    image: {
      src: "/images/pilates.webp",
      alt: "Personne pratiquant le pilates sur un tapis",
    },
  },
  {
    slug: "cardio-training",
    title: "cardio training",
    shortDescription:
      "Une séance dynamique pour travailler le cardio, l'endurance et la condition physique.",
    description:
      "Le body cardio training propose des exercices variés et dynamiques pour améliorer l'endurance, la force et la condition physique générale. Chacun adapte l'intensité à son niveau.",
    ageRange: "Adultes",
    level: "Tous niveaux",
    benefits: [
      "Travail cardio-respiratoire",
      "Renforcement musculaire",
      "Condition physique générale",
      "Intensité adaptable à chacun",
    ],
    image: {
      src: "/images/circuit-training.webp",
      alt: "Participants réalisant des exercices de cardio training",
    },
  },
  {
    slug: "coaching",
    title: "coaching",
    shortDescription:
      "Une séance personnalisée pour répondre à vos besoins et objectifs.",
    description:
      "Le coaching personnalisé permet un suivi et des exercices adaptés à votre objectifs et votre niveaux.",
    ageRange: "Adultes",
    level: "Tous niveaux",
    benefits: [
      "Intensité adaptable à chacun",
      "Suivi personnalisé",
      "Objectifs adaptés à vos besoins",
      "Plan d'entraînement sur mesure",
      "Motivation et accompagnement",
      "Amélioration de la condition physique",
    ],
    image: {
      src: "/images/LTcoaching.webp",
      alt: "Participants réalisant des exercices de coaching",
    },
    lien: "https://lt-coaching.vercel.app/",
    titreLien: "LT Coaching",
  },
];

/**
 * Recherche une activité à partir de son slug.
 */
export function getActivityBySlug(slug: string): Activity | undefined {
  return activities.find((activity) => activity.slug === slug);
}
