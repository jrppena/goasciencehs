import { NewsHero } from "@/components/news/news-hero"
import { PageTransition } from "@/components/motion/page-transition"

const CHIP_COUNT = 5
const CARD_COUNT = 3

export default function NewsLoading() {
  return (
    <PageTransition>
      <NewsHero />

      <section className="page-gutter flex flex-col gap-md py-xl" role="status">
        <span className="sr-only">Loading…</span>

        <div className="flex flex-wrap gap-xs">
          {Array.from({ length: CHIP_COUNT }, (_, index) => (
            <div
              key={index}
              className="h-8 w-24 animate-pulse rounded-control bg-surface-container"
            />
          ))}
        </div>

        <div className="h-72 w-full animate-pulse rounded-container border border-border bg-card" />

        <div className="grid gap-md md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: CARD_COUNT }, (_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-container border border-border bg-card"
            />
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
