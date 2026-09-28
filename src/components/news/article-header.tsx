import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { ADVISORY_VERIFICATION_RULE, formatNewsDate, type NewsPost } from "@/lib/news"
import { CategoryBadge } from "@/components/news/category-badge"

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
          <CategoryBadge category={post.category} variant="active" />
        </div>
        <div>
          <h1 className="text-headline-lg-mobile uppercase md:text-headline-lg xl:text-display-lg">
            {post.title}
          </h1>
        </div>
        {post.category === "Advisory" ? (
          <aside
            aria-label="Advisory verification"
            className="flex flex-col gap-xs rounded-container bg-secondary-fixed p-sm text-on-secondary-fixed md:p-md"
          >
            {post.signatoryName && post.signatoryRole ? (
              <p className="font-mono text-label-md uppercase">
                Signed by: {post.signatoryName}, {post.signatoryRole}
              </p>
            ) : null}
            <p className="text-body-md">{ADVISORY_VERIFICATION_RULE}</p>
          </aside>
        ) : null}
        <div>
          <p className="text-body-lg text-primary-fixed">{post.excerpt}</p>
        </div>
        {post.image ? (
          <div className="relative aspect-video overflow-hidden rounded-container border border-border">
            <Image
              src={post.image}
              alt=""
              fill
              sizes="(min-width: 896px) 56rem, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
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
