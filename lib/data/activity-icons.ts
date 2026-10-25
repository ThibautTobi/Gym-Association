import {
  Activity,
  Brain,
  CalendarCheck,
  CheckCircle2,
  Compass,
  Dumbbell,
  Flag,
  Flame,
  Footprints,
  Gauge,
  HeartPulse,
  Music,
  PersonStanding,
  Scale,
  Smile,
  Target,
  TrendingUp,
  Wind,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Associe des mots-clés à une icône.
 * Le PREMIER mot-clé trouvé gagne : l'ordre compte
 * (ex. "posture" avant "amélioration").
 */
const BENEFIT_ICONS: Array<[keywords: string[], icon: LucideIcon]> = [
  [["motricite"], Footprints],
  [["equilibre"], Scale],
  [["posture", "souplesse"], PersonStanding],
  [["cardio", "endurance"], HeartPulse],
  [["muscul", "force"], Dumbbell],
  [["rythme"], Music],
  [["memorisation"], Brain],
  [["humeur", "convivial"], Smile],
  [["dynamisme"], Zap],
  [["concentration", "respiration"], Wind],
  [["decouverte"], Compass],
  [["coordination", "precision"], Target],
  [["intensite"], Gauge],
  [["condition physique"], Activity],
  [["suivi"], Flame],
  [["objectif"], Flag],
  [["plan d'entrainement"], CalendarCheck],
  [["motivation"], Flame],
  [["amelioration"], TrendingUp],
];

/** Retire les accents et met en minuscules pour comparer sans erreur. */
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/** Retourne l'icône d'un bénéfice (coche par défaut). */
export function getBenefitIcon(benefit: string): LucideIcon {
  const text = normalize(benefit);

  const match = BENEFIT_ICONS.find(([keywords]) =>
    keywords.some((keyword) => text.includes(keyword)),
  );

  return match ? match[1] : CheckCircle2;
}
