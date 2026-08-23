import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import type { NewsPost } from "@/lib/news"
import { NewsCard } from "@/components/news/news-card"
import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"
import { Button } from "@/components/ui/button"

function RelatedNews({ posts }: { posts: NewsPost[] }) {
  return (
    <Section
      eyebrow="Keep Reading"
      title="More from the campus"
      className="bg-surface-container-low"
    >
      <RevealGroup className="grid gap-md md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <RevealItem key={post.slug}>
            <NewsCard post={post} className="h-full" />
          </RevealItem>
        ))}
      </RevealGroup>
      <Button
        variant="secondary"
        className="w-fit"
        render={<Link href="/about/news-and-announcements" />}
      >
        All News
        <ArrowRightIcon />
      </Button>
    </Section>
  )
}

export { RelatedNews }
