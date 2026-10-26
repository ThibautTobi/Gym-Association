import Link from "next/link";
import Image from "next/image";

export default function AboutPreview() {
  return (
    <section aria-labelledby="about-title" className="bg-muted py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        {/* Illustration de l'association */}
        <div className="overflow-hidden rounded-2xl">
          <Image
            src="/images/association-pour-tous.webp"
            alt="Présentation des activités sportives proposées par l'association"
            width={1200}
            height={900}
            sizes="(min-width: 1280px) 588px, (min-width: 1024px) calc((100vw - 104px) / 2), calc(100vw - 32px)"
            className="h-auto w-full rounded-2xl object-contain"
          />
        </div>

        {/* Présentation de l'association */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Notre association
          </p>

          <h2
            id="about-title"
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Une association sportive à taille humaine
          </h2>

          <p className="mt-6 leading-7 text-muted-foreground">
            Notre association accompagne les pratiquants dans leur découverte et
            leur progression en cours collectifs et gymnastique, dans un cadre
            convivial, bienveillant et adapté aux différents niveaux.
          </p>

          <Link
            href="/association"
            className="mt-8 inline-flex min-h-11 items-center rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Découvrir l&apos;association
          </Link>
        </div>
      </div>
    </section>
  );
}
