import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getNewsBySlug,
  getPublishedNews,
  getRelatedNews,
} from "@/lib/db/content"
import { ArticleBody } from "@/components/news/article-body"
import { ArticleHeader } from "@/components/news/article-header"
import { RelatedNews } from "@/components/news/related-news"
import { CtaBand } from "@/components/home/cta-band"
import { PageTransition } from "@/components/motion/page-transition"

export async function generateStaticParams() {
  const posts = await getPublishedNews()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/about/news-and-announcements/[slug]">): Promise<Metadata> {
  const post = await getNewsBySlug((await params).slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function NewsPostPage({
  params,
}: PageProps<"/about/news-and-announcements/[slug]">) {
  const post = await getNewsBySlug((await params).slug)
  if (!post) notFound()

  return (
    <PageTransition>
      <ArticleHeader post={post} />
      <ArticleBody post={post} />
      <RelatedNews posts={await getRelatedNews(post)} />
      <CtaBand />
    </PageTransition>
  )
}
