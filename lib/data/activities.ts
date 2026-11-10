/**
 * Données centralisées des activités de Gymnastique Val de Saâne.
 *
 * Ce fichier sert de source unique pour :
 * - La présentation des activités sur la page d'accueil.
 * - La liste complète des activités.
 * - Les pages détaillées /activites/[slug].
 *
 * IMPORTANT :
 * - Les horaires sont centralisés dans lib/data/schedules.ts.
 * - Les lieux et les saisons sont centralisés dans lib/site.ts.
 * - Les images doivent être présentes dans public/images/.
 */

/**
 * Structure d'une activité.
 */
export interface Activity {
  /** Identifiant utilisé dans les URL : /activites/[slug] */
  slug: string;

  /** Nom affiché de l'activité */
  title: string;

  /** Description courte utilisée dans les cartes */
  shortDescription: string;

  /** Description détaillée utilisée sur la page de l'activité */
  description: string;

  /** Public ou tranche d'âge concernée */
  ageRange: string;

  /** Niveau ou type de pratique */
  level: string;

  /** Liste des bénéfices de l'activité */
  benefits: string[];

  /** Image illustrative de l'activité */
  image: {
    /** Chemin de l'image depuis le dossier public */
    src: string;

    /** Description accessible de l'image */
    alt: string;
  };

  /**
   * Lien externe facultatif.
   * À utiliser uniquement lorsqu'une activité renvoie vers un service externe.
   */
  lien?: string;

  /** Texte affiché sur le lien externe */
  titreLien?: string;

  /** Indique si le service est proposé par un organisme externe */
  isExternal?: boolean;
}

/**
 * Liste des activités proposées ou présentées par l'association.
 *
 * Pour ajouter une activité :
 * 1. Ajouter un objet dans ce tableau.
 * 2. Créer son image dans public/images/.
 * 3. Ajouter ses horaires dans schedules.ts si nécessaire.
 * 4. Vérifier que son slug est unique.
 */
export const activities: Activity[] = [
  // --------------------------------------------------
  // 1. BABY GYM
  // --------------------------------------------------
  {
    slug: "baby-gym",
    title: "Baby Gym",

    shortDescription:
      "Une activité ludique pour accompagner les tout-petits dans leurs premières découvertes motrices.",

    description:
      "La Baby Gym permet aux jeunes enfants de découvrir le mouvement et leur environnement à travers des parcours et des jeux adaptés. Les séances favorisent le développement de la motricité, de l'équilibre et de la coordination, tout en encourageant l'autonomie et la confiance en soi.",

    ageRange: "Dès 18 mois",

    level: "Débutant",

    benefits: [
      "Développer la motricité globale",
      "Améliorer l'équilibre et la coordination",
      "Découvrir son corps et ses capacités",
      "Favoriser l'autonomie et la confiance en soi",
      "Apprendre en s'amusant",
    ],

    image: {
      src: "/images/baby-gym.webp",
      alt: "Jeunes enfants participant à une séance de Baby Gym sur un parcours de motricité.",
    },
  },

  // --------------------------------------------------
  // 2. GYMNASTIQUE ARTISTIQUE
  // --------------------------------------------------
  {
    slug: "gymnastique-artistique",
    title: "Gymnastique artistique",

    shortDescription:
      "Découvrir les bases de la gymnastique et progresser à son rythme grâce à des exercices adaptés.",

    description:
      "La gymnastique artistique permet de développer la souplesse, l'équilibre, la coordination et la maîtrise du corps. Les premières séances sont consacrées à la découverte des mouvements et des fondamentaux de la gymnastique. Les séances loisirs s'adressent ensuite aux enfants de plus de 6 ans souhaitant pratiquer une activité sportive dans un cadre ludique et adapté à leur niveau.",

    ageRange: "Dès 5 ans",

    level: "Découverte et loisirs",

    benefits: [
      "Développer la souplesse et la mobilité",
      "Améliorer l'équilibre et la coordination",
      "Renforcer les muscles",
      "Apprendre les mouvements fondamentaux",
      "Développer la confiance en soi",
      "Progresser à son rythme",
    ],

    image: {
      src: "/images/gymnastique-loisir.webp",
      alt: "Enfant réalisant un exercice de gymnastique artistique sur un tapis.",
    },
  },

  // --------------------------------------------------
  // 3. GYMNASTIQUE AÉROBIC
  // --------------------------------------------------
  {
    slug: "gymnastique-aerobic",
    title: "Gymnastique aérobic",

    shortDescription:
      "Une discipline dynamique associant mouvements gymniques, coordination, rythme et endurance.",

    description:
      "La gymnastique aérobic est une discipline sportive qui associe des mouvements gymniques, des enchaînements dynamiques et un travail sur le rythme. Elle permet de développer l'endurance, la coordination, la tonicité et la maîtrise des mouvements. Les séances permettent de progresser individuellement et collectivement dans une ambiance sportive et motivante.",

    ageRange: "Tous publics",

    level: "Selon les capacités et la progression",

    benefits: [
      "Améliorer l'endurance cardiovasculaire",
      "Développer la coordination",
      "Renforcer la tonicité musculaire",
      "Travailler le rythme et la précision",
      "Améliorer la condition physique",
      "Développer l'esprit d'équipe",
    ],

    image: {
      src: "/images/gymnastique-aerobic.webp",
      alt: "Pratique de la gymnastique aérobic avec des mouvements dynamiques et chorégraphiés.",
    },
  },

  // --------------------------------------------------
  // 4. MARCHE ACTIVE
  // --------------------------------------------------
  {
    slug: "marche",
    title: "Marche active",

    shortDescription:
      "Une activité accessible pour entretenir sa condition physique tout en profitant de la marche.",

    description:
      "La marche active est une activité physique qui consiste à marcher à un rythme soutenu et régulier. Elle permet d'entretenir son endurance, de solliciter les muscles et de prendre soin de sa condition physique. Pratiquée en groupe, elle offre également un moment de partage et de convivialité.",

    ageRange: "Adultes",

    level: "Accessible à tous",

    benefits: [
      "Entretenir sa condition physique",
      "Améliorer l'endurance",
      "Stimuler le système cardiovasculaire",
      "Renforcer les muscles des jambes",
      "Profiter d'une activité en plein air",
      "Partager un moment convivial",
    ],

    image: {
      src: "/images/marche.webp",
      alt: "Groupe de personnes pratiquant la marche active en extérieur.",
    },
  },

  // --------------------------------------------------
  // 5. PILATES
  // --------------------------------------------------
  {
    slug: "pilates",
    title: "Pilates",

    shortDescription:
      "Une méthode douce pour renforcer les muscles profonds, améliorer la posture et travailler la respiration.",

    description:
      "Le Pilates est une méthode de renforcement musculaire qui repose sur des mouvements contrôlés, la respiration et la concentration. Les exercices sollicitent particulièrement les muscles profonds afin d'améliorer la posture, la stabilité et la mobilité du corps. Cette pratique permet de travailler à son rythme et de développer une meilleure conscience corporelle.",

    ageRange: "Adultes",

    level: "Accessible à tous",

    benefits: [
      "Renforcer les muscles profonds",
      "Améliorer la posture",
      "Développer la stabilité et l'équilibre",
      "Travailler la respiration",
      "Améliorer la mobilité et la souplesse",
      "Mieux contrôler ses mouvements",
    ],

    image: {
      src: "/images/pilates.webp",
      alt: "Personne réalisant un exercice de Pilates sur un tapis.",
    },
  },

  // --------------------------------------------------
  // 6. CARDIO-TRAINING
  // --------------------------------------------------
  {
    slug: "cardio-training",
    title: "Cardio-training",

    shortDescription:
      "Une séance dynamique pour améliorer son endurance et entretenir sa condition physique.",

    description:
      "Le cardio-training regroupe des exercices physiques destinés à solliciter le système cardiovasculaire et à améliorer l'endurance. Les séances permettent de travailler la condition physique générale, la coordination et la tonicité musculaire. Chacun peut adapter son effort en fonction de ses capacités et de sa progression.",

    ageRange: "Adultes",

    level: "Adaptable selon les capacités",

    benefits: [
      "Améliorer l'endurance cardiovasculaire",
      "Entretenir sa condition physique",
      "Développer la tonicité musculaire",
      "Améliorer la coordination",
      "Travailler à son rythme",
      "Entretenir sa forme au quotidien",
    ],

    image: {
      src: "/images/circuit-training.webp",
      alt: "Séance de cardio-training avec des exercices de remise en forme.",
    },
  },

  // --------------------------------------------------
  // 7. COACHING PERSONNALISÉ
  // --------------------------------------------------
  {
    slug: "coaching",
    title: "Coaching personnalisé",

    shortDescription:
      "Un accompagnement sportif personnalisé pour travailler ses objectifs et progresser à son rythme.",

    description:
      "Le coaching personnalisé est présenté en complément des activités de l'association. Il permet de découvrir un accompagnement sportif adapté aux objectifs, aux besoins et au niveau de chacun. Pour obtenir davantage d'informations sur les prestations proposées, consultez le site de LT Coaching.",

    ageRange: "Selon les prestations proposées",

    level: "Accompagnement personnalisé",

    benefits: [
      "Bénéficier d'un accompagnement individualisé",
      "Définir des objectifs adaptés",
      "Disposer d'un suivi personnalisé",
      "Progresser à son rythme",
    ],

    image: {
      src: "/images/LTcoaching.webp",
      alt: "Illustration de l'activité de coaching sportif personnalisé LT Coaching.",
    },

    lien: "https://lt-coaching.vercel.app/",

    titreLien: "Découvrir LT Coaching",

    isExternal: true,
  },
];

/**
 * Recherche une activité à partir de son slug.
 *
 * Exemple :
 * getActivityBySlug("baby-gym")
 *
 * @param slug Identifiant de l'activité
 * @returns L'activité correspondante ou undefined
 */
export function getActivityBySlug(slug: string): Activity | undefined {
  return activities.find((activity) => activity.slug === slug);
}
