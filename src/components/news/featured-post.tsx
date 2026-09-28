import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { formatNewsDate, type NewsPost } from "@/lib/news"
import { CategoryBadge } from "@/components/news/category-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"
import { Reveal } from "@/components/motion/reveal"

/** The newest bulletin, given the width the grid cards do not get. */
function FeaturedPost({ post }: { post: NewsPost }) {
  return (
    <Reveal
      as="article"
      className="grid gap-md overflow-hidden rounded-container border border-border border-t-4 border-t-primary bg-card lg:grid-cols-2 lg:gap-0"
    >
      <MediaPlaceholder className="aspect-[16/9] rounded-none border-0 border-b lg:aspect-auto lg:h-full lg:border-b-0 lg:border-r" />
      <div className="flex flex-col items-start gap-md p-md lg:p-lg">
        <div className="flex items-center gap-sm">
          <Badge variant="active">Latest</Badge>
          <CategoryBadge category={post.category} variant="outline" />
          <time
            dateTime={post.publishedOn}
            className="font-mono text-label-md uppercase text-muted-foreground"
          >
            {formatNewsDate(post.publishedOn)}
          </time>
        </div>
        <h2 className="text-headline-lg-mobile uppercase md:text-headline-lg">
          {post.title}
        </h2>
        <p className="text-body-lg text-muted-foreground">{post.excerpt}</p>
        <Button
          render={
            <Link
              href={`/about/news-and-announcements/${post.slug}`}
              transitionTypes={["nav-forward"]}
            />
          }
        >
          Read the full story
          <ArrowRightIcon />
        </Button>
      </div>
    </Reveal>
  )
}

export { FeaturedPost }
