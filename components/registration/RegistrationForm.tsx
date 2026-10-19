// "use client";

// import { useForm as useFormspree } from "@formspree/react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

// import {
//   registrationSchema,
//   type RegistrationFormValues,
// } from "@/lib/validations/registration";

// /**
//  * Formulaire de pré-inscription.
//  *
//  * Architecture V1 :
//  *
//  * React Hook Form
//  *      ↓
//  * Zod
//  *      ↓
//  * Validation côté client
//  *      ↓
//  * Formspree
//  *      ↓
//  * Réception de la demande
//  *
//  * En V2, Formspree pourra être remplacé par notre
//  * propre API Node.js sans devoir refaire toute
//  * la partie interface et validation.
//  */
// export default function RegistrationForm() {
//   /**
//    * React Hook Form
//    *
//    * Responsable de :
//    *
//    * - la gestion des champs ;
//    * - la validation Zod ;
//    * - les erreurs de validation ;
//    * - l'état de soumission.
//    */
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setError,
//     formState: { errors, isSubmitting },
//   } = useForm<RegistrationFormValues>({
//     resolver: zodResolver(registrationSchema),

//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       birthDate: "",
//       email: "",
//       phone: "",
//       activity: "",
//       level: "",
//       message: "",
//       consent: false,
//     },
//   });

//   /**
//    * Identifiant du formulaire Formspree.
//    *
//    * Cette valeur provient de .env.local en développement
//    * et devra également être configurée dans Vercel
//    * lors du déploiement.
//    */
//   const formId = process.env.NEXT_PUBLIC_FORMSPREE_REGISTRATION_ID;

//   /**
//    * Formspree
//    *
//    * useForm permet de récupérer :
//    *
//    * - errors
//    * - result
//    * - submitting
//    * - succeeded
//    * - la fonction de soumission
//    *
//    * Le fallback permet au hook de rester initialisable
//    * même si la variable d'environnement est absente.
//    * La soumission est ensuite bloquée dans onSubmit.
//    */
//   const [formspreeState, submitToFormspree] = useFormspree(
//     formId ?? "missing-form-id",
//   );

//   /**
//    * Soumission du formulaire.
//    *
//    * Cette fonction n'est appelée par React Hook Form
//    * que si la validation Zod est réussie.
//    */
//   const onSubmit = async (data: RegistrationFormValues) => {
//     /**
//      * Vérification de configuration.
//      */
//     if (!formId) {
//       setError("root.configuration", {
//         type: "configuration",
//         message:
//           "Le formulaire est temporairement indisponible. Veuillez réessayer plus tard.",
//       });

//       return;
//     }

//     /**
//      * Envoi vers Formspree.
//      *
//      * Formspree met ensuite à jour formspreeState.
//      */
//     await submitToFormspree(data);
//   };

//   /**
//    * Permet de recommencer une demande après succès.
//    */
//   const handleNewRegistration = () => {
//     reset();
//   };

//   /**
//    * Affichage du succès réel Formspree.
//    *
//    * Contrairement à isSubmitSuccessful de React Hook Form,
//    * formspreeState.succeeded indique que Formspree a
//    * effectivement accepté la soumission.
//    */
//   if (formspreeState.succeeded) {
//     return (
//       <div
//         role="status"
//         aria-live="polite"
//         className="rounded-xl border border-success bg-card p-8 text-center"
//       >
//         <div
//           aria-hidden="true"
//           className="mx-auto flex size-12 items-center justify-center rounded-full bg-success text-success-foreground"
//         >
//           ✓
//         </div>

//         <h2 className="mt-5 text-2xl font-bold">
//           Demande envoyée avec succès
//         </h2>

//         <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
//           Merci pour votre demande de pré-inscription. L&apos;association
//           pourra revenir vers vous avec les informations concernant votre
//           activité et votre créneau.
//         </p>

//         <button
//           type="button"
//           onClick={handleNewRegistration}
//           className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md border px-5 py-3 font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//         >
//           Faire une nouvelle demande
//         </button>
//       </div>
//     );
//   }

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       noValidate
//       aria-describedby="registration-required-information"
//       className="space-y-8"
//     >
//       {/*
//         Erreurs générales :

//         - erreur de configuration ;
//         - erreur Formspree ;
//         - erreur serveur.
//       */}
//       {(errors.root || formspreeState.errors) && (
//         <div
//           role="alert"
//           aria-live="assertive"
//           className="rounded-lg border border-destructive bg-destructive/10 p-4 text-sm text-destructive"
//         >
//           {errors.root &&
//             Object.values(errors.root).map((error, index) => {
//               if (!error || typeof error !== "object") {
//                 return null;
//               }

//               return (
//                 <p key={`${error.type ?? "error"}-${index}`}>
//                   {error.message}
//                 </p>
//               );
//             })}

//           {formspreeState.errors &&
//             formspreeState.errors.getFormErrors().map((error, index) => (
//               <p key={`${error.code}-${index}`}>{error.message}</p>
//             ))}
//         </div>
//       )}

//       {/* Informations personnelles */}
//       <fieldset className="space-y-6 rounded-xl border bg-card p-6">
//         <legend className="px-2 text-xl font-semibold">
//           Informations personnelles
//         </legend>

//         <div className="grid gap-6 sm:grid-cols-2">
//           {/* Prénom */}
//           <div>
//             <label
//               htmlFor="firstName"
//               className="block text-sm font-medium"
//             >
//               Prénom <span aria-hidden="true">*</span>
//             </label>

//             <input
//               id="firstName"
//               type="text"
//               autoComplete="given-name"
//               {...register("firstName")}
//               aria-invalid={errors.firstName ? "true" : "false"}
//               aria-describedby={
//                 errors.firstName ? "firstName-error" : undefined
//               }
//               className="mt-2 min-h-11 w-full rounded-md border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//             />

//             {errors.firstName && (
//               <p
//                 id="firstName-error"
//                 role="alert"
//                 className="mt-2 text-sm text-destructive"
//               >
//                 {errors.firstName.message}
//               </p>
//             )}
//           </div>

//           {/* Nom */}
//           <div>
//             <label
//               htmlFor="lastName"
//               className="block text-sm font-medium"
//             >
//               Nom <span aria-hidden="true">*</span>
//             </label>

//             <input
//               id="lastName"
//               type="text"
//               autoComplete="family-name"
//               {...register("lastName")}
//               aria-invalid={errors.lastName ? "true" : "false"}
//               aria-describedby={
//                 errors.lastName ? "lastName-error" : undefined
//               }
//               className="mt-2 min-h-11 w-full rounded-md border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//             />

//             {errors.lastName && (
//               <p
//                 id="lastName-error"
//                 role="alert"
//                 className="mt-2 text-sm text-destructive"
//               >
//                 {errors.lastName.message}
//               </p>
//             )}
//           </div>

//           {/* Date de naissance */}
//           <div>
//             <label
//               htmlFor="birthDate"
//               className="block text-sm font-medium"
//             >
//               Date de naissance <span aria-hidden="true">*</span>
//             </label>

//             <input
//               id="birthDate"
//               type="date"
//               autoComplete="bday"
//               {...register("birthDate")}
//               aria-invalid={errors.birthDate ? "true" : "false"}
//               aria-describedby={
//                 errors.birthDate ? "birthDate-error" : undefined
//               }
//               className="mt-2 min-h-11 w-full rounded-md border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//             />

//             {errors.birthDate && (
//               <p
//                 id="birthDate-error"
//                 role="alert"
//                 className="mt-2 text-sm text-destructive"
//               >
//                 {errors.birthDate.message}
//               </p>
//             )}
//           </div>

//           {/* Téléphone */}
//           <div>
//             <label htmlFor="phone" className="block text-sm font-medium">
//               Téléphone <span aria-hidden="true">*</span>
//             </label>

//             <input
//               id="phone"
//               type="tel"
//               autoComplete="tel"
//               {...register("phone")}
//               aria-invalid={errors.phone ? "true" : "false"}
//               aria-describedby={errors.phone ? "phone-error" : undefined}
//               className="mt-2 min-h-11 w-full rounded-md border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//             />

//             {errors.phone && (
//               <p
//                 id="phone-error"
//                 role="alert"
//                 className="mt-2 text-sm text-destructive"
//               >
//                 {errors.phone.message}
//               </p>
//             )}
//           </div>

//           {/* Email */}
//           <div className="sm:col-span-2">
//             <label htmlFor="email" className="block text-sm font-medium">
//               Adresse e-mail <span aria-hidden="true">*</span>
//             </label>

//             <input
//               id="email"
//               type="email"
//               autoComplete="email"
//               {...register("email")}
//               aria-invalid={errors.email ? "true" : "false"}
//               aria-describedby={errors.email ? "email-error" : undefined}
//               className="mt-2 min-h-11 w-full rounded-md border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//             />

//             {errors.email && (
//               <p
//                 id="email-error"
//                 role="alert"
//                 className="mt-2 text-sm text-destructive"
//               >
//                 {errors.email.message}
//               </p>
//             )}
//           </div>
//         </div>
//       </fieldset>

//       {/* Activité */}
//       <fieldset className="space-y-6 rounded-xl border bg-card p-6">
//         <legend className="px-2 text-xl font-semibold">
//           Activité souhaitée
//         </legend>

//         <div className="grid gap-6 sm:grid-cols-2">
//           {/* Activité */}
//           <div>
//             <label
//               htmlFor="activity"
//               className="block text-sm font-medium"
//             >
//               Activité <span aria-hidden="true">*</span>
//             </label>

//             <select
//               id="activity"
//               {...register("activity")}
//               aria-invalid={errors.activity ? "true" : "false"}
//               aria-describedby={
//                 errors.activity ? "activity-error" : undefined
//               }
//               className="mt-2 min-h-11 w-full rounded-md border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//             >
//               <option value="">Sélectionnez une activité</option>
//               <option value="baby-gym">Baby Gym</option>
//               <option value="gymnastique-loisir">
//                 Gymnastique loisir
//               </option>
//               <option value="gymnastique-artistique">
//                 Gymnastique artistique
//               </option>
//               <option value="competition">Compétition</option>
//             </select>

//             {errors.activity && (
//               <p
//                 id="activity-error"
//                 role="alert"
//                 className="mt-2 text-sm text-destructive"
//               >
//                 {errors.activity.message}
//               </p>
//             )}
//           </div>

//           {/* Niveau */}
//           <div>
//             <label htmlFor="level" className="block text-sm font-medium">
//               Niveau <span aria-hidden="true">*</span>
//             </label>

//             <select
//               id="level"
//               {...register("level")}
//               aria-invalid={errors.level ? "true" : "false"}
//               aria-describedby={errors.level ? "level-error" : undefined}
//               className="mt-2 min-h-11 w-full rounded-md border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//             >
//               <option value="">Sélectionnez un niveau</option>
//               <option value="debutant">Débutant</option>
//               <option value="intermediaire">Intermédiaire</option>
//               <option value="confirme">Confirmé</option>
//               <option value="ne-sait-pas">
//                 Je ne sais pas encore
//               </option>
//             </select>

//             {errors.level && (
//               <p
//                 id="level-error"
//                 role="alert"
//                 className="mt-2 text-sm text-destructive"
//               >
//                 {errors.level.message}
//               </p>
//             )}
//           </div>
//         </div>
//       </fieldset>

//       {/* Message */}
//       <div>
//         <label htmlFor="message" className="block text-sm font-medium">
//           Message complémentaire
//         </label>

//         <textarea
//           id="message"
//           rows={5}
//           {...register("message")}
//           aria-invalid={errors.message ? "true" : "false"}
//           aria-describedby={errors.message ? "message-error" : undefined}
//           className="mt-2 w-full rounded-md border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//           placeholder="Informations complémentaires..."
//         />

//         {errors.message && (
//           <p
//             id="message-error"
//             role="alert"
//             className="mt-2 text-sm text-destructive"
//           >
//             {errors.message.message}
//           </p>
//         )}
//       </div>

//       {/* Consentement */}
//       <div className="rounded-lg border bg-muted p-4">
//         <div className="flex items-start gap-3">
//           <input
//             id="consent"
//             type="checkbox"
//             {...register("consent")}
//             aria-invalid={errors.consent ? "true" : "false"}
//             aria-describedby={
//               errors.consent
//                 ? "consent-error consent-description"
//                 : "consent-description"
//             }
//             className="mt-1 size-5 shrink-0 accent-primary"
//           />

//           <div>
//             <label
//               htmlFor="consent"
//               className="text-sm font-medium leading-6"
//             >
//               J&apos;accepte la politique de confidentialité{" "}
//               <span aria-hidden="true">*</span>
//             </label>

//             <p
//               id="consent-description"
//               className="mt-1 text-sm text-muted-foreground"
//             >
//               Vos informations seront utilisées uniquement pour traiter
//               votre demande de pré-inscription.
//             </p>

//             {errors.consent && (
//               <p
//                 id="consent-error"
//                 role="alert"
//                 className="mt-2 text-sm text-destructive"
//               >
//                 {errors.consent.message}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Bouton */}
//       <div>
//         <button
//           type="submit"
//           disabled={isSubmitting || formspreeState.submitting}
//           className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
//         >
//           {isSubmitting || formspreeState.submitting
//             ? "Envoi en cours..."
//             : "Envoyer ma demande de pré-inscription"}
//         </button>

//         <p
//           id="registration-required-information"
//           className="mt-3 text-sm text-muted-foreground"
//         >
//           Les champs marqués d&apos;un astérisque sont obligatoires.
//         </p>
//       </div>
//     </form>
//   );
// }

"use client";

import { useForm as useFormspree } from "@formspree/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  registrationSchema,
  type RegistrationFormValues,
} from "@/lib/validations/registration";
import Link from "next/link";

/**
 * Formulaire de demande de séance d'essai.
 *
 * Architecture V1 :
 *
 * React Hook Form
 *      ↓
 * Zod
 *      ↓
 * Validation côté client
 *      ↓
 * Transformation des données pour Formspree
 *      ↓
 * Formspree
 *      ↓
 * Réception de la demande
 *
 * IMPORTANT :
 * Les noms utilisés par React Hook Form restent en anglais
 * afin de conserver la compatibilité avec le schéma Zod et
 * les tests existants.
 *
 * Les noms envoyés à Formspree sont transformés en français
 * pour faciliter la lecture des demandes reçues.
 *
 * En V2, Formspree pourra être remplacé par notre propre
 * API Node.js sans devoir refaire toute la partie interface
 * et validation.
 */
export default function RegistrationForm() {
  /**
   * React Hook Form
   *
   * Responsable de :
   *
   * - la gestion des champs ;
   * - la validation Zod ;
   * - les erreurs de validation ;
   * - l'état de soumission.
   */
  const {
    register,
    handleSubmit,
    // reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      email: "",
      phone: "",
      activity: "",
      level: "",
      message: "",
      consent: false,
    },
  });

  /**
   * Identifiant du formulaire Formspree.
   *
   * Cette valeur provient de .env.local en développement
   * et devra également être configurée dans Vercel
   * lors du déploiement.
   */
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_REGISTRATION_ID;

  /**
   * Formspree
   *
   * useForm permet de récupérer :
   *
   * - errors
   * - result
   * - submitting
   * - succeeded
   * - la fonction de soumission
   *
   * Le fallback permet au hook de rester initialisable
   * même si la variable d'environnement est absente.
   * La soumission est ensuite bloquée dans onSubmit.
   */
  const [formspreeState, submitToFormspree] = useFormspree(
    formId ?? "missing-form-id",
  );

  /**
   * Soumission du formulaire.
   *
   * Cette fonction n'est appelée par React Hook Form
   * que si la validation Zod est réussie.
   */
  const onSubmit = async (data: RegistrationFormValues) => {
    /**
     * Vérification de configuration.
     */
    if (!formId) {
      setError("root.configuration", {
        type: "configuration",
        message:
          "Le formulaire est temporairement indisponible. Veuillez réessayer plus tard.",
      });

      return;
    }

    /**
     * Transformation des données avant l'envoi.
     *
     * Les clés utilisées par React Hook Form restent en anglais
     * (`firstName`, `lastName`, etc.).
     *
     * Formspree reçoit cependant des libellés français,
     * ce qui rend les demandes beaucoup plus faciles à lire.
     */
    const formspreeData = {
      Type: "Demande de séance d'essai",
      Prénom: data.firstName,
      Nom: data.lastName,
      "Date de naissance": data.birthDate,
      "Adresse e-mail": data.email,
      Téléphone: data.phone,
      Activité: data.activity,
      Niveau: data.level,
      Message: data.message || "Aucun message complémentaire.",
    };

    /**
     * Envoi vers Formspree.
     *
     * Formspree met ensuite à jour formspreeState.
     */
    await submitToFormspree(formspreeData);
  };

  /**
   * Affichage du succès réel Formspree.
   *
   * Contrairement à isSubmitSuccessful de React Hook Form,
   * formspreeState.succeeded indique que Formspree a
   * effectivement accepté la soumission.
   */
  if (formspreeState.succeeded) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-success bg-card p-8 text-center"
      >
        <div
          aria-hidden="true"
          className="mx-auto flex size-12 items-center justify-center rounded-full bg-success text-success-foreground"
        >
          ✓
        </div>

        <h2 className="mt-5 text-2xl font-bold">
          Demande de séance d&apos;essai envoyée
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Merci pour votre demande de séance d&apos;essai. L&apos;association
          pourra revenir vers vous avec les informations concernant
          l&apos;activité et le créneau souhaités.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => {
              window.location.reload();
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-md border px-5 py-3 font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Envoyer un nouveau message
          </button>

          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-describedby="registration-required-information"
      className="space-y-8"
    >
      {/*
        Erreurs générales :

        - erreur de configuration ;
        - erreur Formspree ;
        - erreur serveur.
      */}
      {(errors.root || formspreeState.errors) && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-lg border border-destructive bg-destructive/10 p-4 text-sm text-destructive"
        >
          {errors.root &&
            Object.values(errors.root).map((error, index) => {
              if (!error || typeof error !== "object") {
                return null;
              }

              return (
                <p key={`${error.type ?? "error"}-${index}`}>{error.message}</p>
              );
            })}

          {formspreeState.errors &&
            formspreeState.errors
              .getFormErrors()
              .map((error, index) => (
                <p key={`${error.code}-${index}`}>{error.message}</p>
              ))}
        </div>
      )}

      {/* Informations personnelles */}
      <fieldset className="space-y-6 rounded-xl border bg-card p-6">
        <legend className="px-2 text-xl font-semibold">
          Informations personnelles
        </legend>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Prénom */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium">
              Prénom <span aria-hidden="true">*</span>
            </label>

            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              {...register("firstName")}
              aria-invalid={errors.firstName ? "true" : "false"}
              aria-describedby={
                errors.firstName ? "firstName-error" : undefined
              }
              className="mt-2 min-h-11 w-full rounded-md border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />

            {errors.firstName && (
              <p
                id="firstName-error"
                role="alert"
                className="mt-2 text-sm text-destructive"
              >
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Nom */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium">
              Nom <span aria-hidden="true">*</span>
            </label>

            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              {...register("lastName")}
              aria-invalid={errors.lastName ? "true" : "false"}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              className="mt-2 min-h-11 w-full rounded-md border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />

            {errors.lastName && (
              <p
                id="lastName-error"
                role="alert"
                className="mt-2 text-sm text-destructive"
              >
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Date de naissance */}
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium">
              Date de naissance <span aria-hidden="true">*</span>
            </label>

            <input
              id="birthDate"
              type="date"
              autoComplete="bday"
              {...register("birthDate")}
              aria-invalid={errors.birthDate ? "true" : "false"}
              aria-describedby={
                errors.birthDate ? "birthDate-error" : undefined
              }
              className="mt-2 min-h-11 w-full rounded-md border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />

            {errors.birthDate && (
              <p
                id="birthDate-error"
                role="alert"
                className="mt-2 text-sm text-destructive"
              >
                {errors.birthDate.message}
              </p>
            )}
          </div>

          {/* Téléphone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Téléphone <span aria-hidden="true">*</span>
            </label>

            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              {...register("phone")}
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className="mt-2 min-h-11 w-full rounded-md border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />

            {errors.phone && (
              <p
                id="phone-error"
                role="alert"
                className="mt-2 text-sm text-destructive"
              >
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Adresse e-mail <span aria-hidden="true">*</span>
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="mt-2 min-h-11 w-full rounded-md border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />

            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="mt-2 text-sm text-destructive"
              >
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Activité */}
      <fieldset className="space-y-6 rounded-xl border bg-card p-6">
        <legend className="px-2 text-xl font-semibold">
          Activité souhaitée pour la séance d&apos;essai
        </legend>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Activité */}
          <div>
            <label htmlFor="activity" className="block text-sm font-medium">
              Activité <span aria-hidden="true">*</span>
            </label>

            <select
              id="activity"
              {...register("activity")}
              aria-invalid={errors.activity ? "true" : "false"}
              aria-describedby={errors.activity ? "activity-error" : undefined}
              className="mt-2 min-h-11 w-full rounded-md border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Sélectionnez une activité</option>
              <option value="baby-gym">Baby Gym</option>
              <option value="gymnastique-loisir">Gymnastique loisir</option>
              <option value="gymnastique-aerobic">Gymnastique aerobic</option>
              <option value="marche">Marche</option>
              <option value="pilate">Pilate</option>
              <option value="circuit-training">Circuit training</option>
            </select>

            {errors.activity && (
              <p
                id="activity-error"
                role="alert"
                className="mt-2 text-sm text-destructive"
              >
                {errors.activity.message}
              </p>
            )}
          </div>

          {/* Niveau */}
          <div>
            <label htmlFor="level" className="block text-sm font-medium">
              Niveau <span aria-hidden="true">*</span>
            </label>

            <select
              id="level"
              {...register("level")}
              aria-invalid={errors.level ? "true" : "false"}
              aria-describedby={errors.level ? "level-error" : undefined}
              className="mt-2 min-h-11 w-full rounded-md border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Sélectionnez un niveau</option>
              <option value="debutant">Débutant</option>
              <option value="intermediaire">Intermédiaire</option>
              <option value="confirme">Confirmé</option>
              <option value="ne-sait-pas">Je ne sais pas encore</option>
            </select>

            {errors.level && (
              <p
                id="level-error"
                role="alert"
                className="mt-2 text-sm text-destructive"
              >
                {errors.level.message}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message complémentaire
        </label>

        <textarea
          id="message"
          rows={5}
          {...register("message")}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="mt-2 w-full rounded-md border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Précisez éventuellement vos disponibilités ou toute information utile pour organiser votre séance d'essai..."
        />

        {errors.message && (
          <p
            id="message-error"
            role="alert"
            className="mt-2 text-sm text-destructive"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Consentement */}
      <div className="rounded-lg border bg-muted p-4">
        <div className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            {...register("consent")}
            aria-invalid={errors.consent ? "true" : "false"}
            aria-describedby={
              errors.consent
                ? "consent-error consent-description"
                : "consent-description"
            }
            className="mt-1 size-5 shrink-0 accent-primary"
          />

          <div>
            <label htmlFor="consent" className="text-sm font-medium leading-6">
              J&apos;accepte la politique de confidentialité{" "}
              <span aria-hidden="true">*</span>
            </label>

            <p
              id="consent-description"
              className="mt-1 text-sm text-muted-foreground"
            >
              Vos informations seront utilisées uniquement pour traiter votre
              demande de séance d&apos;essai.
            </p>

            {errors.consent && (
              <p
                id="consent-error"
                role="alert"
                className="mt-2 text-sm text-destructive"
              >
                {errors.consent.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bouton */}
      <div className="flex flex-col items-center">
        <button
          type="submit"
          disabled={isSubmitting || formspreeState.submitting}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting || formspreeState.submitting
            ? "Envoi en cours..."
            : "Demander une séance d'essai"}
        </button>

        <p
          id="registration-required-information"
          className="mt-3 text-center text-sm text-muted-foreground"
        >
          Les champs marqués d&apos;un astérisque sont obligatoires.
        </p>
      </div>
    </form>
  );
}
