import type { Metadata } from "next"
import Link from "next/link"

import { getAdminFaculty } from "@/lib/db/admin"
import { FACULTY_PENDING, facultyKindLabels } from "@/lib/faculty"
import {
  buildListHref,
  formatItemCount,
  matchesFacultyFilters,
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
import { DeleteFacultyButton } from "./delete-faculty-button"
import {
  bulkDeleteFacultyAction,
  bulkHideFacultyAction,
  bulkShowFacultyAction,
  setFacultyVisibleAction,
} from "./actions"

export const metadata: Metadata = {
  title: "Faculty and Staff",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

const BASE_PATH = "/admin/faculty"
const ITEM_NOUN = { singular: "member", plural: "members" }

export default async function AdminFacultyPage({
  searchParams,
}: PageProps<"/admin/faculty">) {
  const params = await searchParams
  const kinds = Object.keys(facultyKindLabels) as Array<
    keyof typeof facultyKindLabels
  >
  const filters = {
    q: parseListQuery(params.q),
    visibility: parseListOption(
      params.visibility,
      ["visible", "hidden"] as const
    ),
    kind: parseListOption(params.kind, kinds),
  }
  const members = await getAdminFaculty()

  // Chip counts follow the query and group; visibility narrows the rows.
  const matched = members.filter((member) =>
    matchesFacultyFilters(member, { q: filters.q, kind: filters.kind })
  )
  const counts = {
    all: matched.length,
    visible: matched.filter((member) => member.isVisible).length,
    hidden: matched.filter((member) => !member.isVisible).length,
  }
  const visible = filters.visibility
    ? matched.filter(
        (member) => member.isVisible === (filters.visibility === "visible")
      )
    : matched

  const hasFilters = Boolean(filters.q || filters.visibility || filters.kind)
  const filterKey = JSON.stringify(filters)
  const visibilityHref = (visibility?: "visible" | "hidden") =>
    buildListHref(BASE_PATH, {
      q: filters.q,
      kind: filters.kind,
      visibility,
    })

  return (
    <div className="flex flex-col gap-lg">
      <header className="flex flex-wrap items-end justify-between gap-md">
        <div className="flex flex-col gap-xs">
          <h1 className="font-display text-headline-lg uppercase text-primary">
            Faculty and Staff
          </h1>
          <p className="text-body-md text-muted-foreground">
            The school head, teaching personnel, and the front office. Hidden
            members stay off the public site.
          </p>
        </div>
        <Button render={<Link href="/admin/faculty/new" />}>New member</Button>
      </header>

      {members.length > 0 ? (
        <div className="flex flex-col gap-md">
          <ListFilters
            key={filterKey}
            basePath={BASE_PATH}
            query={filters.q}
            hasFilters={hasFilters}
            searchPlaceholder="Name, honorific, or position"
            select={{
              name: "kind",
              label: "Group",
              value: filters.kind ?? "",
              allLabel: "All groups",
              options: kinds.map((kind) => ({
                value: kind,
                label: facultyKindLabels[kind],
              })),
            }}
          />

          <ListFilterChips
            label="Filter personnel by visibility"
            summary={
              hasFilters
                ? `Showing ${visible.length} of ${formatItemCount(members.length, ITEM_NOUN)}`
                : formatItemCount(members.length, ITEM_NOUN)
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
      ) : null}

      {hasFilters && visible.length === 0 ? (
        <ListNoMatches
          message="No personnel match these filters."
          clearHref={BASE_PATH}
        />
      ) : (
        <ListSelectionProvider key={filterKey}>
          <div className="flex flex-col gap-md">
            {visible.length > 0 ? (
              <BulkToolbar
                itemNoun={ITEM_NOUN}
                visibleIds={visible.map((member) => member._id)}
                actions={[
                  {
                    kind: "direct",
                    label: "Show",
                    doneVerb: "shown",
                    run: bulkShowFacultyAction,
                  },
                  {
                    kind: "direct",
                    label: "Hide",
                    doneVerb: "hidden",
                    run: bulkHideFacultyAction,
                  },
                  {
                    kind: "confirmed",
                    label: "Delete",
                    doneVerb: "deleted",
                    run: bulkDeleteFacultyAction,
                  },
                ]}
              />
            ) : null}

            {kinds.map((kind) => {
              const group = visible.filter((member) => member.kind === kind)
              if (hasFilters && group.length === 0) return null

              return (
                <section key={kind} className="flex flex-col gap-sm">
                  <h2 className="font-display text-headline-md uppercase text-primary">
                    {facultyKindLabels[kind]}
                  </h2>

                  {group.length === 0 ? (
                    <Card className="px-md">
                      <p className="text-body-md text-muted-foreground">
                        No members in this group yet.
                      </p>
                    </Card>
                  ) : (
                    <ul className="flex flex-col gap-sm">
                      {group.map((member) => (
                        <li key={member._id}>
                          <Card className="px-md">
                            <div className="flex flex-wrap items-center gap-md">
                              <RowSelectCheckbox
                                id={member._id}
                                label={`Select ${member.honorific} ${member.name}`}
                              />

                              <div className="flex min-w-0 flex-1 flex-col gap-xs">
                                <Link
                                  href={`/admin/faculty/${member._id}`}
                                  title={`${member.honorific} ${member.name}`}
                                  className="truncate font-display text-body-lg text-primary hover:underline"
                                >
                                  {member.honorific} {member.name}
                                </Link>
                                <div className="flex flex-wrap items-center gap-xs">
                                  <Badge
                                    variant={
                                      member.isVisible ? "primary" : "outline"
                                    }
                                  >
                                    {member.isVisible ? "Visible" : "Hidden"}
                                  </Badge>
                                  <span className="font-mono text-label-md text-muted-foreground">
                                    {member.position ?? FACULTY_PENDING} · order{" "}
                                    {member.order}
                                  </span>
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-xs">
                                <form
                                  action={setFacultyVisibleAction.bind(
                                    null,
                                    member._id,
                                    !member.isVisible
                                  )}
                                >
                                  <Button
                                    type="submit"
                                    variant="ghost"
                                    size="sm"
                                  >
                                    {member.isVisible ? "Hide" : "Show"}
                                  </Button>
                                </form>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  render={
                                    <Link href={`/admin/faculty/${member._id}`} />
                                  }
                                >
                                  Edit
                                </Button>
                                <DeleteFacultyButton
                                  id={member._id}
                                  name={`${member.honorific} ${member.name}`}
                                />
                              </div>
                            </div>
                          </Card>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              )
            })}
          </div>
        </ListSelectionProvider>
      )}
    </div>
  )
}
