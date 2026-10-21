// import type { Metadata } from "next";
// import Link from "next/link";

// import PageIntro from "@/components/sections/PageIntro";

// export const metadata: Metadata = {
//   title: "Inscription",
//   description:
//     "Découvrez les modalités pour rejoindre Gym'Association et pratiquer la gymnastique.",
// };

// export default function RegistrationPage() {
//   return (
//     <>
//       <PageIntro
//         eyebrow="Nous rejoindre"
//         title="Inscription"
//         description="Retrouvez les informations nécessaires pour découvrir nos activités et rejoindre l'association."
//       />

//       <section className="py-16 sm:py-20">
//         <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
//           <article className="rounded-xl border bg-card p-6 shadow-sm">
//             <h2 className="text-xl font-semibold">
//               1. Choisir une activité
//             </h2>

//             <p className="mt-3 leading-7 text-muted-foreground">
//               Consultez nos activités et identifiez le groupe correspondant
//               à votre âge et votre niveau.
//             </p>

//             <Link
//               href="/activites"
//               className="mt-6 inline-flex min-h-11 items-center font-medium text-primary hover:underline"
//             >
//               Voir les activités →
//             </Link>
//           </article>

//           <article className="rounded-xl border bg-card p-6 shadow-sm">
//             <h2 className="text-xl font-semibold">
//               2. Consulter les horaires
//             </h2>

//             <p className="mt-3 leading-7 text-muted-foreground">
//               Consultez les créneaux disponibles et les informations
//               pratiques avant de nous contacter.
//             </p>

//             <Link
//               href="/horaires"
//               className="mt-6 inline-flex min-h-11 items-center font-medium text-primary hover:underline"
//             >
//               Voir les horaires →
//             </Link>
//           </article>
//         </div>

//         <div className="mx-auto mt-10 max-w-3xl px-4 text-center sm:px-6 lg:px-8">
//           <div className="rounded-2xl bg-muted p-8">
//             <h2 className="text-2xl font-bold">
//               Une question avant de vous inscrire ?
//             </h2>

//             <p className="mt-4 text-muted-foreground">
//               Notre équipe est disponible pour vous renseigner sur les
//               activités, les horaires et les modalités d&apos;inscription.
//             </p>

//             <Link
//               href="/contact"
//               className="mt-6 inline-flex min-h-11 items-center rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
//             >
//               Nous contacter
//             </Link>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

import type { Metadata } from "next";

import PageIntro from "@/components/sections/PageIntro";
import RegistrationForm from "@/components/registration/RegistrationForm";

export const metadata: Metadata = {
  title: "Séance d'essai",
  description:
    "Demandez une séance d'essai auprès de Gym Val de Saâne et découvrez nos activités.",
};

export default function RegistrationPage() {
  return (
    <>
      <PageIntro
        eyebrow="Séance d'essai"
        title="Découvrir Gym Val de Saâne"
        description="Remplissez le formulaire ci-dessous pour demander une séance d'essai et découvrir l'activité qui vous correspond."
      />

      <section
        aria-labelledby="registration-form-title"
        className="py-16 sm:py-20"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2
              id="registration-form-title"
              className="text-2xl font-bold sm:text-3xl"
            >
              Demander une séance d&apos;essai
            </h2>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Cette demande nous permet de mieux connaître vos besoins et de
              vous orienter vers l&apos;activité et le créneau les plus adaptés.
            </p>
          </div>

          <RegistrationForm />
        </div>
      </section>
    </>
  );
}
