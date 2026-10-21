import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import RegistrationForm from "@/components/registration/RegistrationForm";

/**
 * ============================================================
 * MOCK FORMSPREE
 * ============================================================
 *
 * Cet objet représente l'état retourné par Formspree.
 *
 * Il est volontairement mutable afin de pouvoir simuler :
 * - un formulaire en cours d'envoi ;
 * - un formulaire envoyé avec succès ;
 * - des erreurs Formspree éventuelles.
 */
const formspreeState = {
  succeeded: false,
  submitting: false,
  errors: null,
};

/**
 * Fonction simulant l'envoi des données vers Formspree.
 *
 * Aucun appel réseau réel n'est effectué pendant les tests.
 */
const submitToFormspree = vi.fn();

/**
 * Mock du module @formspree/react.
 *
 * Le composant RegistrationForm recevra donc notre état
 * simulé et notre fonction de soumission.
 */
vi.mock("@formspree/react", () => ({
  useForm: () => [formspreeState, submitToFormspree],
}));

describe("RegistrationForm", () => {
  /**
   * Réinitialise l'état et les mocks avant chaque test.
   *
   * Cela évite qu'un test influence le suivant.
   */
  // beforeEach(() => {
  //   vi.clearAllMocks();

  //   formspreeState.succeeded = false;
  //   formspreeState.submitting = false;
  //   formspreeState.errors = null;
  // });

  beforeEach(() => {
    vi.clearAllMocks();

    /**
     * Simule FORMSPREE_REGISTRATION_ID.
     * Sans elle, le composant affiche une erreur de configuration
     * et n'appelle jamais Formspree.
     */
    vi.stubEnv("FORMSPREE_REGISTRATION_ID", "test-form-id");

    formspreeState.succeeded = false;
    formspreeState.submitting = false;
    formspreeState.errors = null;
  });

  afterEach(() => {
    // Restaure les variables d'environnement d'origine.
    vi.unstubAllEnvs();
  });

  /**
   * ==========================================================
   * HELPERS
   * ==========================================================
   */

  /**
   * Récupère le bouton principal du formulaire.
   *
   * Le formulaire utilise maintenant :
   * "Demander une séance d'essai"
   */
  function getSubmitButton() {
    return screen.getByRole("button", {
      name: /demander une séance d'essai/i,
    });
  }

  /**
   * Remplit le formulaire avec des données valides.
   *
   * Cette fonction est réutilisée par plusieurs tests
   * afin d'éviter de dupliquer le même code.
   */
  async function fillValidForm() {
    const user = userEvent.setup();

    /**
     * Informations personnelles.
     *
     * IMPORTANT :
     * On utilise /Prénom/i et non /^Prénom$/i.
     *
     * Le label réel contient également un astérisque :
     *
     * Prénom *
     *
     * L'astérisque est rendu dans un <span>.
     */
    await user.type(screen.getByLabelText(/prénom/i), "Jean");

    await user.type(screen.getByLabelText(/^Nom/i), "Dupont");

    await user.type(screen.getByLabelText(/date de naissance/i), "1995-06-15");

    await user.type(
      screen.getByLabelText(/adresse e-mail/i),
      "jean.dupont@example.com",
    );

    await user.type(screen.getByLabelText(/téléphone/i), "06 12 34 56 78");

    /**
     * Activité souhaitée.
     */
    await user.selectOptions(
      screen.getByLabelText(/^Activité/i),
      "gymnastique-loisir",
    );

    /**
     * Niveau.
     */
    await user.selectOptions(screen.getByLabelText(/^Niveau/i), "debutant");

    /**
     * Le message complémentaire est facultatif.
     * Il n'est donc volontairement pas rempli.
     */

    /**
     * Consentement obligatoire.
     */
    await user.click(screen.getByRole("checkbox"));

    return user;
  }

  /**
   * ==========================================================
   * AFFICHAGE
   * ==========================================================
   */

  it("affiche les champs principaux", () => {
    render(<RegistrationForm />);

    expect(screen.getByLabelText(/prénom/i)).toBeTruthy();

    expect(screen.getByLabelText(/^Nom/i)).toBeTruthy();

    expect(screen.getByLabelText(/date de naissance/i)).toBeTruthy();

    expect(screen.getByLabelText(/adresse e-mail/i)).toBeTruthy();

    expect(screen.getByLabelText(/téléphone/i)).toBeTruthy();

    expect(screen.getByLabelText(/^Activité/i)).toBeTruthy();

    expect(screen.getByLabelText(/^Niveau/i)).toBeTruthy();

    expect(screen.getByRole("checkbox")).toBeTruthy();
  });

  it("affiche le bouton de demande de séance d'essai", () => {
    render(<RegistrationForm />);

    expect(getSubmitButton()).toBeTruthy();
  });

  /**
   * ==========================================================
   * VALIDATION
   * ==========================================================
   */

  it("refuse une soumission vide", async () => {
    const user = userEvent.setup();

    render(<RegistrationForm />);

    await user.click(getSubmitButton());

    /**
     * Le premier champ invalide doit afficher
     * son message de validation.
     */
    expect(
      await screen.findByText(/le prénom doit contenir au moins 2 caractères/i),
    ).toBeTruthy();

    /**
     * Formspree ne doit jamais être appelé si
     * les données sont invalides.
     */
    expect(submitToFormspree).not.toHaveBeenCalled();
  });

  it("refuse une date de naissance dans le futur", async () => {
    const user = userEvent.setup();

    render(<RegistrationForm />);

    await user.type(screen.getByLabelText(/prénom/i), "Jean");

    await user.type(screen.getByLabelText(/^Nom/i), "Dupont");

    await user.type(screen.getByLabelText(/date de naissance/i), "2099-01-01");

    await user.type(
      screen.getByLabelText(/adresse e-mail/i),
      "jean.dupont@example.com",
    );

    await user.type(screen.getByLabelText(/téléphone/i), "06 12 34 56 78");

    await user.selectOptions(
      screen.getByLabelText(/^Activité/i),
      "gymnastique-loisir",
    );

    await user.selectOptions(screen.getByLabelText(/^Niveau/i), "debutant");

    await user.click(screen.getByRole("checkbox"));

    await user.click(getSubmitButton());

    expect(await screen.findByText(/date de naissance valide/i)).toBeTruthy();

    expect(submitToFormspree).not.toHaveBeenCalled();
  });

  it("refuse un numéro de téléphone invalide", async () => {
    const user = userEvent.setup();

    render(<RegistrationForm />);

    await user.type(screen.getByLabelText(/prénom/i), "Jean");

    await user.type(screen.getByLabelText(/^Nom/i), "Dupont");

    await user.type(screen.getByLabelText(/date de naissance/i), "1995-06-15");

    await user.type(
      screen.getByLabelText(/adresse e-mail/i),
      "jean.dupont@example.com",
    );

    /**
     * Numéro volontairement invalide.
     */
    await user.type(screen.getByLabelText(/téléphone/i), "123456");

    await user.selectOptions(
      screen.getByLabelText(/^Activité/i),
      "gymnastique-loisir",
    );

    await user.selectOptions(screen.getByLabelText(/^Niveau/i), "debutant");

    await user.click(screen.getByRole("checkbox"));

    await user.click(getSubmitButton());

    expect(
      await screen.findByText(/numéro de téléphone français valide/i),
    ).toBeTruthy();

    expect(submitToFormspree).not.toHaveBeenCalled();
  });

  it("refuse la demande de séance d'essai sans consentement", async () => {
    const user = userEvent.setup();

    render(<RegistrationForm />);

    await user.type(screen.getByLabelText(/prénom/i), "Jean");

    await user.type(screen.getByLabelText(/^Nom/i), "Dupont");

    await user.type(screen.getByLabelText(/date de naissance/i), "1995-06-15");

    await user.type(
      screen.getByLabelText(/adresse e-mail/i),
      "jean.dupont@example.com",
    );

    await user.type(screen.getByLabelText(/téléphone/i), "06 12 34 56 78");

    await user.selectOptions(
      screen.getByLabelText(/^Activité/i),
      "gymnastique-loisir",
    );

    await user.selectOptions(screen.getByLabelText(/^Niveau/i), "debutant");

    /**
     * IMPORTANT :
     * Le checkbox n'est volontairement PAS coché.
     */

    await user.click(getSubmitButton());

    expect(
      await screen.findByText(/accepter la politique de confidentialité/i),
    ).toBeTruthy();

    expect(submitToFormspree).not.toHaveBeenCalled();
  });

  /**
   * ==========================================================
   * SOUMISSION
   * ==========================================================
   */

  it("soumet des données valides à Formspree", async () => {
    /**
     * CORRECTION : le composant doit être rendu AVANT de remplir
     * le formulaire. fillValidForm cherche les champs dans le DOM.
     */
    render(<RegistrationForm />);

    const user = await fillValidForm();

    await user.click(getSubmitButton());

    /**
     * waitFor réessaie l'assertion jusqu'à ce qu'elle passe :
     * la validation Zod + react-hook-form est asynchrone, l'appel
     * à Formspree arrive donc un peu APRÈS le clic.
     */
    await waitFor(() => {
      expect(submitToFormspree).toHaveBeenCalledTimes(1);
    });

    /**
     * Données transformées par le composant : clés en français,
     * et "Aucun message complémentaire." quand le message est vide.
     */
    expect(submitToFormspree).toHaveBeenCalledWith({
      Type: "Demande de séance d'essai",
      Prénom: "Jean",
      Nom: "Dupont",
      "Date de naissance": "1995-06-15",
      "Adresse e-mail": "jean.dupont@example.com",
      Téléphone: "06 12 34 56 78",
      Activité: "gymnastique-loisir",
      Niveau: "debutant",
      Message: "Aucun message complémentaire.",
    });
  });

  /**
   * ==========================================================
   * ÉTAT DE CHARGEMENT
   * ==========================================================
   */

  it("désactive le bouton pendant l'envoi", () => {
    // Simule Formspree en cours d'envoi AVANT le rendu.
    formspreeState.submitting = true;

    // CORRECTION : la ligne était commentée, donc le DOM était vide.
    render(<RegistrationForm />);

    /**
     * Pendant l'envoi, le composant change le texte du bouton en
     * "Envoi en cours...", donc on ne peut pas utiliser
     * getSubmitButton() (qui cherche le texte normal).
     */
    const submitButton = screen.getByRole("button", {
      name: /envoi en cours/i,
    });

    /**
     * jest-dom est maintenant configuré dans vitest.setup.ts :
     * on peut utiliser toBeDisabled(), plus lisible que
     * toHaveProperty("disabled", true).
     */
    expect(submitButton).toBeDisabled();
  });
  /**
   * ==========================================================
   * SUCCÈS
   * ==========================================================
   */

  it("affiche le message de succès après une demande de séance d'essai réussie", () => {
    /**
     * Simule une réponse Formspree réussie.
     */
    formspreeState.succeeded = true;

    render(<RegistrationForm />);

    /**
     * Vérifie que le message de succès est présent.
     *
     * On utilise getByText + toBeTruthy() afin de ne pas
     * dépendre de jest-dom.
     */
    expect(screen.getByText(/demande de séance d'essai envoyée/i)).toBeTruthy();
  });
});
