/**
 * Représente une actualité publiée par l'association.
 *
 * Dans la V1, les données sont statiques.
 * Une future version pourra les récupérer depuis une base de données.
 */
export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
}

export const newsArticles: NewsArticle[] = [
  // {
  //   slug: "reprise-des-activites",
  //   title: "Reprise des activités",
  //   excerpt:
  //     "Découvrez les informations concernant la reprise des activités de gymnastique.",
  //   content:
  //     "Les activités de Gym'Association reprennent prochainement. Les différents créneaux sont disponibles sur notre page des horaires.",
  //   publishedAt: "2026-09-01",
  // },
];

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}
