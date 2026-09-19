"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Navigation mobile.
 *
 * Ce composant est client car l'ouverture et la fermeture
 * du menu dépendent d'un état React.
 */
export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Bouton d'ouverture / fermeture */}
      <button
        type="button"
        onClick={() => setIsOpen((currentState) => !currentState)}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span aria-hidden="true" className="text-xl">
          {isOpen ? "×" : "☰"}
        </span>
      </button>

      {/* Menu */}
      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navigation mobile"
          className="absolute left-0 right-0 top-16 z-50 border-b bg-background p-4 shadow-md"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-md px-4 py-3 font-medium hover:bg-muted"
            >
              Accueil
            </Link>

            <Link
              href="/association"
              onClick={closeMenu}
              className="rounded-md px-4 py-3 font-medium hover:bg-muted"
            >
              L&apos;association
            </Link>

            <Link
              href="/activites"
              onClick={closeMenu}
              className="rounded-md px-4 py-3 font-medium hover:bg-muted"
            >
              Activités
            </Link>

            <Link
              href="/horaires"
              onClick={closeMenu}
              className="rounded-md px-4 py-3 font-medium hover:bg-muted"
            >
              Horaires
            </Link>

            <Link
              href="/actualites"
              onClick={closeMenu}
              className="rounded-md px-4 py-3 font-medium hover:bg-muted"
            >
              Actualités
            </Link>

            <Link
              href="/contact"
              onClick={closeMenu}
              className="rounded-md px-4 py-3 font-medium hover:bg-muted"
            >
              Contact
            </Link>

            <Link
              href="/inscription"
              onClick={closeMenu}
              className="mt-2 rounded-md bg-primary px-4 py-3 text-center font-medium text-primary-foreground"
            >
              S&apos;inscrire
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}