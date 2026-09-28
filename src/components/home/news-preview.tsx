import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { getPublishedNews } from "@/lib/db/content"
import { NewsCard } from "@/components/news/news-card"
import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"
import { Button } from "@/components/ui/button"

const PREVIEW_COUNT = 6

async function NewsPreview() {
  const newsPosts = await getPublishedNews()

  return (
    <Section
      eyebrow="News and Announcements"
      title="What is happening on campus"
      className="bg-surface-container-low"
    >
      <RevealGroup className="grid gap-md md:grid-cols-2 lg:grid-cols-3">
        {newsPosts.slice(0, PREVIEW_COUNT).map((post) => (
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

export { NewsPreview }
