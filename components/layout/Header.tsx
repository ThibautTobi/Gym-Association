"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "@/components/layout/MobileNav";

/**
 * Navigation principale du site.
 *
 * Fonctionnalités :
 * - Header fixe lors du défilement.
 * - Effet de transparence et de flou.
 * - Liens utilisant les couleurs du design system.
 * - Lien actif avec fond `primary` et texte `primary-foreground`.
 * - Changement de couleur vers `accent` au survol.
 */
export default function Header() {
  const pathname = usePathname();

  /**
   * Détermine si un lien correspond à la page actuellement affichée.
   *
   * Le cas `/` est traité séparément afin d'éviter que l'accueil
   * soit considéré comme actif sur toutes les pages.
   */
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  /**
   * Classes communes aux liens de navigation.
   */
  const getLinkClassName = (href: string) => {
    const active = isActive(href);

    return [
      "rounded-md px-3 py-2 text-sm font-bold",
      "transition-colors duration-200",
      active
        ? "bg-primary text-primary-foreground"
        : "text-primary hover:text-accent",
    ].join(" ");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 shadow-sm backdrop-blur-md supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / nom de l'association */}
        <Link
          href="/"
          className="font-bold tracking-tight text-primary transition-colors duration-200 hover:text-accent"
          aria-label="Gym Val de Saâne - Accueil"
        >
          Gym Val de Saâne
        </Link>

        {/* Navigation desktop */}
        <nav
          className="hidden items-center gap-2 md:flex"
          aria-label="Navigation principale"
        >
          <Link
            href="/"
            className={getLinkClassName("/")}
            aria-current={isActive("/") ? "page" : undefined}
          >
            Accueil
          </Link>

          <Link
            href="/association"
            className={getLinkClassName("/association")}
            aria-current={isActive("/association") ? "page" : undefined}
          >
            L&apos;association
          </Link>

          <Link
            href="/activites"
            className={getLinkClassName("/activites")}
            aria-current={isActive("/activites") ? "page" : undefined}
          >
            Activités
          </Link>

          <Link
            href="/horaires"
            className={getLinkClassName("/horaires")}
            aria-current={isActive("/horaires") ? "page" : undefined}
          >
            Horaires
          </Link>

          <Link
            href="/actualites"
            className={getLinkClassName("/actualites")}
            aria-current={isActive("/actualites") ? "page" : undefined}
          >
            Actualités
          </Link>

          <Link
            href="/contact"
            className={getLinkClassName("/contact")}
            aria-current={isActive("/contact") ? "page" : undefined}
          >
            Contact
          </Link>
        </nav>

        {/* Navigation mobile */}
        <MobileNav />
      </div>
    </header>
  );
}
