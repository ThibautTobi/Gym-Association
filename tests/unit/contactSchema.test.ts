import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/validations/contact";

describe("contactSchema", () => {
  /**
   * Données valides utilisées comme base pour les différents tests.
   *
   * On les réutilise afin que chaque test puisse se concentrer
   * sur la règle de validation qu'il vérifie.
   */
  const validContact = {
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    subject: "Demande d'information",
    message: "Bonjour, je souhaiterais obtenir plus d'informations.",
    consent: true,
  };

  it("accepte des données de contact valides", () => {
    const result = contactSchema.safeParse(validContact);

    expect(result.success).toBe(true);
  });

  it("refuse un prénom trop court", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      firstName: "J",
    });

    expect(result.success).toBe(false);
  });

  it("refuse un nom trop court", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      lastName: "D",
    });

    expect(result.success).toBe(false);
  });

  it("refuse une adresse e-mail invalide", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      email: "email-invalide",
    });

    expect(result.success).toBe(false);
  });

  it("refuse un sujet trop court", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      subject: "Hi",
    });

    expect(result.success).toBe(false);
  });

  it("refuse un message trop court", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      message: "Bonjour",
    });

    expect(result.success).toBe(false);
  });

  it("refuse le formulaire si le consentement n'est pas accepté", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      consent: false,
    });

    expect(result.success).toBe(false);
  });

  it("refuse un prénom dépassant la longueur maximale", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      firstName: "A".repeat(51),
    });

    expect(result.success).toBe(false);
  });

  it("refuse un message dépassant la longueur maximale", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      message: "A".repeat(2001),
    });

    expect(result.success).toBe(false);
  });

  it("accepte les espaces autour des valeurs textuelles", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      firstName: "  Jean  ",
      lastName: "  Dupont  ",
      email: "  jean.dupont@example.com  ",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.firstName).toBe("Jean");
      expect(result.data.lastName).toBe("Dupont");
      expect(result.data.email).toBe("jean.dupont@example.com");
    }
  });
});
