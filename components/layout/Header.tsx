import Link from "next/link";

import DesktopNav from "@/components/layout/DesktopNav";
import MobileNav from "@/components/layout/MobileNav";

/**
 * Enveloppe du header.
 *
 * Ce composant est désormais un Server Component :
 * il n'a plus besoin de "use client", car il ne gère aucun état
 * et n'utilise aucun hook React côté client.
 *
 * DesktopNav et MobileNav conservent leurs propres besoins client.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 shadow-sm backdrop-blur-md supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo : rendu côté serveur */}
        <Link
          href="/"
          className="font-bold tracking-tight text-primary transition-colors duration-200 hover:text-accent"
          aria-label="Gym Val de Saâne - Accueil"
        >
          Gym Val de Saâne
        </Link>

        {/* Navigation desktop interactive */}
        <DesktopNav />

        {/* Menu mobile interactif */}
        <MobileNav />
      </div>
    </header>
  );
}
