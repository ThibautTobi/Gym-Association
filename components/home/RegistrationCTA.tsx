import Link from "next/link";

export default function RegistrationCTA() {
  return (
    <section aria-labelledby="registration-title" className="py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="registration-title"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Envie de nous rejoindre ?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Découvrez nos créneaux, nos tarifs et les modalités d inscription à l
          association.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/essai"
            className="mt-8 inline-flex min-h-11 items-center rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
          >
            Séance d&apos;essai gratuite
          </Link>

          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-11 items-center rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
          >
            Renseignements
          </Link>
        </div>
      </div>
    </section>
  );
}
