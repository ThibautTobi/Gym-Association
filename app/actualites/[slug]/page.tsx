import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageIntro from "@/components/sections/PageIntro";
import { getNewsArticleBySlug, newsArticles } from "@/lib/data/news";

interface NewsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;

  const article = getNewsArticleBySlug(slug);

  if (!article) {
    return {
      title: "Actualité introuvable",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function NewsArticlePage({ params }: NewsPageProps) {
  const { slug } = await params;

  const article = getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <PageIntro
        eyebrow="Actualité"
        title={article.title}
        description={article.excerpt}
      />

      <article className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <time
            dateTime={article.publishedAt}
            className="text-sm text-muted-foreground"
          >
            {new Intl.DateTimeFormat("fr-FR", {
              dateStyle: "long",
            }).format(new Date(article.publishedAt))}
          </time>

          <div className="mt-8">
            <p className="leading-8 text-muted-foreground">{article.content}</p>
          </div>
        </div>
      </article>
    </>
  );
}
