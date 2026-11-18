import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageIntro from "@/components/sections/PageIntro";

import { getNewsArticleBySlug, newsArticles } from "@/lib/data/news";
import { SITE_NAME, SITE_URL, SITE_OG_IMAGE } from "@/lib/site";

/**
 * Emplacement : app/actualites/[slug]/page.tsx
 *
 * Page dynamique de présentation d'un article.
 *
 * Les informations proviennent de :
 * lib/data/news.ts
 */

interface NewsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Génère les pages statiques des articles existants.
 */
export function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

/**
 * Génère des métadonnées SEO propres à chaque article.
 */
export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  // Un article inexistant ne doit pas être indexé.
  if (!article) {
    return {
      title: "Actualité introuvable",
      description: "Cette actualité n'existe pas ou n'est plus disponible.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageUrl = `${SITE_URL}/actualites/${article.slug}`;

  return {
    title: article.title,
    description: article.excerpt,

    // URL canonique propre à l'article.
    alternates: {
      canonical: `/actualites/${article.slug}`,
    },

    // Aperçu lors du partage sur Facebook, LinkedIn, etc.
    openGraph: {
      type: "article",
      locale: "fr_FR",
      url: pageUrl,
      siteName: SITE_NAME,
      title: `${article.title} | ${SITE_NAME}`,
      description: article.excerpt,
      images: [
        {
          url: SITE_OG_IMAGE,
          alt: `${article.title} - ${SITE_NAME}`,
        },
      ],
    },

    // Aperçu lors du partage sur X.
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | ${SITE_NAME}`,
      description: article.excerpt,
      images: [SITE_OG_IMAGE],
    },
  };
}

/**
 * Affiche le détail d'un article.
 */
export default async function NewsArticlePage({ params }: NewsPageProps) {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  // Affiche la page 404 si l'article n'existe pas.
  if (!article) {
    notFound();
  }

  // Formate la date pour les visiteurs.
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
  }).format(new Date(article.publishedAt));

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
            {formattedDate}
          </time>

          <div className="mt-8">
            <p className="leading-8 text-muted-foreground">{article.content}</p>
          </div>
        </div>
      </article>
    </>
  );
}
