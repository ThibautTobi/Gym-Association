import Link from "next/link";

/**
 * Footer global du site.
 *
 * Le composant est volontairement simple et reste un
 * Server Component.
 */
export default function Footer() {
  return (
    <footer className="border-t bg-muted">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Présentation */}
        <div>
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-primary transition-colors hover:text-accent"
            aria-label="Gym Val de Saâne - Accueil"
          >
            Gym Val de Saâne
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Une association sportive de collectifs et spécialisée dans la
            pratique de la gymnastique pour enfants, adolescents et adultes.
          </p>
        </div>

        {/* Association */}
        <div>
          <h2 className="text-sm font-semibold">L&apos;association</h2>

          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link
                href="/association"
                className="text-primary transition-colors hover:text-accent"
              >
                Qui sommes-nous ?
              </Link>
            </li>

            <li>
              <Link
                href="/association/equipe"
                className="text-primary transition-colors hover:text-accent"
              >
                Notre équipe
              </Link>
            </li>

            <li>
              <Link
                href="/association/valeurs"
                className="text-primary transition-colors hover:text-accent"
              >
                Nos valeurs
              </Link>
            </li>
          </ul>
        </div>

        {/* Activités */}
        <div>
          <h2 className="text-sm font-semibold">Pratique sportive</h2>

          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link
                href="/activites"
                className="text-primary transition-colors hover:text-accent"
              >
                Nos activités
              </Link>
            </li>

            <li>
              <Link
                href="/horaires"
                className="text-primary transition-colors hover:text-accent"
              >
                Horaires &amp; tarifs
              </Link>
            </li>

            {/* <li>
              <Link
                href="/inscription"
                className="text-primary transition-colors hover:text-accent"
              >
                Inscription
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-sm font-semibold">Contact</h2>

          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link
                href="/contact"
                className="text-primary transition-colors hover:text-accent"
              >
                Nous contacter
              </Link>
            </li>

            <li>
              <a
                href="mailto:gymnastique.vds@gmail.com"
                className="text-primary transition-colors hover:text-accent"
              >
                gymnastique.vds@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} Gym&apos;Association. Tous droits
            réservés.
          </p>
          {/* 
          <div className="flex gap-4">
            <Link
              href="/mentions-legales"
              className="text-primary transition-colors hover:text-accent"
            >
              Mentions légales
            </Link>

            <Link
              href="/confidentialite"
              className="text-primary transition-colors hover:text-accent"
            >
              Confidentialité
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
