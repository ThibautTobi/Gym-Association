"use client";

import { useForm as useFormspree } from "@formspree/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";

/**
 * Formulaire de contact.
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
 * Réception du message
 *
 * IMPORTANT :
 * Les noms utilisés par React Hook Form restent en anglais
 * afin de conserver la compatibilité avec le schéma Zod et
 * les tests existants.
 *
 * Les données envoyées à Formspree sont transformées en français
 * afin de faciliter la lecture des messages reçus par l'association.
 *
 * Le champ "consent" est utilisé uniquement pour la validation.
 * Il n'est volontairement pas envoyé à Formspree.
 *
 * En V2, Formspree pourra être remplacé par notre propre
 * API Node.js sans devoir refaire toute la partie interface
 * et validation.
 */
export default function ContactForm() {
  /**
   * Identifiant du formulaire Formspree.
   *
   * Cette valeur provient de .env.local en développement
   * et devra également être configurée dans Vercel
   * lors du déploiement.
   */
  const formId = process.env.FORMSPREE_CONTACT_ID;

  /**
   * Hook Formspree.
   *
   * useForm est renommé useFormspree afin d'éviter
   * la collision avec useForm de React Hook Form.
   */
  const [formspreeState, submitToFormspree] = useFormspree(
    formId ?? "missing-form-id",
  );

  /**
   * React Hook Form + Zod.
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
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
      consent: false,
    },
  });

  /**
   * Soumission du formulaire.
   *
   * React Hook Form appelle cette fonction uniquement
   * lorsque la validation Zod est réussie.
   */
  async function onSubmit(data: ContactFormValues) {
    /**
     * Vérification de configuration.
     *
     * Cela évite de tenter un envoi si l'identifiant
     * Formspree n'est pas configuré.
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
     * React Hook Form conserve ses noms techniques :
     *
     * firstName
     * lastName
     * email
     * subject
     * message
     * consent
     *
     * Formspree reçoit des libellés français et explicites.
     *
     * Le champ "consent" n'est pas envoyé :
     * il sert uniquement à autoriser l'envoi du formulaire.
     */
    const formspreeData = {
      Formulaire: "Contact",
      Type: "Message de contact",
      Prénom: data.firstName,
      Nom: data.lastName,
      "Adresse e-mail": data.email,
      Sujet: data.subject,
      Message: data.message,
    };

    /**
     * Envoi réel vers Formspree.
     *
     * Formspree met ensuite à jour formspreeState.
     */
    await submitToFormspree(formspreeData);
  }

  /**
   * Formspree peut retourner plusieurs erreurs.
   *
   * Les erreurs de validation des champs restent gérées
   * par React Hook Form + Zod.
   */
  const hasFormError = Boolean(errors.root) || Boolean(formspreeState.errors);

  /**
   * Écran affiché après l'envoi réussi.
   *
   * Le formulaire complet disparaît lorsque Formspree
   * indique que l'envoi a réussi.
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

        <h2 className="mt-5 text-2xl font-bold">Message envoyé avec succès</h2>

        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Merci pour votre message. L&apos;association en a bien pris
          connaissance et pourra revenir vers vous dans les meilleurs délais.
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
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* ------------------------------------------------------------ */}
      {/* Erreurs générales                                           */}
      {/* ------------------------------------------------------------ */}

      {hasFormError && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-lg border border-destructive bg-muted p-4 text-sm"
        >
          {/* Erreur de configuration locale */}
          {errors.root &&
            Object.values(errors.root).map((error, index) => {
              if (!error || typeof error !== "object") {
                return null;
              }

              return (
                <p key={`${error.type ?? "error"}-${index}`}>{error.message}</p>
              );
            })}

          {/* Erreurs retournées par Formspree */}
          {formspreeState.errors &&
            formspreeState.errors
              .getFormErrors()
              .map((error, index) => (
                <p key={`${error.code}-${index}`}>{error.message}</p>
              ))}
        </div>
      )}

      {/* ------------------------------------------------------------ */}
      {/* Informations personnelles                                   */}
      {/* ------------------------------------------------------------ */}

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Prénom */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium">
            Prénom
          </label>

          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            {...register("firstName")}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
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
            Nom
          </label>

          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            {...register("lastName")}
            aria-invalid={Boolean(errors.lastName)}
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
      </div>

      {/* ------------------------------------------------------------ */}
      {/* E-mail                                                       */}
      {/* ------------------------------------------------------------ */}

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Adresse e-mail
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          aria-invalid={Boolean(errors.email)}
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

      {/* ------------------------------------------------------------ */}
      {/* Sujet                                                         */}
      {/* ------------------------------------------------------------ */}

      <div>
        <label htmlFor="subject" className="block text-sm font-medium">
          Sujet
        </label>

        <input
          id="subject"
          type="text"
          {...register("subject")}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className="mt-2 min-h-11 w-full rounded-md border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />

        {errors.subject && (
          <p
            id="subject-error"
            role="alert"
            className="mt-2 text-sm text-destructive"
          >
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Message                                                       */}
      {/* ------------------------------------------------------------ */}

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>

        <textarea
          id="message"
          rows={7}
          {...register("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="mt-2 w-full resize-y rounded-md border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

      {/* ------------------------------------------------------------ */}
      {/* Consentement                                                  */}
      {/* ------------------------------------------------------------ */}

      <div>
        <div className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            {...register("consent")}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 size-4 rounded border"
          />

          <label htmlFor="consent" className="text-sm leading-6">
            J&apos;accepte la{" "}
            <Link
              href="/confidentialite"
              className="font-medium text-primary underline"
            >
              politique de confidentialité
            </Link>
            .
          </label>
        </div>

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

      {/* ------------------------------------------------------------ */}
      {/* Bouton d'envoi                                               */}
      {/* ------------------------------------------------------------ */}

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting || formspreeState.submitting}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {isSubmitting || formspreeState.submitting
            ? "Envoi en cours..."
            : "Envoyer le message"}
        </button>
      </div>
    </form>
  );
}
