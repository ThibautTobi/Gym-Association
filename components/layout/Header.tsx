import Link from "next/link";
import MobileNav from "@/components/layout/MobileNav";

/**
 * Navigation principale du site.
 *
 * Le composant reste un Server Component :
 * aucune interaction nécessitant JavaScript n'est gérée directement ici.
 */
export default function Header() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / nom de l'association */}
        <Link
          href="/"
          className="font-bold tracking-tight"
          aria-label="Gym'Association - Accueil"
        >
          Gym&apos;Association
        </Link>

        {/* Navigation desktop */}
        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Navigation principale"
        >
          <Link
            href="/"
            className="text-sm font-medium transition-opacity hover:opacity-70"
          >
            Accueil
          </Link>

          <Link
            href="/association"
            className="text-sm font-medium transition-opacity hover:opacity-70"
          >
            L&apos;association
          </Link>

          <Link
            href="/activites"
            className="text-sm font-medium transition-opacity hover:opacity-70"
          >
            Activités
          </Link>

          <Link
            href="/horaires"
            className="text-sm font-medium transition-opacity hover:opacity-70"
          >
            Horaires
          </Link>

          <Link
            href="/actualites"
            className="text-sm font-medium transition-opacity hover:opacity-70"
          >
            Actualités
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium transition-opacity hover:opacity-70"
          >
            Contact
          </Link>

          {/* <Link
            href="/inscription"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            S&apos;inscrire
          </Link> */}
        </nav>

        {/* Navigation mobile */}
        <MobileNav />
      </div>
    </header>
  );
}