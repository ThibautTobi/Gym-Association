# Gym'Association

Site web moderne et accessible pour une association de gymnastique.

Le projet a été conçu avec un double objectif :

- répondre aux besoins d'une véritable association sportive ;
- démontrer une démarche professionnelle de développement Frontend avec Next.js, TypeScript, tests automatisés et CI/CD.

---

## 📋 Présentation

Gym'Association est un site web responsive destiné à présenter une association de gymnastique et ses activités.

Le site permet notamment de :

- découvrir l'association ;
- consulter les différentes activités ;
- consulter les horaires ;
- découvrir les actualités ;
- consulter les événements ;
- parcourir la galerie ;
- effectuer une pré-inscription ;
- contacter l'association ;
- consulter les informations légales et la politique de confidentialité.

L'architecture de la première version privilégie volontairement une approche frontend moderne et simple à maintenir.

Le backend métier pourra être ajouté progressivement dans une version ultérieure.

---

## 🎯 Objectifs du projet

Ce projet a été réalisé avec plusieurs objectifs techniques :

- développer une interface responsive ;
- respecter les bonnes pratiques HTML et sémantiques ;
- améliorer l'accessibilité ;
- mettre en place une base SEO solide ;
- valider les données côté client avec Zod ;
- gérer les formulaires avec React Hook Form ;
- utiliser Formspree pour les soumissions de la V1 ;
- mettre en place des tests unitaires ;
- mettre en place des tests end-to-end ;
- automatiser les contrôles avec GitHub Actions ;
- préparer le projet pour un déploiement Vercel.

---

## 🛠️ Stack technique

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Formulaires

- React Hook Form
- Zod
- @hookform/resolvers
- Formspree

### Tests

- Vitest
- Testing Library
- jest-dom
- User Event
- Playwright
- axe-core

### Qualité et automatisation

- ESLint
- TypeScript
- Git
- GitHub
- GitHub Actions

### Déploiement

- Vercel

---

## 🏗️ Architecture

Le projet utilise l'App Router de Next.js.

```text
app/
├── association/
├── activites/
├── horaires/
├── actualites/
├── evenements/
├── galerie/
├── inscription/
├── contact/
├── mentions-legales/
├── confidentialite/
├── page.tsx
├── layout.tsx
├── error.tsx
├── loading.tsx
├── not-found.tsx
├── robots.ts
└── sitemap.ts

components/
├── activities/
├── events/
├── layout/
├── registration/
├── sections/
└── ...

lib/
├── data/
└── validations/

tests/
├── unit/
└── e2e/

.github/
└── workflows/
    └── ci.yml
```
