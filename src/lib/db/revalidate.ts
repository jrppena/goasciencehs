import "server-only"

import { revalidatePath } from "next/cache"

export type ContentType = "news" | "faculty" | "site" | "stats"

/**
 * The routes each content type feeds. Admin mutations call
 * `revalidateContent` so the affected public pages rebuild without a deploy.
 */
const REVALIDATE_PATHS: Record<ContentType, Array<[string, "page" | "layout"]>> = {
  news: [
    ["/", "page"],
    ["/about/news-and-announcements", "page"],
    ["/about/news-and-announcements/[slug]", "page"],
  ],
  faculty: [
    ["/", "page"],
    ["/about", "page"],
    ["/faculty-and-staff", "page"],
  ],
  stats: [
    ["/", "page"],
    ["/about", "page"],
  ],
  site: [["/", "layout"]],
}

export function revalidateContent(type: ContentType) {
  for (const [path, kind] of REVALIDATE_PATHS[type]) {
    revalidatePath(path, kind)
  }
}
