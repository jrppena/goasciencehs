import "server-only"

import { connect } from "@/lib/db/connect"
import { FacultyModel } from "@/lib/db/models/faculty"
import { NewsModel } from "@/lib/db/models/news"

/** Dashboard counts. Unlike the public data layer, these include hidden records. */
export async function getAdminCounts() {
  await connect()

  const [news, publishedNews, faculty, visibleFaculty] = await Promise.all([
    NewsModel.countDocuments({}),
    NewsModel.countDocuments({ isPublished: true }),
    FacultyModel.countDocuments({}),
    FacultyModel.countDocuments({ isVisible: true }),
  ])

  return {
    news: { total: news, published: publishedNews },
    faculty: { total: faculty, visible: visibleFaculty },
  }
}
