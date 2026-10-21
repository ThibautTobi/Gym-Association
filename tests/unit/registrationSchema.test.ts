import { describe, expect, it } from "vitest";
import { registrationSchema } from "@/lib/validations/registration";

describe("registrationSchema", () => {
  /**
   * Données valides utilisées comme base pour les tests.
   */
  const validRegistration = {
    firstName: "Jean",
    lastName: "Dupont",
    birthDate: "1995-06-15",
    email: "jean.dupont@example.com",
    phone: "06 12 34 56 78",
    activity: "gymnastique-loisir",
    level: "debutant",
    message: "Je souhaite obtenir davantage d'informations.",
    consent: true,
  };

  it("accepte une pré-inscription valide", () => {
    const result = registrationSchema.safeParse(validRegistration);

    expect(result.success).toBe(true);
  });

  it("refuse un prénom trop court", () => {
    const result = registrationSchema.safeParse({
      ...validRegistration,
      firstName: "J",
    });

    expect(result.success).toBe(false);
  });

  it("refuse un nom trop court", () => {
    const result = registrationSchema.safeParse({
      ...validRegistration,
      lastName: "D",
    });

    expect(result.success).toBe(false);
  });

  it("refuse une date de naissance vide", () => {
    const result = registrationSchema.safeParse({
      ...validRegistration,
      birthDate: "",
    });

    expect(result.success).toBe(false);
  });

  it("refuse une date de naissance invalide", () => {
    const result = registrationSchema.safeParse({
      ...validRegistration,
      birthDate: "bonjour",
    });

    expect(result.success).toBe(false);
  });

  it("refuse une date de naissance dans le futur", () => {
    const result = registrationSchema.safeParse({
      ...validRegistration,
      birthDate: "2099-01-01",
    });

    expect(result.success).toBe(false);
  });

  it("accepte une date de naissance valide", () => {
    const result = registrationSchema.safeParse({
      ...validRegistration,
      birthDate: "2000-01-01",
    });

    expect(result.success).toBe(true);
  });

  it("refuse une adresse e-mail invalide", () => {
    const result = registrationSchema.safeParse({
      ...validRegistration,
      email: "email-invalide",
    });

    expect(result.success).toBe(false);
  });

  it("accepte un numéro français au format classique", () => {
    const result = registrationSchema.safeParse({
      ...validRegistration,
      phone: "06 12 34 56 78",
    });

    expect(result.success).toBe(true);
  });

  it("accepte un numéro français au format international", () => {
    const result = registrationSchema.safeParse({
      ...validRegistration,
      phone: "+33 6 12 34 56 78",
    });

    expect(result.success).toBe(true);
  });

  it("refuse un numéro de téléphone invalide", () => {
    const result = registrationSchema.safeParse({
      ...validRegistration,
      phone: "123456",
    });

    expect(result.success).toBe(false);
  });

  it("refuse une activité non sélectionnée", () => {
    const result = registrationSchema.safeParse({
      ...validRegistration,
      activity: "",
    });

    expect(result.success).toBe(false);
  });

  it("refuse un niveau non sélectionné", () => {
    const result = registrationSchema.safeParse({
      ...validRegistration,
      level: "",
    });

    expect(result.success).toBe(false);
  });

  it("refuse le formulaire si le consentement n'est pas accepté", () => {
    const result = registrationSchema.safeParse({
      ...validRegistration,
      consent: false,
    });

    expect(result.success).toBe(false);
  });

  it("accepte l'absence de message facultatif", () => {
    const registrationWithoutMessage = {
      firstName: validRegistration.firstName,
      lastName: validRegistration.lastName,
      birthDate: validRegistration.birthDate,
      email: validRegistration.email,
      phone: validRegistration.phone,
      activity: validRegistration.activity,
      level: validRegistration.level,
      consent: validRegistration.consent,
    };

    const result = registrationSchema.safeParse(registrationWithoutMessage);

    expect(result.success).toBe(true);
  });

  it("refuse un message trop long", () => {
    const result = registrationSchema.safeParse({
      ...validRegistration,
      message: "A".repeat(1001),
    });

    expect(result.success).toBe(false);
  });

  it("supprime les espaces inutiles des champs textuels", () => {
    const result = registrationSchema.safeParse({
      ...validRegistration,
      firstName: "  Jean  ",
      lastName: "  Dupont  ",
      email: "  jean.dupont@example.com  ",
      phone: " 06 12 34 56 78 ",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.firstName).toBe("Jean");
      expect(result.data.lastName).toBe("Dupont");
      expect(result.data.email).toBe("jean.dupont@example.com");
      expect(result.data.phone).toBe("06 12 34 56 78");
    }
  });

  it("rejette une date inexistante", () => {
    const result = registrationSchema.safeParse({
      firstName: "Jean",
      lastName: "Dupont",
      birthDate: "2020-02-30",
      email: "jean@example.com",
      phone: "0612345678",
      activity: "gymnastique-loisir",
      level: "debutant",
      message: "",
      consent: true,
    });

    expect(result.success).toBe(false);
  });

  it("rejette une date future", () => {
    const result = registrationSchema.safeParse({
      firstName: "Jean",
      lastName: "Dupont",
      birthDate: "2999-01-01",
      email: "jean@example.com",
      phone: "0612345678",
      activity: "gymnastique-loisir",
      level: "debutant",
      message: "",
      consent: true,
    });

    expect(result.success).toBe(false);
  });
});
