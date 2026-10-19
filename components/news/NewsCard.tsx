import Link from "next/link";

import type { NewsArticle } from "@/lib/data/news";

interface NewsCardProps {
  article: NewsArticle;
}

/**
 * Carte de présentation d'une actualité.
 */
export default function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border bg-card p-6 shadow-sm">
      <time
        dateTime={article.publishedAt}
        className="text-sm text-muted-foreground"
      >
        {new Intl.DateTimeFormat("fr-FR", {
          dateStyle: "long",
        }).format(new Date(article.publishedAt))}
      </time>

      <h2 className="mt-3 text-xl font-semibold">{article.title}</h2>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {article.excerpt}
      </p>

      <Link
        href={`/actualites/${article.slug}`}
        className="mt-auto pt-6 font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Lire l&apos;actualité →
      </Link>
    </article>
  );
}
