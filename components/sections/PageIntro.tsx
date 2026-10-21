interface PageIntroProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

/**
 * Introduction réutilisable pour les pages publiques.
 *
 * L'objectif est d'avoir une structure visuelle cohérente
 * sur l'ensemble du site.
 */
export default function PageIntro({
  eyebrow,
  title,
  description,
}: PageIntroProps) {
  return (
    <section
      aria-labelledby="page-title"
      className="border-b bg-muted py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
        )}

        <h1
          id="page-title"
          className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl"
        >
          {title}
        </h1>

        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
