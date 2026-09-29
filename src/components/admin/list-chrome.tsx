import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type ListFilterChip = {
  label: string
  href: string
  count: number
  active: boolean
}

/**
 * Status/visibility filter chips with counts, plus the result summary. Plain
 * links carrying query params, so every filtered view has its own URL.
 */
function ListFilterChips({
  label,
  chips,
  summary,
}: {
  /** Accessible name for the chip group, e.g. "Filter posts by status". */
  label: string
  chips: ListFilterChip[]
  summary: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-sm">
      <nav aria-label={label}>
        <ul className="flex flex-wrap gap-sm">
          {chips.map((chip) => (
            <li key={chip.label}>
              <Badge
                variant={chip.active ? "active" : "outline"}
                aria-current={chip.active ? "true" : undefined}
                render={<Link href={chip.href} />}
              >
                {chip.label} ({chip.count})
              </Badge>
            </li>
          ))}
        </ul>
      </nav>
      <p className="ml-auto font-mono text-label-md uppercase text-muted-foreground">
        {summary}
      </p>
    </div>
  )
}

/** What a list shows when filters match nothing — with the way back out. */
function ListNoMatches({
  message,
  clearHref,
}: {
  message: string
  clearHref: string
}) {
  return (
    <Card className="px-md py-sm">
      <div className="flex flex-wrap items-center justify-between gap-md">
        <p className="text-body-md text-muted-foreground">{message}</p>
        <Button
          variant="outline"
          size="sm"
          render={<Link href={clearHref} />}
        >
          Clear filters
        </Button>
      </div>
    </Card>
  )
}

export { ListFilterChips, ListNoMatches }
