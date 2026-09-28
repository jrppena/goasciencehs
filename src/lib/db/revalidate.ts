import "server-only"

import { revalidatePath } from "next/cache"

export type ContentType =
  | "news"
  | "faculty"
  | "testimonials"
  | "about"
  | "site"
  | "stats"

/**
 * Admin mutations call this after a save. A change can surface in the shared
 * chrome, home previews, listings, and detail pages at once, and page-level
 * revalidation does not reliably reach pages inside route groups from Server
 * Actions — so invalidate the root layout: every cached page rebuilds on its
 * next visit. The type names what changed for call sites and future tuning.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept for call-site intent; see the comment above
export function revalidateContent(_type: ContentType) {
  revalidatePath("/", "layout")
}
