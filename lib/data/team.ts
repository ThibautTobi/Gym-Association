/**
 * Représente un membre de l'équipe de l'association.
 *
 * Les données sont statiques dans la V1.
 * Elles pourront être remplacées plus tard par une base de données.
 */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
}

export const teamMembers: TeamMember[] = [
  // {
  //   id: "marie-dupont",
  //   name: "Marie Dupont",
  //   role: "Présidente",
  //   description:
  //     "Coordonne la vie de l'association et accompagne les différents projets sportifs.",
  // },
];
