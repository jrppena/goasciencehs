import type { Metadata } from "next"

import { getPostsByCategory, parseNewsCategory } from "@/lib/news"
import { CategoryFilter } from "@/components/news/category-filter"
import { FeaturedPost } from "@/components/news/featured-post"
import { NewsCard } from "@/components/news/news-card"
import { NewsHero } from "@/components/news/news-hero"
import { CtaBand } from "@/components/home/cta-band"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"
import { PageTransition } from "@/components/motion/page-transition"

export const metadata: Metadata = {
  title: "News and Announcements",
  description:
    "Campus bulletins, admission advisories, and student features from Goa Science High School.",
}

export default async function NewsPage({
  searchParams,
}: PageProps<"/about/news-and-announcements">) {
  const activeCategory = parseNewsCategory((await searchParams).category)
  const [featured, ...rest] = getPostsByCategory(activeCategory)

  return (
    <PageTransition>
      <NewsHero />

      <section className="page-gutter flex flex-col gap-md py-xl">
        <CategoryFilter active={activeCategory} />

        {featured ? (
          <>
            <FeaturedPost post={featured} />
            <RevealGroup className="grid gap-md md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <RevealItem key={post.slug}>
                  <NewsCard post={post} className="h-full" />
                </RevealItem>
              ))}
            </RevealGroup>
          </>
        ) : (
          <p className="text-body-lg text-muted-foreground">
            No posts in this category yet. Try another one.
          </p>
        )}
      </section>

      <CtaBand />
    </PageTransition>
  )
}
