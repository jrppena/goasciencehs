import type { Metadata } from "next"
import Link from "next/link"

import { getAdminTestimonials } from "@/lib/db/admin"
import {
  buildListHref,
  formatItemCount,
  matchesTestimonialFilters,
  parseListOption,
  parseListQuery,
} from "@/lib/admin/list-filters"
import { BulkToolbar } from "@/components/admin/bulk-toolbar"
import { ListFilterChips, ListNoMatches } from "@/components/admin/list-chrome"
import { ListFilters } from "@/components/admin/list-filters"
import {
  ListSelectionProvider,
  RowSelectCheckbox,
} from "@/components/admin/list-selection"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DeleteTestimonialButton } from "./delete-testimonial-button"
import {
  bulkDeleteTestimonialAction,
  bulkHideTestimonialAction,
  bulkShowTestimonialAction,
  setTestimonialVisibleAction,
} from "./actions"

export const metadata: Metadata = {
  title: "Testimonials",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

const BASE_PATH = "/admin/testimonials"
const ITEM_NOUN = { singular: "testimonial", plural: "testimonials" }

export default async function AdminTestimonialsPage({
  searchParams,
}: PageProps<"/admin/testimonials">) {
  const params = await searchParams
  const filters = {
    q: parseListQuery(params.q),
    visibility: parseListOption(
      params.visibility,
      ["visible", "hidden"] as const
    ),
  }
  const testimonials = await getAdminTestimonials()

  // Chip counts follow the query; visibility narrows the rows.
  const matched = testimonials.filter((testimonial) =>
    matchesTestimonialFilters(testimonial, { q: filters.q })
  )
  const counts = {
    all: matched.length,
    visible: matched.filter((testimonial) => testimonial.isVisible).length,
    hidden: matched.filter((testimonial) => !testimonial.isVisible).length,
  }
  const visible = filters.visibility
    ? matched.filter(
        (testimonial) =>
          testimonial.isVisible === (filters.visibility === "visible")
      )
    : matched

  const hasFilters = Boolean(filters.q || filters.visibility)
  const filterKey = JSON.stringify(filters)
  const visibilityHref = (visibility?: "visible" | "hidden") =>
    buildListHref(BASE_PATH, { q: filters.q, visibility })

  return (
    <div className="flex flex-col gap-lg">
      <header className="flex flex-wrap items-end justify-between gap-md">
        <div className="flex flex-col gap-xs">
          <h1 className="font-display text-headline-lg uppercase text-primary">
            Testimonials
          </h1>
          <p className="text-body-md text-muted-foreground">
            Alumni quotes for the homepage. Hidden entries stay off the public
            site.
          </p>
        </div>
        <Button render={<Link href="/admin/testimonials/new" />}>
          New testimonial
        </Button>
      </header>

      {testimonials.length === 0 ? (
        <Card className="px-md">
          <p className="text-body-md text-muted-foreground">
            No testimonials yet. Add the first one.
          </p>
        </Card>
      ) : (
        <>
          <div className="flex flex-col gap-md">
            <ListFilters
              key={filterKey}
              basePath={BASE_PATH}
              query={filters.q}
              hasFilters={hasFilters}
              searchPlaceholder="Name, batch, or quote"
            />

            <ListFilterChips
              label="Filter testimonials by visibility"
              summary={
                hasFilters
                  ? `Showing ${visible.length} of ${formatItemCount(testimonials.length, ITEM_NOUN)}`
                  : formatItemCount(testimonials.length, ITEM_NOUN)
              }
              chips={[
                {
                  label: "All",
                  href: visibilityHref(),
                  count: counts.all,
                  active: !filters.visibility,
                },
                {
                  label: "Visible",
                  href: visibilityHref("visible"),
                  count: counts.visible,
                  active: filters.visibility === "visible",
                },
                {
                  label: "Hidden",
                  href: visibilityHref("hidden"),
                  count: counts.hidden,
                  active: filters.visibility === "hidden",
                },
              ]}
            />
          </div>

          {visible.length === 0 ? (
            <ListNoMatches
              message="No testimonials match these filters."
              clearHref={BASE_PATH}
            />
          ) : (
            <ListSelectionProvider key={filterKey}>
              <div className="flex flex-col gap-md">
                <BulkToolbar
                  itemNoun={ITEM_NOUN}
                  visibleIds={visible.map((testimonial) => testimonial._id)}
                  actions={[
                    {
                      kind: "direct",
                      label: "Show",
                      doneVerb: "shown",
                      run: bulkShowTestimonialAction,
                    },
                    {
                      kind: "direct",
                      label: "Hide",
                      doneVerb: "hidden",
                      run: bulkHideTestimonialAction,
                    },
                    {
                      kind: "confirmed",
                      label: "Delete",
                      doneVerb: "deleted",
                      run: bulkDeleteTestimonialAction,
                    },
                  ]}
                />

                <ul className="flex flex-col gap-sm">
                  {visible.map((testimonial) => (
                    <li key={testimonial._id}>
                      <Card className="px-md">
                        <div className="flex flex-wrap items-center gap-md">
                          <RowSelectCheckbox
                            id={testimonial._id}
                            label={`Select ${testimonial.name}`}
                          />

                          <div className="flex min-w-0 flex-1 flex-col gap-xs">
                            <Link
                              href={`/admin/testimonials/${testimonial._id}`}
                              className="font-display text-body-lg text-primary hover:underline"
                            >
                              {testimonial.name}
                            </Link>
                            <p
                              title={testimonial.quote}
                              className="max-w-[48rem] truncate text-body-md text-muted-foreground"
                            >
                              “{testimonial.quote}”
                            </p>
                            <div className="flex flex-wrap items-center gap-xs">
                              <Badge
                                variant={
                                  testimonial.isVisible
                                    ? "primary"
                                    : "outline"
                                }
                              >
                                {testimonial.isVisible ? "Visible" : "Hidden"}
                              </Badge>
                              <span className="font-mono text-label-md text-muted-foreground">
                                {testimonial.batch} — {testimonial.now} · order{" "}
                                {testimonial.order}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-xs">
                            <form
                              action={setTestimonialVisibleAction.bind(
                                null,
                                testimonial._id,
                                !testimonial.isVisible
                              )}
                            >
                              <Button
                                type="submit"
                                variant="ghost"
                                size="sm"
                              >
                                {testimonial.isVisible ? "Hide" : "Show"}
                              </Button>
                            </form>
                            <Button
                              variant="outline"
                              size="sm"
                              render={
                                <Link
                                  href={`/admin/testimonials/${testimonial._id}`}
                                />
                              }
                            >
                              Edit
                            </Button>
                            <DeleteTestimonialButton
                              id={testimonial._id}
                              name={testimonial.name}
                            />
                          </div>
                        </div>
                      </Card>
                    </li>
                  ))}
                </ul>
              </div>
            </ListSelectionProvider>
          )}
        </>
      )}
    </div>
  )
}
