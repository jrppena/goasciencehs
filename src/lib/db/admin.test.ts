import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import mongoose from "mongoose"

import { connect } from "@/lib/db/connect"
import {
  createCoreValue,
  createElectiveCluster,
  createFaculty,
  createNews,
  createScienceProgramLevel,
  createTestimonial,
  deleteCoreValue,
  deleteFaculty,
  deleteNews,
  deleteTestimonial,
  getAdminCoreValueById,
  getAdminCoreValues,
  getAdminFacultyById,
  getAdminNewsById,
  getAdminScienceProgramLevels,
  getAdminTestimonialById,
  setFacultyVisible,
  setNewsFeatured,
  setNewsPublished,
  setTestimonialVisible,
  updateAboutStory,
  updateAcademicsSettings,
  updateCoreValue,
  updateFaculty,
  updateNews,
  updateSchoolStats,
  updateScienceProgramLevel,
  updateSiteSettings,
  updateTestimonial,
} from "@/lib/db/admin"
import {
  getAboutStory,
  getAcademicsSettings,
  getElectiveClusters,
  getPublishedNews,
  getScienceProgramLevels,
  getSiteSettings,
  getVisibleFaculty,
  getVisibleTestimonials,
} from "@/lib/db/content"
import { AboutStoryModel } from "@/lib/db/models/about-story"
import { AcademicsSettingsModel } from "@/lib/db/models/academics-settings"
import { CoreSubjectModel } from "@/lib/db/models/core-subject"
import { CoreValueModel } from "@/lib/db/models/core-value"
import { CurriculumShiftStepModel } from "@/lib/db/models/curriculum-shift-step"
import {
  ElectiveClusterModel,
  type ElectiveCluster,
} from "@/lib/db/models/elective-cluster"
import { FacultyModel, type FacultyMember } from "@/lib/db/models/faculty"
import { LearningAreaModel } from "@/lib/db/models/learning-area"
import { MatatagStepModel } from "@/lib/db/models/matatag-step"
import { NewsModel, type NewsPost } from "@/lib/db/models/news"
import { SchoolStatsModel } from "@/lib/db/models/school-stats"
import {
  ScienceProgramLevelModel,
  type ScienceProgramLevel,
} from "@/lib/db/models/science-program-level"
import { SiteSettingsModel } from "@/lib/db/models/site-settings"
import {
  TestimonialModel,
  type Testimonial,
} from "@/lib/db/models/testimonial"

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

const testimonialInput: Testimonial = {
  quote: "A quote from an alumna.",
  name: "Alumna Name",
  batch: "Batch 2016",
  now: "Medical Technologist",
  isVisible: true,
  order: 1,
}

describe("admin testimonial operations", () => {
  it("visibility toggle changes the public listing", async (context) => {
    if (!connected) return context.skip()

    const created = await createTestimonial(testimonialInput)

    await setTestimonialVisible(created._id, false)
    await expect(getVisibleTestimonials()).resolves.toEqual([])

    await setTestimonialVisible(created._id, true)
    await expect(getVisibleTestimonials()).resolves.toMatchObject([
      { quote: "A quote from an alumna." },
    ])
  })

  it("updates and deletes a testimonial", async (context) => {
    if (!connected) return context.skip()

    const created = await createTestimonial(testimonialInput)
    const updated = await updateTestimonial(created._id, {
      ...testimonialInput,
      name: "Renamed Alumna",
    })

    expect(updated?.name).toBe("Renamed Alumna")
    await expect(getAdminTestimonialById(created._id)).resolves.toMatchObject({
      name: "Renamed Alumna",
    })

    await deleteTestimonial(created._id)
    await expect(getAdminTestimonialById(created._id)).resolves.toBeNull()
  })
})

describe("admin about operations", () => {
  it("creates, updates, and deletes a core value", async (context) => {
    if (!connected) return context.skip()

    await createCoreValue({
      icon: "Compass",
      title: "Discipline",
      body: "Show up, prepare, follow through.",
      order: 4,
    })

    const [created] = await getAdminCoreValues()
    expect(created?.title).toBe("Discipline")

    await updateCoreValue(created._id, {
      icon: "ShieldCheck",
      title: "Discipline (revised)",
      body: "Updated body.",
      order: 1,
    })

    await expect(getAdminCoreValueById(created._id)).resolves.toMatchObject({
      title: "Discipline (revised)",
      icon: "ShieldCheck",
      order: 1,
    })

    await deleteCoreValue(created._id)
    await expect(getAdminCoreValueById(created._id)).resolves.toBeNull()
  })

  it("upserts the About story without duplicating it", async (context) => {
    if (!connected) return context.skip()

    await updateAboutStory({ heading: "First", paragraphs: ["One."] })
    await updateAboutStory({ heading: "Second", paragraphs: ["Two."] })

    await expect(AboutStoryModel.countDocuments({})).resolves.toBe(1)
    await expect(getAboutStory()).resolves.toMatchObject({
      heading: "Second",
      paragraphs: ["Two."],
    })
  })
})

const scienceLevelInput: ScienceProgramLevel = {
  grade: "Grade 7",
  specialisation: "Environmental Science",
  summary: "Ecosystems, water and soil quality, and waste.",
  work: [
    "Field sampling and data collection",
    "Research 1: the nature of scientific investigation",
  ],
  tone: "primary",
  order: 1,
}

const electiveClusterInput: ElectiveCluster = {
  name: "Field Experience",
  summary: "Optional in the Academic Track.",
  subjects: [
    "Apprenticeship with a partner laboratory, clinic, or firm",
    "Supervised community and outreach work",
  ],
  pathways: "Any cluster",
  tone: "primary",
  order: 1,
}

describe("admin academics operations", () => {
  it("round-trips a science program level's work array and tone", async (context) => {
    if (!connected) return context.skip()

    await createScienceProgramLevel(scienceLevelInput)
    const [created] = await getAdminScienceProgramLevels()

    await expect(getScienceProgramLevels()).resolves.toMatchObject([
      {
        grade: "Grade 7",
        work: [
          "Field sampling and data collection",
          "Research 1: the nature of scientific investigation",
        ],
        tone: "primary",
      },
    ])

    await expect(
      updateScienceProgramLevel(created._id, {
        ...scienceLevelInput,
        work: ["Culture and sterile technique"],
        tone: "secondary",
      })
    ).resolves.toBe(true)

    const [updated] = await getScienceProgramLevels()
    expect(updated?.work).toEqual(["Culture and sterile technique"])
    expect(updated?.tone).toBe("secondary")
  })

  it("round-trips an elective cluster's subjects array", async (context) => {
    if (!connected) return context.skip()

    await createElectiveCluster(electiveClusterInput)

    await expect(getElectiveClusters()).resolves.toMatchObject([
      {
        name: "Field Experience",
        subjects: [
          "Apprenticeship with a partner laboratory, clinic, or firm",
          "Supervised community and outreach work",
        ],
      },
    ])
  })

  it("keeps a single academics settings document", async (context) => {
    if (!connected) return context.skip()

    await updateAcademicsSettings({ coreSubjectHours: 160 })
    await updateAcademicsSettings({ coreSubjectHours: 200 })

    await expect(AcademicsSettingsModel.countDocuments({})).resolves.toBe(1)
    await expect(getAcademicsSettings()).resolves.toMatchObject({
      coreSubjectHours: 200,
    })
  })
})
