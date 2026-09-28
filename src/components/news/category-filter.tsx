import Link from "next/link"

import { newsCategories, type NewsCategory } from "@/lib/news"
import { Badge } from "@/components/ui/badge"

export const NEWS_PATH = "/about/news-and-announcements"

/**
 * Filter chips. Plain links carrying a `category` query param, so filtering
 * works without client-side JavaScript and every view has its own URL.
 */
function CategoryFilter({ active }: { active?: NewsCategory }) {
  return (
    <nav aria-label="Filter news by category">
      <ul className="flex flex-wrap gap-sm">
        <li>
          <Badge
            variant={active ? "outline" : "active"}
            aria-current={active ? undefined : "true"}
            render={<Link href={NEWS_PATH} />}
          >
            All
          </Badge>
        </li>
        {newsCategories.map((category) => (
          <li key={category}>
            <Badge
              variant={active === category ? "active" : "outline"}
              aria-current={active === category ? "true" : undefined}
              render={<Link href={`${NEWS_PATH}?category=${category}`} />}
            >
              {category}
            </Badge>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export { CategoryFilter }
