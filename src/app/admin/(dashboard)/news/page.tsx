import type { Metadata } from "next"
import Link from "next/link"

import { getAdminNews } from "@/lib/db/admin"
import { formatNewsDate, newsCategories, parseNewsCategory } from "@/lib/news"
import {
  buildListHref,
  formatItemCount,
  matchesNewsFilters,
  parseListOption,
  parseListQuery,
} from "@/lib/admin/list-filters"
import { BulkToolbar } from "@/components/admin/bulk-toolbar"
import { ConfirmActionButton } from "@/components/admin/confirm-action-button"
import { ListFilterChips, ListNoMatches } from "@/components/admin/list-chrome"
import { ListFilters } from "@/components/admin/list-filters"
import {
  ListSelectionProvider,
  RowSelectCheckbox,
} from "@/components/admin/list-selection"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DeleteNewsButton } from "./delete-news-button"
import {
  bulkDeleteNewsAction,
  bulkPublishNewsAction,
  bulkUnpublishNewsAction,
  setFeaturedAction,
  setPublishedAction,
} from "./actions"

export const metadata: Metadata = {
  title: "News",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

const BASE_PATH = "/admin/news"
const ITEM_NOUN = { singular: "post", plural: "posts" }

export default async function AdminNewsPage({
  searchParams,
}: PageProps<"/admin/news">) {
  const params = await searchParams
  const filters = {
    q: parseListQuery(params.q),
    status: parseListOption(params.status, ["published", "draft"] as const),
    category: parseNewsCategory(params.category),
  }
  const posts = await getAdminNews()

  // Chip counts follow the query and category; status narrows the rows.
  const matched = posts.filter((post) =>
    matchesNewsFilters(post, { q: filters.q, category: filters.category })
  )
  const counts = {
    all: matched.length,
    published: matched.filter((post) => post.isPublished).length,
    draft: matched.filter((post) => !post.isPublished).length,
  }
  const visible = filters.status
    ? matched.filter(
        (post) => post.isPublished === (filters.status === "published")
      )
    : matched

  const hasFilters = Boolean(filters.q || filters.status || filters.category)
  const filterKey = JSON.stringify(filters)
  const statusHref = (status?: "published" | "draft") =>
    buildListHref(BASE_PATH, {
      q: filters.q,
      category: filters.category,
      status,
    })

  return (
    <div className="flex flex-col gap-lg">
      <header className="flex flex-wrap items-end justify-between gap-md">
        <div className="flex flex-col gap-xs">
          <h1 className="font-display text-headline-lg uppercase text-primary">
            News
          </h1>
          <p className="text-body-md text-muted-foreground">
            Publish advisories and bulletins. Drafts stay hidden from the public
            site.
          </p>
        </div>
        <Button render={<Link href="/admin/news/new" />}>New post</Button>
      </header>

      {posts.length === 0 ? (
        <Card className="px-md">
          <p className="text-body-md text-muted-foreground">
            No posts yet. Create the first one.
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
              searchPlaceholder="Title, excerpt, author, or body"
              select={{
                name: "category",
                label: "Category",
                value: filters.category ?? "",
                allLabel: "All categories",
                options: newsCategories.map((category) => ({
                  value: category,
                  label: category,
                })),
              }}
            />

            <ListFilterChips
              label="Filter posts by status"
              summary={
                hasFilters
                  ? `Showing ${visible.length} of ${formatItemCount(posts.length, ITEM_NOUN)}`
                  : formatItemCount(posts.length, ITEM_NOUN)
              }
              chips={[
                {
                  label: "All",
                  href: statusHref(),
                  count: counts.all,
                  active: !filters.status,
                },
                {
                  label: "Published",
                  href: statusHref("published"),
                  count: counts.published,
                  active: filters.status === "published",
                },
                {
                  label: "Drafts",
                  href: statusHref("draft"),
                  count: counts.draft,
                  active: filters.status === "draft",
                },
              ]}
            />
          </div>

          {visible.length === 0 ? (
            <ListNoMatches
              message="No posts match these filters."
              clearHref={BASE_PATH}
            />
          ) : (
            <ListSelectionProvider key={filterKey}>
              <div className="flex flex-col gap-md">
                <BulkToolbar
                  itemNoun={ITEM_NOUN}
                  visibleIds={visible.map((post) => post._id)}
                  actions={[
                    {
                      kind: "direct",
                      label: "Publish",
                      doneVerb: "published",
                      run: bulkPublishNewsAction,
                    },
                    {
                      kind: "direct",
                      label: "Unpublish",
                      doneVerb: "unpublished",
                      run: bulkUnpublishNewsAction,
                    },
                    {
                      kind: "confirmed",
                      label: "Delete",
                      doneVerb: "deleted",
                      run: bulkDeleteNewsAction,
                    },
                  ]}
                />

                <ul className="flex flex-col gap-sm">
                  {visible.map((post) => (
                    <li key={post._id}>
                      <Card className="px-md">
                        <div className="flex flex-wrap items-center gap-md">
                          <RowSelectCheckbox
                            id={post._id}
                            label={`Select “${post.title}”`}
                          />

                          <div className="flex min-w-0 flex-1 flex-col gap-xs">
                            <Link
                              href={`/admin/news/${post._id}`}
                              title={post.title}
                              className="truncate font-display text-body-lg text-primary hover:underline"
                            >
                              {post.title}
                            </Link>
                            <div className="flex flex-wrap items-center gap-xs">
                              <Badge
                                variant={
                                  post.isPublished ? "primary" : "outline"
                                }
                              >
                                {post.isPublished ? "Published" : "Draft"}
                              </Badge>
                              {post.isFeatured ? (
                                <Badge variant="active">Featured</Badge>
                              ) : null}
                              <span className="font-mono text-label-md text-muted-foreground">
                                {post.category} ·{" "}
                                {formatNewsDate(post.publishedOn)}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-xs">
                            {post.isPublished ? (
                              <ConfirmActionButton
                                action={setPublishedAction.bind(
                                  null,
                                  post._id,
                                  false
                                )}
                                label="Unpublish"
                                ariaLabel={`Unpublish ${post.title}`}
                                confirmLabel={`Unpublish “${post.title}”?`}
                                submitVariant="default"
                              />
                            ) : (
                              <form
                                action={setPublishedAction.bind(
                                  null,
                                  post._id,
                                  true
                                )}
                              >
                                <Button
                                  type="submit"
                                  variant="ghost"
                                  size="sm"
                                >
                                  Publish
                                </Button>
                              </form>
                            )}
                            <form
                              action={setFeaturedAction.bind(
                                null,
                                post._id,
                                !post.isFeatured
                              )}
                            >
                              <Button type="submit" variant="ghost" size="sm">
                                {post.isFeatured ? "Unfeature" : "Feature"}
                              </Button>
                            </form>
                            <Button
                              variant="outline"
                              size="sm"
                              render={<Link href={`/admin/news/${post._id}`} />}
                            >
                              Edit
                            </Button>
                            <DeleteNewsButton id={post._id} title={post.title} />
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
