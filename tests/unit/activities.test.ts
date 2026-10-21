import { describe, expect, it } from "vitest";
import { activities, getActivityBySlug } from "@/lib/data/activities";

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
      expect(activity.description).toBeTruthy();
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
