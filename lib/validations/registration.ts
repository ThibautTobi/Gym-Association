import { z } from "zod";

/**
 * Schéma de validation du formulaire de pré-inscription.
 *
 * Ce schéma centralise les règles métier du formulaire.
 * Il est utilisé par React Hook Form côté interface
 * et sera également testé avec Vitest.
 */

/**
 * Vérifie qu'une date représente réellement une date valide.
 */
function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function isValidBirthDate(value: string): boolean {
  if (!isValidDate(value)) {
    return false;
  }

  const birthDate = new Date(`${value}T00:00:00`);

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return birthDate <= today;
}

/**
 * Vérifie qu'une date de naissance :
 * - correspond à une vraie date ;
 * - n'est pas dans le futur.
 */
// function isValidBirthDate(value: string): boolean {
//   if (!isValidDate(value)) {
//     return false;
//   }

//   const birthDate = new Date(`${value}T00:00:00`);
//   const today = new Date();

//   today.setHours(0, 0, 0, 0);

//   return birthDate <= today;
// }

export const registrationSchema = z.object({
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

  birthDate: z
    .string()
    .min(1, "La date de naissance est obligatoire.")
    .refine(isValidBirthDate, "Veuillez saisir une date de naissance valide."),

  email: z.string().trim().email("Veuillez saisir une adresse e-mail valide."),

  phone: z
    .string()
    .trim()
    .regex(
      /^(?:(?:\+|00)33[\s.-]?|0)[1-9](?:[\s.-]?\d{2}){4}$/,
      "Veuillez saisir un numéro de téléphone français valide.",
    ),

  activity: z.string().min(1, "Veuillez sélectionner une activité."),

  level: z.string().min(1, "Veuillez sélectionner un niveau."),

  message: z.string().trim().max(1000, "Le message est trop long.").optional(),

  consent: z
    .boolean()
    .refine(
      (value) => value === true,
      "Vous devez accepter la politique de confidentialité.",
    ),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
