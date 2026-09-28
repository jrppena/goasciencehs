import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { formatNewsDate, type NewsPost } from "@/lib/news"
import { Badge } from "@/components/ui/badge"

/** Title block of a single bulletin: where you are, what it is, who wrote it. */
function ArticleHeader({ post }: { post: NewsPost }) {
  return (
    <section className="relative overflow-hidden bg-primary text-on-primary">
      <div
        aria-hidden="true"
        className="speed-lines-bold speed-lines-drift-bold absolute inset-0 opacity-10"
      />
      {/* Above the fold: no reveal wrappers, so there's no server-rendered
          opacity:0 blocking the article header before JS hydrates. */}
      <div className="page-gutter relative mx-auto flex max-w-4xl flex-col gap-md py-xl">
        <div>
          <Link
            href="/about/news-and-announcements"
            transitionTypes={["nav-back"]}
            className="flex w-fit items-center gap-xs font-mono text-label-md uppercase text-primary-fixed transition-colors hover:text-on-primary"
          >
            <ArrowLeftIcon className="size-4" aria-hidden="true" />
            All News
          </Link>
        </div>
        <div>
          <Badge variant="active" className="w-fit">
            {post.category}
          </Badge>
        </div>
        <div>
          <h1 className="text-headline-lg-mobile uppercase md:text-headline-lg xl:text-display-lg">
            {post.title}
          </h1>
        </div>
        <div>
          <p className="text-body-lg text-primary-fixed">{post.excerpt}</p>
        </div>
        <div className="flex flex-wrap items-center gap-sm font-mono text-label-md uppercase text-primary-fixed-dim">
          <span>{post.author}</span>
          <span aria-hidden="true">/</span>
          <time dateTime={post.publishedOn}>
            {formatNewsDate(post.publishedOn)}
          </time>
        </div>
      </div>
    </section>
  )
}

export { ArticleHeader }
