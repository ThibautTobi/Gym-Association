// import Link from "next/link";

// /**
//  * Footer global du site.
//  *
//  * Le composant reste un Server Component.
//  * Les vagues décoratives sont gérées par WaveSeparator.
//  */
// export default function Footer() {
//   return (
//     <div className="w-full">
//         {/* Footer */}
//         <footer className="border-t bg-primary">
//           <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
//             {/* Présentation */}
//             <div>
//               <Link
//                 href="/"
//                 className="text-lg font-bold tracking-tight text-white transition-colors hover:text-accent"
//                 aria-label="Gym Val de Saâne - Accueil"
//               >
//                 Gym Val de Saâne
//               </Link>

//               <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
//                 Une association sportive collective spécialisée dans la
//                 pratique de la gymnastique pour enfants, adolescents et adultes.
//               </p>
//             </div>

//             {/* Association */}
//             <div>
//               <h2 className="text-sm font-semibold">
//                 L&apos;association
//               </h2>

//               <ul className="mt-4 space-y-3 text-sm">
//                 <li>
//                   <Link
//                     href="/association"
//                     className="text-primary transition-colors hover:text-accent"
//                   >
//                     Qui sommes-nous ?
//                   </Link>
//                 </li>

//                 <li>
//                   <Link
//                     href="/association/equipe"
//                     className="text-primary transition-colors hover:text-accent"
//                   >
//                     Notre équipe
//                   </Link>
//                 </li>

//                 <li>
//                   <Link
//                     href="/association/valeurs"
//                     className="text-primary transition-colors hover:text-accent"
//                   >
//                     Nos valeurs
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Activités */}
//             <div>
//               <h2 className="text-sm font-semibold">
//                 Pratique sportive
//               </h2>

//               <ul className="mt-4 space-y-3 text-sm">
//                 <li>
//                   <Link
//                     href="/activites"
//                     className="text-primary transition-colors hover:text-accent"
//                   >
//                     Nos activités
//                   </Link>
//                 </li>

//                 <li>
//                   <Link
//                     href="/horaires"
//                     className="text-primary transition-colors hover:text-accent"
//                   >
//                     Horaires &amp; tarifs
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Contact */}
//             <div>
//               <h2 className="text-sm font-semibold">Contact</h2>

//               <ul className="mt-4 space-y-3 text-sm">
//                 <li>
//                   <Link
//                     href="/contact"
//                     className="text-primary transition-colors hover:text-accent"
//                   >
//                     Nous contacter
//                   </Link>
//                 </li>

//                 <li>
//                   <a
//                     href="mailto:gymnastique.vds@gmail.com"
//                     className="wrap-break-word text-primary transition-colors hover:text-accent"
//                   >
//                     gymnastique.vds@gmail.com
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Copyright */}
//           <div className="border-t">
//             <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
//               <p>
//                 © {new Date().getFullYear()} Gym&apos;Association.
//                 Tous droits réservés.
//               </p>

//               {/*
//               À réactiver lorsque ces pages seront prêtes.

//               <div className="flex gap-4">
//                 <Link
//                   href="/mentions-legales"
//                   className="text-primary transition-colors hover:text-accent"
//                 >
//                   Mentions légales
//                 </Link>

//                 <Link
//                   href="/confidentialite"
//                   className="text-primary transition-colors hover:text-accent"
//                 >
//                   Confidentialité
//                 </Link>
//               </div>
//               */}
//             </div>
//           </div>
//         </footer>
//     </div>
//   );
// }


import Link from "next/link";

// import WaveDivider from "@/components/layout/WaveDivider";

/**
 * Footer global du site.
 *
 * Server Component. La vague décorative est gérée par WaveDivider
 * et se fond avec la couleur de fond de la page (text-background).
 */

const linkClass =
  "text-white underline-offset-4 transition-opacity hover:underline focus-visible:underline focus-visible:outline-none";

export default function Footer() {
  return (
    <footer className="relative bg-primary text-white">
      {/* Vague : la partie "page" reprend la couleur de fond du site */}
      {/* <WaveDivider position="top" fillClassName="text-background" /> */}

      {/* Padding haut = hauteur de la vague pour ne pas la chevaucher */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 pt-24 sm:px-6 sm:pt-32 md:grid-cols-2 lg:grid-cols-4 lg:px-8 lg:pt-40">
        {/* Présentation */}
        <div>
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-white underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
            aria-label="Gym Val de Saâne - Accueil"
          >
            Gym Val de Saâne
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-6 text-white">
            Une association sportive collective spécialisée dans la pratique de
            la gymnastique pour enfants, adolescents et adultes.
          </p>
        </div>

        {/* Association */}
        <div>
          <h2 className="text-sm font-semibold text-white">
            L&apos;association
          </h2>

          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link href="/association" className={linkClass}>
                Qui sommes-nous ?
              </Link>
            </li>
            <li>
              <Link href="/association/equipe" className={linkClass}>
                Notre équipe
              </Link>
            </li>
            <li>
              <Link href="/association/valeurs" className={linkClass}>
                Nos valeurs
              </Link>
            </li>
          </ul>
        </div>

        {/* Activités */}
        <div>
          <h2 className="text-sm font-semibold text-white">
            Pratique sportive
          </h2>

          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link href="/activites" className={linkClass}>
                Nos activités
              </Link>
            </li>
            <li>
              <Link href="/horaires" className={linkClass}>
                Horaires &amp; tarifs
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-sm font-semibold text-white">Contact</h2>

          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link href="/contact" className={linkClass}>
                Nous contacter
              </Link>
            </li>
            <li>
              <a
                href="mailto:gymnastique.vds@gmail.com"
                className={`${linkClass} wrap-break-words`}
              >
                gymnastique.vds@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright (sans trait de séparation) */}
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 pb-8 text-sm text-white sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>
          © {new Date().getFullYear()} Gym&apos;Association. Tous droits
          réservés.
        </p>

        {/*
        À réactiver lorsque ces pages seront prêtes.

        <div className="flex gap-4">
          <Link href="/mentions-legales" className={linkClass}>
            Mentions légales
          </Link>
          <Link href="/confidentialite" className={linkClass}>
            Confidentialité
          </Link>
        </div>
        */}
      </div>
    </footer>
  );
}