import Link from "next/link"

import { formatNewsDate, type NewsPost } from "@/lib/news"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"
import { cn } from "@/lib/utils"

/**
 * One bulletin in a grid. The title link is stretched over the whole card so
 * the hit area is the card while assistive tech still reads a single link.
 */
function NewsCard({ post, className }: { post: NewsPost; className?: string }) {
  return (
    <Card stripe="none" interactive className={cn("relative", className)}>
      <div className="-mt-md">
        <MediaPlaceholder
          label={`Photo for ${post.title}`}
          className="aspect-[16/9] rounded-none border-0 border-b"
        />
      </div>
      <CardHeader>
        <div className="flex items-center gap-sm">
          <Badge variant="outline">{post.category}</Badge>
          <time
            dateTime={post.publishedOn}
            className="font-mono text-label-md uppercase text-muted-foreground"
          >
            {formatNewsDate(post.publishedOn)}
          </time>
        </div>
        <CardTitle className="text-body-lg">
          <Link
            href={`/about/news-and-announcements/${post.slug}`}
            transitionTypes={["nav-forward"]}
            className="after:absolute after:inset-0 transition-colors hover:text-primary focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription>{post.excerpt}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export { NewsCard }
