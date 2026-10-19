import Link from "next/link";

/**
 * Page 404 - Page introuvable.
 *
 * Cette page est automatiquement utilisée par Next.js
 * lorsqu'une route demandée n'existe pas.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <section
        aria-labelledby="not-found-title"
        className="w-full max-w-2xl rounded-xl border bg-card p-8 text-center shadow-sm sm:p-12"
      >
        {/* Code d'erreur */}
        <p
          aria-hidden="true"
          className="text-7xl font-bold tracking-tight text-primary sm:text-8xl"
        >
          404
        </p>

        {/* Titre principal */}
        <h1
          id="not-found-title"
          className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Page introuvable
        </h1>

        {/* Message explicatif */}
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Désolé, la page que vous recherchez n&apos;existe pas ou n&apos;est
          plus disponible.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Retour à l&apos;accueil
          </Link>

          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-md border px-5 py-3 font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </main>
  );
}
