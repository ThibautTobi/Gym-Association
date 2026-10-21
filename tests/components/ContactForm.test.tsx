/**
 * Fichier d'initialisation exécuté AVANT chaque fichier de test
 * (déclaré dans vitest.config.ts via `setupFiles`).
 */

/**
 * Cet import fait DEUX choses :
 * 1. À l'exécution : enregistre les matchers jest-dom dans `expect`
 *    (toBeInTheDocument, toBeDisabled, toHaveValue...).
 * 2. Pour TypeScript : étend le type `Assertion` de Vitest afin que
 *    ces matchers soient reconnus (c'est ce qui corrige ton erreur
 *    "Property 'toBeInTheDocument' does not exist on type 'Assertion'").
 *
 * Attention : on importe bien "/vitest" et pas "@testing-library/jest-dom"
 * tout court, qui est prévu pour Jest.
 */
// import "@testing-library/jest-dom/vitest";

// import { cleanup } from "@testing-library/react";
// import { afterEach } from "vitest";

/**
 * Démonte les composants rendus après chaque test.
 *
 * React Testing Library le fait automatiquement UNIQUEMENT si les
 * "globals" de Vitest sont activés. Comme ce n'est pas notre cas,
 * on le fait explicitement : sans ça, les formulaires des tests
 * précédents resteraient dans le DOM et fausseraient les requêtes
 * (ex. "Found multiple elements").
 */
// afterEach(() => {
//   cleanup();
// });

/**
 * ============================================================
 * Tests du composant ContactForm
 * ============================================================
 *
 * Emplacement : tests/components/ContactForm.test.tsx
 *
 * Outils utilisés :
 * - Vitest                : moteur de tests (describe, it, expect, vi)
 * - React Testing Library : rend le composant et le consulte comme
 *                           un utilisateur (par labels, rôles...)
 * - user-event            : simule de vraies actions (taper, cliquer)
 * - jest-dom              : matchers DOM (toBeInTheDocument, toBeDisabled)
 *                           chargés par vitest.setup.ts
 *
 * Principe général d'un test (méthode "AAA") :
 *   Arrange : préparer (render, état simulé)
 *   Act     : agir (taper, cliquer)
 *   Assert  : vérifier (expect)
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ContactForm from "@/components/contact/ContactForm";

/**
 * ------------------------------------------------------------
 * 1. MOCK DE FORMSPREE
 * ------------------------------------------------------------
 *
 * Un "mock" est un faux objet qui remplace un vrai module.
 * Ici on remplace Formspree pour ne faire AUCUN appel réseau :
 * les tests sont rapides, fiables et ne polluent pas ta boîte mail.
 *
 * vi.hoisted : crée des valeurs utilisables dans vi.mock.
 * Vitest remonte vi.mock tout en haut du fichier, AVANT les `const`.
 * vi.hoisted est remonté aussi, ce qui garantit le bon ordre.
 */
const { formspreeState, submitToFormspree } = vi.hoisted(() => ({
  /**
   * État simulé du hook useForm de Formspree.
   * Les tests le modifient pour simuler envoi / succès / erreur.
   */
  formspreeState: {
    succeeded: false,
    submitting: false,
    errors: null as unknown,
  },

  /**
   * Fonction espion : elle enregistre ses appels
   * (combien de fois, avec quelles données).
   */
  submitToFormspree: vi.fn(),
}));

/**
 * Remplace le module @formspree/react par une version factice.
 * useForm renvoie [état, fonctionDEnvoi], comme le vrai hook.
 *
 * Règle Vitest 5 : vi.mock doit être au niveau racine du fichier
 * (jamais dans un describe ou un it).
 */
vi.mock("@formspree/react", () => ({
  useForm: () => [formspreeState, submitToFormspree],
}));

/**
 * ------------------------------------------------------------
 * 2. DONNÉES ET FONCTIONS UTILITAIRES
 * ------------------------------------------------------------
 *
 * Bonne pratique (DRY : "Don't Repeat Yourself") : les valeurs
 * valides sont définies UNE fois, puis réutilisées partout.
 */
const validData = {
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@example.com",
  subject: "Demande d'information",
  message: "Bonjour, je souhaite obtenir des informations.",
};

/**
 * Remplit le formulaire avec des données valides.
 *
 * `overrides` permet de remplacer UNE valeur pour tester un cas
 * précis (ex. un e-mail invalide) sans réécrire toute la saisie.
 *
 * ATTENTION : cette fonction cherche les champs dans le DOM.
 * Il faut donc appeler render(<ContactForm />) AVANT de l'utiliser,
 * sinon : "Unable to find a label with the text of..." (body vide).
 */
async function fillForm(
  user: ReturnType<typeof userEvent.setup>,
  overrides: Partial<typeof validData> = {},
) {
  const data = { ...validData, ...overrides };

  /**
   * Les regex avec ^ évitent l'ambiguïté : /nom/i trouverait aussi
   * "Prénom" (qui contient "nom") -> "Found multiple elements".
   * ^ force le texte à COMMENCER par le motif.
   */
  await user.type(screen.getByLabelText(/^prénom/i), data.firstName);
  await user.type(screen.getByLabelText(/^nom/i), data.lastName);
  await user.type(screen.getByLabelText(/e-mail/i), data.email);
  await user.type(screen.getByLabelText(/sujet/i), data.subject);
  await user.type(screen.getByLabelText(/message/i), data.message);
}

/**
 * Retrouve le bouton d'envoi.
 *
 * Le texte d'un bouton change souvent pendant l'envoi
 * ("Envoyer" -> "Envoi en cours..."). La regex accepte les deux,
 * ce qui évite un test fragile.
 */
function getSubmitButton() {
  return screen.getByRole("button", { name: /envoyer|envoi en cours/i });
}

/**
 * ------------------------------------------------------------
 * 3. LES TESTS
 * ------------------------------------------------------------
 */
describe("ContactForm", () => {
  beforeEach(() => {
    /**
     * Simule la variable d'environnement de l'identifiant Formspree.
     *
     * Si ton composant la vérifie (comme RegistrationForm), il
     * n'appellerait JAMAIS Formspree sans elle : le test "soumet des
     * données valides" échouerait. .env.local n'est pas lu par Vitest.
     *
     * ⚠ Adapte le NOM à celui de ton composant. Pour le trouver :
     *   Select-String -Path components\contact\ContactForm.tsx -Pattern "process.env"
     * (Si le composant n'utilise aucune variable, cette ligne est inoffensive.)
     */
    vi.stubEnv("FORMSPREE_CONTACT_ID", "test-form-id");

    /**
     * Pas besoin de vi.clearAllMocks() : depuis Vitest 5, l'option
     * `clearMocks` est activée par défaut. L'historique des appels
     * est vidé avant chaque test. Chaque test reste indépendant.
     */

    /**
     * Remet l'état Formspree à zéro pour ne pas "contaminer"
     * les tests suivants (certains le modifient).
     */
    formspreeState.succeeded = false;
    formspreeState.submitting = false;
    formspreeState.errors = null;
  });

  afterEach(() => {
    // Restaure les variables d'environnement d'origine.
    vi.unstubAllEnvs();
  });

  it("affiche les champs principaux du formulaire", () => {
    // Arrange : on affiche le composant dans un faux navigateur (jsdom).
    render(<ContactForm />);

    /**
     * getByLabelText : cherche un champ via le texte de son <label>.
     * Teste aussi l'accessibilité : un champ sans label correct
     * fait échouer le test.
     *
     * Rappel des requêtes :
     *   getBy   : immédiat, erreur si absent
     *   queryBy : immédiat, renvoie null si absent
     *   findBy  : ATTEND, erreur si toujours absent
     */
    expect(screen.getByLabelText(/^prénom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sujet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("affiche le bouton d'envoi", () => {
    render(<ContactForm />);

    /**
     * getByRole : requête recommandée en priorité, car elle reflète
     * ce que perçoivent les utilisateurs et les lecteurs d'écran.
     */
    expect(getSubmitButton()).toBeInTheDocument();
  });

  it("refuse une soumission vide", async () => {
    /**
     * userEvent.setup() doit être appelé AVANT render().
     * Les actions étant asynchrones : `async` + `await`.
     */
    const user = userEvent.setup();

    render(<ContactForm />);

    // Act : clic sur "Envoyer" alors que rien n'est rempli.
    await user.click(getSubmitButton());

    /**
     * findBy... attend l'apparition du message (jusqu'à ~1 s) :
     * la validation Zod est asynchrone.
     */
    expect(
      await screen.findByText(/le prénom doit contenir au moins 2 caractères/i),
    ).toBeInTheDocument();

    /**
     * On vérifie "pas d'appel" APRÈS avoir attendu l'erreur :
     * la validation est alors terminée, l'assertion est fiable.
     */
    expect(submitToFormspree).not.toHaveBeenCalled();
  });

  it("refuse une adresse e-mail invalide", async () => {
    const user = userEvent.setup();

    render(<ContactForm />);

    /**
     * Tout est valide SAUF l'e-mail : un test = une seule raison
     * d'échouer, ce qui facilite le diagnostic.
     */
    await fillForm(user, { email: "email-invalide" });
    await user.click(getSubmitButton());

    expect(
      await screen.findByText(/adresse e-mail valide/i),
    ).toBeInTheDocument();
    expect(submitToFormspree).not.toHaveBeenCalled();
  });

  it("refuse la soumission sans consentement", async () => {
    const user = userEvent.setup();

    render(<ContactForm />);

    // Champs valides, mais la case de consentement n'est PAS cochée.
    await fillForm(user);
    await user.click(getSubmitButton());

    expect(
      await screen.findByText(/accepter la politique de confidentialité/i),
    ).toBeInTheDocument();
    expect(submitToFormspree).not.toHaveBeenCalled();
  });

  it("soumet des données valides à Formspree", async () => {
    const user = userEvent.setup();

    // IMPORTANT : render AVANT fillForm (sinon le DOM est vide).
    render(<ContactForm />);

    await fillForm(user);

    /**
     * getByRole("checkbox") échoue s'il y a plusieurs cases.
     * Tant qu'il n'y en a qu'une, c'est suffisant.
     */
    await user.click(screen.getByRole("checkbox"));
    await user.click(getSubmitButton());

    /**
     * waitFor réessaie l'assertion jusqu'à ce qu'elle passe.
     * Indispensable : la validation est asynchrone, l'appel à
     * Formspree arrive donc un peu APRÈS le clic.
     */
    await waitFor(() => {
      expect(submitToFormspree).toHaveBeenCalledTimes(1);
    });

    /**
     * Vérifie les données transmises à Formspree.
     *
     * Le composant transforme volontairement les données avant l'envoi :
     * - les clés deviennent des libellés français, plus lisibles dans
     *   l'e-mail reçu ;
     * - il ajoute les champs fixes "Type" et "Formulaire", qui
     *   permettent d'identifier l'origine du message ;
     * - `consent` n'est PAS envoyé : il sert uniquement à la validation.
     *
     * Le test vérifie donc ce que Formspree reçoit réellement,
     * et non ce que l'utilisateur a saisi.
     */
    expect(submitToFormspree).toHaveBeenCalledWith({
      Type: "Message de contact",
      Formulaire: "Contact",
      Prénom: validData.firstName,
      Nom: validData.lastName,
      "Adresse e-mail": validData.email,
      Sujet: validData.subject,
      Message: validData.message,
    });
  });

  it("désactive le bouton pendant l'envoi", () => {
    // Arrange : on simule l'envoi en cours AVANT le render.
    // Le composant lira cette valeur via notre faux useForm.
    formspreeState.submitting = true;

    render(<ContactForm />);

    // Empêche l'utilisateur d'envoyer deux fois le formulaire.
    expect(getSubmitButton()).toBeDisabled();
  });

  it("affiche le message de succès après un envoi réussi", () => {
    formspreeState.succeeded = true;

    render(<ContactForm />);

    // Regex : "message", n'importe quoi (.*), puis "envoyé".
    expect(screen.getByText(/message.*envoyé/i)).toBeInTheDocument();
  });
});
