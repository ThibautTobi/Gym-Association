import type { Metadata } from "next";

import PageIntro from "@/components/sections/PageIntro";

import { schedules, type ScheduleItem } from "@/lib/data/schedules";
import { CURRENT_SEASON, CURRENT_VENUE, SITE_NAME } from "@/lib/site";

/**
 * Emplacement : app/horaires/page.tsx
 *
 * Page des horaires de cours de Gymnastique Val de Saâne.
 *
 * Les horaires proviennent de lib/data/schedules.ts.
 * Le lieu et la saison proviennent de lib/site.ts.
 */

export const metadata: Metadata = {
  title: "Horaires des cours",
  description: `Consultez les horaires des cours de Baby Gym, gymnastique artistique, aérobic sportive, marche active, Pilates et cardio-training de ${SITE_NAME} pour la saison ${CURRENT_SEASON.label}.`,

  alternates: {
    canonical: "/horaires",
  },
};

/**
 * Regroupe les cours et les pauses par jour.
 * L'ordre initial des créneaux est conservé.
 */
const schedulesByDay = schedules.reduce<Record<string, ScheduleItem[]>>(
  (groups, schedule) => {
    if (!groups[schedule.day]) {
      groups[schedule.day] = [];
    }

    groups[schedule.day].push(schedule);

    return groups;
  },
  {},
);

/**
 * Compte uniquement les cours, sans les pauses.
 */
function countCourses(items: ScheduleItem[]): number {
  return items.filter((item) => item.type === "course").length;
}

/**
 * Produit un identifiant utilisable dans les attributs HTML.
 */
function createDayId(day: string): string {
  return `day-${day
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

/**
 * Page des horaires.
 */
export default function SchedulesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Informations pratiques"
        title="Horaires des cours"
        description={`Retrouvez les créneaux proposés par l'association et préparez votre participation pour la saison ${CURRENT_SEASON.label}.`}
        schedule="Consultez les horaires et le lieu de pratique avant de participer aux activités."
      />

      <section aria-labelledby="schedule-title" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Introduction du planning */}
          <header className="mb-10">
            <h2
              id="schedule-title"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Nos créneaux de cours
            </h2>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Retrouvez les activités, les horaires et les tranches d&lsquo;âge.
              Les pauses entre les cours sont indiquées directement dans le
              planning.
            </p>
          </header>

          {/* Lieu de pratique de la saison actuelle */}
          <div className="mb-8 rounded-xl border bg-muted/30 p-5">
            <h3 className="font-semibold">
              Lieu des activités — saison {CURRENT_SEASON.label}
            </h3>

            <address className="mt-2 not-italic text-sm leading-6 text-muted-foreground">
              {CURRENT_VENUE.name}
              <br />
              {CURRENT_VENUE.streetAddress}
              <br />
              {CURRENT_VENUE.postalCode} {CURRENT_VENUE.city}
            </address>

            <p className="mt-3 text-sm text-muted-foreground">
              Le lieu de pratique pourra évoluer pour la saison suivante. Les
              informations seront actualisées lorsque le changement sera
              confirmé.
            </p>
          </div>

          {/* Affichage si aucun horaire n'est renseigné */}
          {schedules.length === 0 ? (
            <div className="rounded-xl border border-dashed p-8 text-center">
              <h3 className="font-semibold">Les horaires arrivent bientôt</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Les créneaux des activités seront publiés dès qu&lsquo;ils
                seront disponibles.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(schedulesByDay).map(([day, daySchedules]) => {
                const courseCount = countCourses(daySchedules);
                const dayId = createDayId(day);

                return (
                  <section
                    key={day}
                    aria-labelledby={dayId}
                    className="overflow-hidden rounded-2xl border bg-card shadow-sm"
                  >
                    {/* En-tête du jour */}
                    <header className="border-b bg-muted/50 px-5 py-4 sm:px-6">
                      <h3 id={dayId} className="text-xl font-bold">
                        {day}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {courseCount}{" "}
                        {courseCount > 1
                          ? "cours programmés"
                          : "cours programmé"}
                      </p>
                    </header>

                    {/* Planning horizontal */}
                    <div
                      className="overflow-x-auto"
                      role="region"
                      aria-label={`Créneaux du ${day}`}
                      tabIndex={0}
                    >
                      <div className="flex min-w-max gap-4 p-4 sm:p-6">
                        {daySchedules.map((schedule, index) => {
                          // Affichage d'une pause.
                          if (schedule.type === "break") {
                            return (
                              <article
                                key={`${day}-break-${schedule.time}-${index}`}
                                className="flex w-52 shrink-0 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/50 p-5 text-center"
                              >
                                <span aria-hidden="true" className="text-2xl">
                                  ☕
                                </span>

                                <h4 className="mt-3 font-semibold">
                                  {schedule.title}
                                </h4>

                                <p className="mt-2 text-sm font-medium text-primary">
                                  {schedule.time}
                                </p>

                                {schedule.description && (
                                  <p className="mt-2 text-sm text-muted-foreground">
                                    {schedule.description}
                                  </p>
                                )}
                              </article>
                            );
                          }

                          // Affichage d'un cours.
                          return (
                            <article
                              key={`${schedule.activitySlug}-${schedule.time}`}
                              className="flex w-64 shrink-0 flex-col rounded-xl border bg-background p-5 transition-colors hover:border-primary/50 motion-reduce:transition-none"
                            >
                              <p className="text-sm font-semibold text-primary">
                                Horaire
                              </p>

                              <p className="mt-1 text-xl font-bold tracking-tight">
                                {schedule.time}
                              </p>

                              <div
                                className="my-4 border-t"
                                aria-hidden="true"
                              />

                              <h4 className="text-lg font-semibold">
                                {schedule.activity}
                              </h4>

                              <dl className="mt-4 space-y-3 text-sm">
                                <div>
                                  <dt className="font-medium">Âge</dt>

                                  <dd className="mt-1 text-muted-foreground">
                                    {schedule.ageRange}
                                  </dd>
                                </div>
                              </dl>
                            </article>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
