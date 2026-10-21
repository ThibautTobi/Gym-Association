import type { Metadata } from "next";

import NewsCard from "@/components/news/NewsCard";
import PageIntro from "@/components/sections/PageIntro";
import { newsArticles } from "@/lib/data/news";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Retrouvez les dernières actualités de Gym'Association.",
};

export default function NewsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Actualités"
        title="La vie de l'association"
        description="Retrouvez les dernières informations concernant Gym'Association."
      />

      <section aria-labelledby="news-list-title" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="news-list-title" className="sr-only">
            Liste des actualités
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsArticles.map((article) => (
              <NewsCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
