import { z } from "zod";

/**
 * Schéma de validation du formulaire de contact.
 *
 * La validation est centralisée dans un fichier dédié.
 * Cela évite de dupliquer les règles dans les composants.
 */
export const contactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "Le prénom doit contenir au moins 2 caractères.")
    .max(50, "Le prénom est trop long."),

  lastName: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(50, "Le nom est trop long."),

  email: z.string().trim().email("Veuillez saisir une adresse e-mail valide."),

  subject: z
    .string()
    .trim()
    .min(3, "Le sujet doit contenir au moins 3 caractères.")
    .max(100, "Le sujet est trop long."),

  message: z
    .string()
    .trim()
    .min(10, "Le message doit contenir au moins 10 caractères.")
    .max(2000, "Le message est trop long."),

  consent: z
    .boolean()
    .refine(
      (value) => value === true,
      "Vous devez accepter la politique de confidentialité.",
    ),
});

/**
 * Type TypeScript automatiquement déduit du schéma Zod.
 */
export type ContactFormValues = z.infer<typeof contactSchema>;
