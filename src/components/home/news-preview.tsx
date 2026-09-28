import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { getPublishedNews } from "@/lib/db/content"
import { formatNewsDate } from "@/lib/news"
import { CategoryBadge } from "@/components/news/category-badge"
import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"
import { Button } from "@/components/ui/button"

const PREVIEW_COUNT = 3

async function NewsPreview() {
  const newsPosts = await getPublishedNews()

  return (
    <Section
      eyebrow="News and Announcements"
      title="What is happening on campus"
      className="bg-surface-container-low"
    >
      <RevealGroup as="ul" className="grid gap-md md:grid-cols-3">
        {newsPosts.slice(0, PREVIEW_COUNT).map((post) => (
          <RevealItem
            as="li"
            key={post.slug}
            className="relative border-t border-border pt-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-surface-container-low"
          >
            <div className="flex items-center gap-sm">
              <CategoryBadge category={post.category} variant="outline" />
              <time
                dateTime={post.publishedOn}
                className="font-mono text-label-md uppercase text-muted-foreground"
              >
                {formatNewsDate(post.publishedOn)}
              </time>
            </div>
            <p className="mt-xs text-body-lg text-on-surface">
              <Link
                href={`/about/news-and-announcements/${post.slug}`}
                transitionTypes={["nav-forward"]}
                className="after:absolute after:inset-0 transition-colors hover:text-primary focus-visible:outline-none"
              >
                {post.title}
              </Link>
            </p>
            <p className="mt-xs hidden text-body-md text-muted-foreground md:block">
              {post.excerpt}
            </p>
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
