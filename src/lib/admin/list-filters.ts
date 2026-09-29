import type { FacultyKind } from "@/lib/faculty"
import type { NewsCategory } from "@/lib/news"

/** Steps the list toolbars understand for the two status dimensions. */
export type NewsListStatus = "published" | "draft"
export type VisibilityStatus = "visible" | "hidden"

export type ListItemNoun = { singular: string; plural: string }

/** Trims and collapses whitespace; array params keep their first value. */
export function parseListQuery(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value
  return (raw ?? "").trim().replace(/\s+/g, " ")
}

/** Narrows an unvalidated query string to one of the offered options. */
export function parseListOption<T extends string>(
  value: string | string[] | undefined,
  options: readonly T[]
): T | undefined {
  const raw = Array.isArray(value) ? value[0] : value
  const candidate = raw?.trim()
  return options.find((option) => option === candidate)
}

/** Rebuilds a list URL from the current params, dropping empties. */
export function buildListHref(
  basePath: string,
  params: Record<string, string | undefined>
): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value)
  }

  const query = search.toString()
  return query ? `${basePath}?${query}` : basePath
}

/** "3 posts", "1 post" — the one place pluralisation is decided. */
export function formatItemCount(count: number, noun: ListItemNoun): string {
  return `${count} ${count === 1 ? noun.singular : noun.plural}`
}

/**
 * Case- and diacritic-insensitive search: every whitespace-separated token in
 * the query must appear somewhere in the joined fields, so "pena suspension"
 * finds "Peña" and "class suspension guidelines".
 */
export function matchesListQuery(
  fields: readonly (string | null | undefined)[],
  query: string
): boolean {
  const tokens = normalizeListText(query).split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return true

  const haystack = normalizeListText(fields.filter(Boolean).join(" "))
  return tokens.every((token) => haystack.includes(token))
}

function normalizeListText(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
}

export type NewsListFilters = {
  q: string
  status?: NewsListStatus
  category?: NewsCategory
}

export function matchesNewsFilters(
  post: {
    title: string
    excerpt: string
    author: string
    body: readonly string[]
    category: string
    isPublished: boolean
  },
  filters: NewsListFilters
): boolean {
  if (filters.category && post.category !== filters.category) return false
  if (filters.status === "published" && !post.isPublished) return false
  if (filters.status === "draft" && post.isPublished) return false

  return matchesListQuery(
    [post.title, post.excerpt, post.author, ...post.body],
    filters.q
  )
}

export type FacultyListFilters = {
  q: string
  visibility?: VisibilityStatus
  kind?: FacultyKind
}

export function matchesFacultyFilters(
  member: {
    honorific: string
    name: string
    position?: string | null
    kind: string
    isVisible: boolean
  },
  filters: FacultyListFilters
): boolean {
  if (filters.kind && member.kind !== filters.kind) return false
  if (filters.visibility === "visible" && !member.isVisible) return false
  if (filters.visibility === "hidden" && member.isVisible) return false

  return matchesListQuery(
    [member.honorific, member.name, member.position],
    filters.q
  )
}

export type TestimonialListFilters = {
  q: string
  visibility?: VisibilityStatus
}

export function matchesTestimonialFilters(
  testimonial: {
    name: string
    batch: string
    quote: string
    isVisible: boolean
  },
  filters: TestimonialListFilters
): boolean {
  if (filters.visibility === "visible" && !testimonial.isVisible) return false
  if (filters.visibility === "hidden" && testimonial.isVisible) return false

  return matchesListQuery(
    [testimonial.name, testimonial.batch, testimonial.quote],
    filters.q
  )
}
