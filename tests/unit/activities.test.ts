import { describe, expect, it } from "vitest";

import { activities, getActivityBySlug } from "@/lib/data/activities";
import { schedules } from "@/lib/data/schedules";

describe("activities", () => {
  it("contient les activités attendues", () => {
    expect(activities.length).toBeGreaterThan(0);
  });

  it("chaque activité possède un slug unique", () => {
    const slugs = activities.map((activity) => activity.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("chaque activité possède les informations essentielles", () => {
    for (const activity of activities) {
      expect(activity.slug).toBeTruthy();
      expect(activity.title).toBeTruthy();
      expect(activity.shortDescription).toBeTruthy();
      expect(activity.description).toBeTruthy();
      expect(activity.ageRange).toBeTruthy();
      expect(activity.level).toBeTruthy();
    }
  });

  it("chaque slug est utilisable dans une URL", () => {
    for (const activity of activities) {
      expect(activity.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("chaque activité possède au moins un bénéfice, sans doublon", () => {
    for (const activity of activities) {
      expect(activity.benefits.length).toBeGreaterThan(0);

      // Les bénéfices servent de `key` React : ils doivent être uniques.
      expect(new Set(activity.benefits).size).toBe(activity.benefits.length);
    }
  });

  it("chaque activité possède une image avec un texte alternatif", () => {
    for (const activity of activities) {
      expect(activity.image.src).toMatch(/^\/images\//);
      expect(activity.image.alt).toBeTruthy();
    }
  });

  it("le lien externe et son titre vont toujours ensemble", () => {
    for (const activity of activities) {
      // Le bouton ne s'affiche que si les deux champs sont présents.
      expect(Boolean(activity.lien)).toBe(Boolean(activity.titreLien));

      if (activity.lien) {
        expect(activity.lien).toMatch(/^https:\/\//);
      }
    }
  });

  it("retourne une activité existante", () => {
    // On prend la première activité de la liste, quel que soit son slug.
    const [firstActivity] = activities;

    const activity = getActivityBySlug(firstActivity.slug);

    expect(activity).toBeDefined();
    expect(activity?.title).toBeTruthy();
  });

  it("retourne undefined pour une activité inexistante", () => {
    const activity = getActivityBySlug("activite-inexistante");

    expect(activity).toBeUndefined();
  });
});

describe("horaires des activités", () => {
  it("chaque cours est rattaché à une activité qui existe", () => {
    const slugs = new Set(activities.map((activity) => activity.slug));

    for (const item of schedules) {
      if (item.type === "course") {
        expect(slugs.has(item.activitySlug)).toBe(true);
      }
    }
  });
});
