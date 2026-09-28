import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import mongoose from "mongoose"

import { connect } from "@/lib/db/connect"
import {
  getAboutStory,
  getAcademicsSettings,
  getCoreValues,
  getLatestAdvisory,
  getLearningAreas,
  getNewsByCategory,
  getNewsBySlug,
  getPublishedNews,
  getRelatedNews,
  getSchoolStats,
  getVisibleFaculty,
  getVisibleTestimonials,
} from "@/lib/db/content"
import { AboutStoryModel } from "@/lib/db/models/about-story"
import { AcademicsSettingsModel } from "@/lib/db/models/academics-settings"
import { CoreSubjectModel } from "@/lib/db/models/core-subject"
import { CoreValueModel } from "@/lib/db/models/core-value"
import { CurriculumShiftStepModel } from "@/lib/db/models/curriculum-shift-step"
import { ElectiveClusterModel } from "@/lib/db/models/elective-cluster"
import { FacultyModel } from "@/lib/db/models/faculty"
import { LearningAreaModel } from "@/lib/db/models/learning-area"
import { MatatagStepModel } from "@/lib/db/models/matatag-step"
import { NewsModel, type NewsPost } from "@/lib/db/models/news"
import { SchoolStatsModel } from "@/lib/db/models/school-stats"
import { ScienceProgramLevelModel } from "@/lib/db/models/science-program-level"
import { TestimonialModel } from "@/lib/db/models/testimonial"

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
  await Promise.all([
    NewsModel.deleteMany({}),
    FacultyModel.deleteMany({}),
    TestimonialModel.deleteMany({}),
    CoreValueModel.deleteMany({}),
    AboutStoryModel.deleteMany({}),
    LearningAreaModel.deleteMany({}),
    ScienceProgramLevelModel.deleteMany({}),
    MatatagStepModel.deleteMany({}),
    CoreSubjectModel.deleteMany({}),
    ElectiveClusterModel.deleteMany({}),
    CurriculumShiftStepModel.deleteMany({}),
    AcademicsSettingsModel.deleteMany({}),
  ])
})

const baseNews: Omit<NewsPost, "slug" | "category" | "publishedOn" | "title"> = {
  excerpt: "An excerpt.",
  author: "Office of the Principal",
  signatoryName: "Ronald Enciso",
  signatoryRole: "Principal",
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

  it("returns the newest in-window Advisory", async (context) => {
    if (!connected) return context.skip()

    const now = new Date("2026-09-29T04:00:00Z") // 2026-09-29 in Asia/Manila

    await NewsModel.create([
      news({ slug: "older-in-window", publishedOn: "2026-09-27" }),
      news({ slug: "newest-in-window", publishedOn: "2026-09-29" }),
      news({ slug: "unpublished", publishedOn: "2026-09-29", isPublished: false }),
      news({ slug: "wrong-category", publishedOn: "2026-09-29", category: "Campus" }),
      news({ slug: "too-old", publishedOn: "2026-09-26" }),
      news({ slug: "future-dated", publishedOn: "2026-09-30" }),
    ])

    await expect(getLatestAdvisory(now)).resolves.toMatchObject({
      slug: "newest-in-window",
    })
  })

  it("returns null when no Advisory is in the window", async (context) => {
    if (!connected) return context.skip()

    const now = new Date("2026-09-29T04:00:00Z")

    await NewsModel.create([news({ slug: "too-old", publishedOn: "2026-09-26" })])

    await expect(getLatestAdvisory(now)).resolves.toBeNull()
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

  it("returns visible testimonials in order", async (context) => {
    if (!connected) return context.skip()

    await TestimonialModel.create([
      { quote: "Third", name: "C", batch: "Batch 2020", now: "Now", order: 3 },
      { quote: "First", name: "A", batch: "Batch 2016", now: "Now", order: 1 },
      {
        quote: "Hidden",
        name: "B",
        batch: "Batch 2018",
        now: "Now",
        isVisible: false,
        order: 0,
      },
    ])

    const visible = await getVisibleTestimonials()

    expect(visible.map((testimonial) => testimonial.quote)).toEqual([
      "First",
      "Third",
    ])
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

  it("returns core values in order", async (context) => {
    if (!connected) return context.skip()

    await CoreValueModel.create([
      { title: "Second", body: "B", order: 2 },
      { title: "First", body: "A", order: 1 },
    ])

    const values = await getCoreValues()

    expect(values.map((value) => value.title)).toEqual(["First", "Second"])
  })

  it("returns the About story", async (context) => {
    if (!connected) return context.skip()

    await AboutStoryModel.create({
      heading: "A heading",
      paragraphs: ["One.", "Two."],
    })

    await expect(getAboutStory()).resolves.toMatchObject({
      heading: "A heading",
      paragraphs: ["One.", "Two."],
    })
  })

  it("returns learning areas in order", async (context) => {
    if (!connected) return context.skip()

    await LearningAreaModel.create([
      { name: "Second", body: "B", order: 2 },
      { name: "First", body: "A", order: 1 },
    ])

    const areas = await getLearningAreas()

    expect(areas.map((area) => area.name)).toEqual(["First", "Second"])
  })

  it("returns the academics settings", async (context) => {
    if (!connected) return context.skip()

    await AcademicsSettingsModel.create({ coreSubjectHours: 160 })

    await expect(getAcademicsSettings()).resolves.toMatchObject({
      coreSubjectHours: 160,
    })
  })
})
