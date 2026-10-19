import Image from "next/image";
import Link from "next/link";

/**
 * Import STATIQUE de l'image (au lieu d'un chemin en texte).
 *
 * Avantages :
 * - Next.js lit les vraies dimensions du fichier : plus besoin de deviner
 *   width/height, donc pas de décalage de mise en page au chargement ;
 * - le flou de chargement (placeholder="blur") est généré automatiquement ;
 * - si le fichier est absent ou renommé, `npm run build` échoue
 *   immédiatement au lieu d'afficher une image cassée en ligne.
 *
 * Le fichier doit se nommer SANS accent : presentation-cours.png
 * (les accents dans un nom de fichier posent des problèmes selon les
 * systèmes : Windows en local, Linux chez l'hébergeur).
 */
import presentationCours from "@/public/images/présentation-cours.png";

/**
 * Section principale de la page d'accueil.
 *
 * Emplacement : components/home/Hero.tsx (adapte au dossier actuel)
 *
 * Objectif :
 * présenter immédiatement l'association et orienter
 * l'utilisateur vers les activités ou l'inscription.
 */
export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-primary"
    >
      <div className="mx-auto grid min-h-130 max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
        {/* Contenu textuel */}
        <div className="max-w-2xl">
          <p className="mb-4 text-m font-bold uppercase tracking-[0.2em] text-accent">
            Association sportive
          </p>

          <h1
            id="hero-title"
            className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl"
          >
            Bougez. Progressez. Partagez.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-primary-foreground/90">
            Découvrez les cours collectifs et la gymnastique dans un
            environnement convivial, accessible et adapté à tous les niveaux.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/activites"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-6 py-3 font-semibold text-secondary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            >
              Découvrir nos activités
            </Link>

            <Link
              href="/essai"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-primary-foreground/40 px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
            >
              Séance d&apos;essai gratuite
            </Link>
          </div>
        </div>

        {/* Illustration de présentation des cours (visible dès 1024 px) */}
        <div className="hidden lg:block">
          {/*
            Pas de `priority` : depuis Next.js 16, cette propriété est
            dépréciée (remplacée par `preload`). Et ici, l'image est
            masquée sur mobile : la précharger ferait télécharger un
            fichier inutile aux visiteurs sur téléphone.

            Si un test Lighthouse sur ordinateur montre que cette image
            est le "Largest Contentful Paint" et qu'elle arrive tard,
            ajoute alors la propriété `preload` ci-dessous.
          */}
          <Image
            src={presentationCours}
            alt="Présentation des activités sportives proposées par l'association"
            placeholder="blur"
            sizes="50vw"
            className="h-auto w-full rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}
