"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

/**
 * Navigation mobile.
 *
 * Ce composant est client car :
 * - l'ouverture / fermeture du menu utilise un état React ;
 * - usePathname() permet d'identifier la page actuellement active.
 */
export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  /**
   * Ferme le menu après avoir sélectionné une page.
   */
  const closeMenu = () => {
    setIsOpen(false);
  };

  /**
   * Détermine si un lien correspond à la page actuelle.
   *
   * La page d'accueil nécessite un traitement particulier afin
   * d'éviter que "/" soit considéré comme actif sur toutes les pages.
   */
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  /**
   * Classes communes aux liens de navigation.
   *
   * États :
   * - Normal : texte primary
   * - Hover : texte accent
   * - Active : fond primary + texte blanc
   * - Focus clavier : fond primary + texte blanc
   */
  const getNavigationLinkClasses = (href: string) => {
    const active = isActive(href);

    return [
      "rounded-md px-4 py-3 font-medium transition-colors",
      active ? "bg-primary text-white" : "text-primary hover:text-accent",
      "focus-visible:bg-primary focus-visible:text-white",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    ].join(" ");
  };

  return (
    <div className="md:hidden">
      {/* Bouton d'ouverture / fermeture du menu */}
      <button
        type="button"
        onClick={() => setIsOpen((currentState) => !currentState)}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border p-2 text-primary transition-colors hover:text-accent focus-visible:bg-primary focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span aria-hidden="true" className="text-xl">
          {isOpen ? "×" : "☰"}
        </span>
      </button>

      {/* Navigation mobile */}
      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navigation mobile"
          className="absolute left-0 right-0 top-16 z-50 border-b bg-background p-4 shadow-md"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {/* Accueil */}
            <Link
              href="/"
              onClick={closeMenu}
              aria-current={isActive("/") ? "page" : undefined}
              className={getNavigationLinkClasses("/")}
            >
              Accueil
            </Link>

            {/* Association */}
            <Link
              href="/association"
              onClick={closeMenu}
              aria-current={isActive("/association") ? "page" : undefined}
              className={getNavigationLinkClasses("/association")}
            >
              L&apos;association
            </Link>

            {/* Activités */}
            <Link
              href="/activites"
              onClick={closeMenu}
              aria-current={isActive("/activites") ? "page" : undefined}
              className={getNavigationLinkClasses("/activites")}
            >
              Activités
            </Link>

            {/* Horaires */}
            <Link
              href="/horaires"
              onClick={closeMenu}
              aria-current={isActive("/horaires") ? "page" : undefined}
              className={getNavigationLinkClasses("/horaires")}
            >
              Horaires
            </Link>

            {/* Actualités */}
            <Link
              href="/actualites"
              onClick={closeMenu}
              aria-current={isActive("/actualites") ? "page" : undefined}
              className={getNavigationLinkClasses("/actualites")}
            >
              Actualités
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              onClick={closeMenu}
              aria-current={isActive("/contact") ? "page" : undefined}
              className={getNavigationLinkClasses("/contact")}
            >
              Contact
            </Link>

            {/* CTA : séance d'essai */}
            <Link
              href="/inscription"
              onClick={closeMenu}
              aria-current={isActive("/inscription") ? "page" : undefined}
              className={[
                "mt-2 inline-flex min-h-11 items-center justify-center rounded-md",
                "px-4 py-3 text-center font-semibold transition-colors",
                isActive("/inscription")
                  ? "bg-primary text-white"
                  : "bg-primary text-primary-foreground hover:bg-primary/90",
                "focus-visible:bg-primary focus-visible:text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              ].join(" ")}
            >
              Séance d&apos;essai gratuite
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
