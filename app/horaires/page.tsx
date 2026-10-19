import type { Metadata } from "next";

import PageIntro from "@/components/sections/PageIntro";
import { schedules, type ScheduleItem } from "@/lib/data/schedules";

export const metadata: Metadata = {
  title: "Horaires et tarifs",
  description:
    "Consultez les horaires des activités et les informations pratiques de Gym'Association.",
};

/**
 * Regroupe les cours et les pauses par jour.
 *
 * L'ordre des jours correspond à leur première apparition
 * dans les données schedules.
 *
 * L'ordre des créneaux d'une journée est conservé.
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
 * Compte uniquement les cours.
 * Les pauses ne sont pas comptabilisées.
 */
function countCourses(items: ScheduleItem[]): number {
  return items.filter((item) => item.type === "course").length;
}

export default function SchedulesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Informations pratiques"
        title="Horaires et tarifs"
        description="Retrouvez les créneaux proposés par l'association et préparez votre inscription."
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
              Retrouvez les activités, les horaires et les tranches d&rsquo;âge.
              Les pauses entre les cours sont indiquées directement dans le
              planning.
            </p>
          </header>

          {/* Message affiché si aucun horaire n'est renseigné */}
          {schedules.length === 0 ? (
            <div className="rounded-xl border border-dashed p-8 text-center">
              <h3 className="font-semibold">Les horaires arrivent bientôt</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Les créneaux des activités seront publiés dès qu&rsquo;ils
                seront disponibles.
              </p>
            </div>
          ) : (
            /* Une section par jour */
            <div className="space-y-8">
              {Object.entries(schedulesByDay).map(([day, daySchedules]) => {
                const courseCount = countCourses(daySchedules);

                const dayId = `day-${day.toLowerCase().replace(/\s+/g, "-")}`;

                return (
                  <section
                    key={day}
                    aria-labelledby={dayId}
                    className="overflow-hidden rounded-2xl border bg-card shadow-sm"
                  >
                    {/* En-tête de la journée */}
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

                    {/*
                     * Tous les créneaux du jour restent sur
                     * une seule ligne.
                     *
                     * overflow-x-auto permet le défilement
                     * horizontal si nécessaire, notamment
                     * sur les petits écrans.
                     */}
                    <div
                      className="overflow-x-auto"
                      role="region"
                      aria-label={`Créneaux du ${day}`}
                      tabIndex={0}
                    >
                      <div className="flex gap-4 overflow-x-auto p-4 sm:p-6">
                        {daySchedules.map((schedule, index) => {
                          /*
                           * Carte de pause.
                           */
                          if (schedule.type === "break") {
                            return (
                              <article
                                key={`${day}-break-${index}`}
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

                          /*
                           * Carte de cours.
                           */
                          return (
                            <article
                              key={`${day}-${schedule.activity}-${schedule.time}-${index}`}
                              className="flex w-64 shrink-0 flex-col rounded-xl border bg-background p-5 transition-colors hover:border-primary/50"
                            >
                              {/* Horaire */}
                              <p className="text-sm font-semibold text-primary">
                                Horaire
                              </p>

                              <p className="mt-1 text-xl font-bold tracking-tight">
                                {schedule.time}
                              </p>

                              <div className="my-4 border-t" />

                              {/* Activité */}
                              <h4 className="text-lg font-semibold">
                                {schedule.activity}
                              </h4>

                              {/* Informations du cours */}
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
