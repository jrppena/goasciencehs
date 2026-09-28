import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import mongoose from "mongoose"

import { connect } from "@/lib/db/connect"
import {
  createFaculty,
  createNews,
  deleteFaculty,
  deleteNews,
  getAdminFacultyById,
  getAdminNewsById,
  setFacultyVisible,
  setNewsFeatured,
  setNewsPublished,
  updateFaculty,
  updateNews,
  updateSchoolStats,
  updateSiteSettings,
} from "@/lib/db/admin"
import {
  getPublishedNews,
  getSiteSettings,
  getVisibleFaculty,
} from "@/lib/db/content"
import { FacultyModel, type FacultyMember } from "@/lib/db/models/faculty"
import { NewsModel, type NewsPost } from "@/lib/db/models/news"
import { SchoolStatsModel } from "@/lib/db/models/school-stats"
import { SiteSettingsModel } from "@/lib/db/models/site-settings"

let connected = false

beforeAll(async () => {
  try {
    await connect()
    await NewsModel.init()
    connected = true
  } catch {
    console.warn(
      "MongoDB is not reachable — admin news tests are skipped. Start one (e.g. `docker run -d -p 27017:27017 mongo:8.2`) or set TEST_MONGODB_URI."
    )
  }
})

afterAll(async () => {
  if (connected) await mongoose.connection.dropDatabase()
  await mongoose.disconnect()
})

beforeEach(async () => {
  if (connected) {
    await Promise.all([
      NewsModel.deleteMany({}),
      FacultyModel.deleteMany({}),
      SiteSettingsModel.deleteMany({}),
      SchoolStatsModel.deleteMany({}),
    ])
  }
})

const input: NewsPost = {
  slug: "a-post",
  category: "Advisory",
  publishedOn: "2026-01-01",
  title: "A post",
  excerpt: "An excerpt.",
  author: "Office of the Principal",
  body: ["First paragraph."],
  isPublished: true,
  isFeatured: false,
}

describe("admin news operations", () => {
  it("rejects invalid input before touching the database", async () => {
    await expect(createNews({ ...input, title: "" })).rejects.toMatchObject({
      name: "ValidationError",
    })
  })

  it("returns null for an invalid id without querying", async () => {
    await expect(getAdminNewsById("not-an-object-id")).resolves.toBeNull()
  })

  it("publish toggle changes public visibility", async (context) => {
    if (!connected) return context.skip()

    const post = await createNews(input)

    await setNewsPublished(post._id, false)
    expect(await getPublishedNews()).toEqual([])

    await setNewsPublished(post._id, true)
    expect((await getPublishedNews()).map((candidate) => candidate.slug)).toEqual(
      ["a-post"]
    )
  })

  it("keeps a single featured post", async (context) => {
    if (!connected) return context.skip()

    const first = await createNews({ ...input, slug: "first" })
    const second = await createNews({ ...input, slug: "second" })

    await setNewsFeatured(first._id, true)
    await setNewsFeatured(second._id, true)

    const featured = await NewsModel.find({ isFeatured: true }).lean()
    expect(featured.map((post) => post.slug)).toEqual(["second"])
  })

  it("rejects a duplicate slug", async (context) => {
    if (!connected) return context.skip()

    await createNews(input)

    await expect(createNews(input)).rejects.toMatchObject({ code: 11000 })
  })

  it("updates and deletes a post", async (context) => {
    if (!connected) return context.skip()

    const created = await createNews(input)
    const updated = await updateNews(created._id, {
      ...input,
      title: "Updated title",
    })

    expect(updated?.title).toBe("Updated title")
    await expect(getAdminNewsById(created._id)).resolves.toMatchObject({
      title: "Updated title",
    })

    await deleteNews(created._id)
    await expect(getAdminNewsById(created._id)).resolves.toBeNull()
  })
})

const facultyInput: FacultyMember = {
  honorific: "Ma'am",
  name: "Test Teacher",
  position: null,
  email: null,
  room: null,
  subjects: null,
  photo: null,
  kind: "teaching",
  isVisible: true,
  order: 1,
}

describe("admin faculty operations", () => {
  it("visibility toggle changes the public listing", async (context) => {
    if (!connected) return context.skip()

    const member = await createFaculty(facultyInput)

    await setFacultyVisible(member._id, false)
    await expect(getVisibleFaculty()).resolves.toEqual([])

    await setFacultyVisible(member._id, true)
    await expect(getVisibleFaculty()).resolves.toMatchObject([
      { name: "Test Teacher" },
    ])
  })

  it("order controls the public display order", async (context) => {
    if (!connected) return context.skip()

    await createFaculty({ ...facultyInput, name: "Second", order: 2 })
    await createFaculty({ ...facultyInput, name: "First", order: 1 })

    const teaching = await getVisibleFaculty("teaching")

    expect(teaching.map((member) => member.name)).toEqual(["First", "Second"])
  })

  it("updates and deletes a member", async (context) => {
    if (!connected) return context.skip()

    const created = await createFaculty(facultyInput)
    const updated = await updateFaculty(created._id, {
      ...facultyInput,
      name: "Renamed Teacher",
    })

    expect(updated?.name).toBe("Renamed Teacher")
    await expect(getAdminFacultyById(created._id)).resolves.toMatchObject({
      name: "Renamed Teacher",
    })

    await deleteFaculty(created._id)
    await expect(getAdminFacultyById(created._id)).resolves.toBeNull()
  })
})

const settingsInput = {
  name: "Goa Science High School",
  shortName: "GSHS",
  tagline: "Tagline",
  description: "Description",
  address: "Address",
  phone: "+63 54 453 1234",
  email: "info@goasciencehs.edu.ph",
  socials: [{ label: "Facebook", href: "https://facebook.com" }],
}

describe("admin settings operations", () => {
  it("upserts site settings and reads them back publicly", async (context) => {
    if (!connected) return context.skip()

    await updateSiteSettings(settingsInput)
    await expect(getSiteSettings()).resolves.toMatchObject({
      name: "Goa Science High School",
      socials: [{ label: "Facebook", href: "https://facebook.com" }],
    })

    await updateSiteSettings({ ...settingsInput, name: "Renamed School" })

    await expect(SiteSettingsModel.countDocuments({})).resolves.toBe(1)
    await expect(getSiteSettings()).resolves.toMatchObject({
      name: "Renamed School",
    })
  })

  it("recomputes facultyAndStaff from visible faculty", async (context) => {
    if (!connected) return context.skip()

    await createFaculty({ ...facultyInput, name: "Visible One" })
    await createFaculty({ ...facultyInput, name: "Visible Two" })
    await createFaculty({
      ...facultyInput,
      name: "Hidden",
      isVisible: false,
    })

    await updateSchoolStats({
      learnersEnrolled: "1,240",
      yearEstablished: "2015",
      collegeProgressionRate: "97%",
    })

    const stored = await SchoolStatsModel.findOne({}).lean()
    expect(stored?.facultyAndStaff).toBe("2")
    await expect(SchoolStatsModel.countDocuments({})).resolves.toBe(1)
  })
})
