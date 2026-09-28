import Link from "next/link"

import { NEWS_PATH } from "@/components/news/category-filter"
import { getLatestAdvisory } from "@/lib/db/content"
import { formatNewsDate } from "@/lib/news"

/** The most recent in-window Advisory, surfaced above the page content. */
async function AdvisoryStrip() {
  const advisory = await getLatestAdvisory()
  if (!advisory) return null

  return (
    <aside
      aria-label="Latest advisory"
      className="border-b bg-secondary-fixed text-on-secondary-fixed"
    >
      <div className="page-gutter flex flex-col gap-xs py-base md:flex-row md:items-center md:gap-sm">
        <p className="shrink-0 font-mono text-label-md uppercase">
          Advisory ·{" "}
          <time dateTime={advisory.publishedOn}>
            {formatNewsDate(advisory.publishedOn)}
          </time>
        </p>
        <Link
          href={`${NEWS_PATH}/${advisory.slug}`}
          className="underline underline-offset-4 transition-colors duration-fast hover:text-on-secondary-fixed-variant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-secondary-fixed"
        >
          {advisory.title}
        </Link>
      </div>
    </aside>
  )
}

export { AdvisoryStrip }
