"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Navigation desktop.
 *
 * Ce composant reste côté client uniquement parce qu'il utilise
 * usePathname() pour identifier la page actuellement affichée.
 */
export default function DesktopNav() {
  const pathname = usePathname();

  /**
   * Vérifie si le lien correspond à la page actuelle.
   * Le traitement particulier de "/" évite les faux positifs.
   */
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  /**
   * Centralise les styles des liens pour éviter les répétitions.
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

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/association", label: "L'association" },
    { href: "/activites", label: "Activités" },
    { href: "/horaires", label: "Horaires" },
    { href: "/actualites", label: "Actualités" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className="hidden items-center gap-2 md:flex"
      aria-label="Navigation principale"
    >
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={getLinkClassName(href)}
          aria-current={isActive(href) ? "page" : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
