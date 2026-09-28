import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import mongoose from "mongoose"

import { connect } from "@/lib/db/connect"
import {
  getNewsByCategory,
  getNewsBySlug,
  getPublishedNews,
  getRelatedNews,
  getSchoolStats,
  getVisibleFaculty,
} from "@/lib/db/content"
import { FacultyModel } from "@/lib/db/models/faculty"
import { NewsModel, type NewsPost } from "@/lib/db/models/news"
import { SchoolStatsModel } from "@/lib/db/models/school-stats"

let connected = false

beforeAll(async () => {
  try {
    await connect()
    connected = true
  } catch {
    console.warn(
      "MongoDB is not reachable — content-layer tests are skipped. Start one (e.g. `docker run -d -p 27017:27017 mongo:8.2`) or set TEST_MONGODB_URI."
    )
  }
})

afterAll(async () => {
  if (connected) await mongoose.connection.dropDatabase()
  await mongoose.disconnect()
})

beforeEach(async () => {
  if (!connected) return
  await Promise.all([NewsModel.deleteMany({}), FacultyModel.deleteMany({})])
})

const baseNews: Omit<NewsPost, "slug" | "category" | "publishedOn" | "title"> = {
  excerpt: "An excerpt.",
  author: "Office of the Principal",
  body: ["A paragraph."],
  isPublished: true,
  isFeatured: false,
}

function news(overrides: Partial<NewsPost> & Pick<NewsPost, "slug" | "publishedOn">) {
  return {
    ...baseNews,
    category: "Advisory" as const,
    title: overrides.slug,
    ...overrides,
  }
}

describe("content layer", () => {
  it("returns only published news, newest first", async (context) => {
    if (!connected) return context.skip()

    await NewsModel.create([
      news({ slug: "old", publishedOn: "2026-01-01" }),
      news({ slug: "newest", publishedOn: "2026-03-01" }),
      news({ slug: "middle", publishedOn: "2026-02-01" }),
      news({ slug: "draft", publishedOn: "2026-04-01", isPublished: false }),
    ])

    const posts = await getPublishedNews()

    expect(posts.map((post) => post.slug)).toEqual(["newest", "middle", "old"])
  })

  it("leads listings with the featured post", async (context) => {
    if (!connected) return context.skip()

    await NewsModel.create([
      news({ slug: "newer", publishedOn: "2026-03-01" }),
      news({ slug: "featured-older", publishedOn: "2026-01-01", isFeatured: true }),
    ])

    const posts = await getPublishedNews()

    expect(posts.map((post) => post.slug)).toEqual(["featured-older", "newer"])
  })

  it("hides unpublished posts from slug lookups", async (context) => {
    if (!connected) return context.skip()

    await NewsModel.create([
      news({ slug: "draft", publishedOn: "2026-01-01", isPublished: false }),
      news({ slug: "live", publishedOn: "2026-01-02" }),
    ])

    await expect(getNewsBySlug("draft")).resolves.toBeNull()
    await expect(getNewsBySlug("live")).resolves.toMatchObject({ slug: "live" })
  })

  it("filters news by category, excluding hidden posts", async (context) => {
    if (!connected) return context.skip()

    await NewsModel.create([
      news({ slug: "advisory", publishedOn: "2026-01-01", category: "Advisory" }),
      news({ slug: "sports", publishedOn: "2026-01-02", category: "Athletics" }),
      news({
        slug: "hidden-sports",
        publishedOn: "2026-01-03",
        category: "Athletics",
        isPublished: false,
      }),
    ])

    const athletics = await getNewsByCategory("Athletics")

    expect(athletics.map((post) => post.slug)).toEqual(["sports"])
  })

  it("puts same-category posts first in related news", async (context) => {
    if (!connected) return context.skip()

    await NewsModel.create([
      news({ slug: "current", publishedOn: "2026-03-01", category: "Advisory" }),
      news({ slug: "same-category", publishedOn: "2026-01-01", category: "Advisory" }),
      news({ slug: "newer-other", publishedOn: "2026-02-01", category: "Campus" }),
    ])

    const current = await getNewsBySlug("current")
    if (!current) throw new Error("fixture was not created")

    const related = await getRelatedNews(current)

    expect(related.map((post) => post.slug)).toEqual(["same-category", "newer-other"])
  })

  it("returns visible faculty only, sorted by order", async (context) => {
    if (!connected) return context.skip()

    await FacultyModel.create([
      { honorific: "Sir", name: "Third", kind: "teaching", order: 3 },
      { honorific: "Ma'am", name: "First", kind: "teaching", order: 1 },
      { honorific: "Ma'am", name: "Hidden", kind: "teaching", order: 0, isVisible: false },
      { honorific: "Sir", name: "Second", kind: "teaching", order: 2 },
    ])

    const teaching = await getVisibleFaculty("teaching")

    expect(teaching.map((member) => member.name)).toEqual(["First", "Second", "Third"])
  })

  it("recomputes facultyAndStaff from visible faculty", async (context) => {
    if (!connected) return context.skip()

    await SchoolStatsModel.create({
      learnersEnrolled: "1",
      facultyAndStaff: "999",
      yearEstablished: "2015",
      collegeProgressionRate: "1%",
    })
    await FacultyModel.create([
      { honorific: "Sir", name: "Head", kind: "head", order: 1 },
      { honorific: "Ma'am", name: "Teacher", kind: "teaching", order: 1 },
      { honorific: "Ma'am", name: "Hidden", kind: "non-teaching", order: 1, isVisible: false },
    ])

    const stats = await getSchoolStats()

    expect(stats.facultyAndStaff).toBe("2")
  })
})
