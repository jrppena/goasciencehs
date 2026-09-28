import "server-only"

import { connect } from "@/lib/db/connect"
import { AboutStoryModel, type AboutStory } from "@/lib/db/models/about-story"
import { CoreValueModel, type CoreValue } from "@/lib/db/models/core-value"
import {
  FacultyModel,
  type FacultyKind,
  type FacultyMember,
} from "@/lib/db/models/faculty"
import { MilestoneModel, type Milestone } from "@/lib/db/models/milestone"
import {
  MissionVisionModel,
  type MissionVisionStatement,
} from "@/lib/db/models/mission-vision"
import { NewsModel, type NewsPost } from "@/lib/db/models/news"
import { SchoolStatsModel, type SchoolStats } from "@/lib/db/models/school-stats"
import { SiteSettingsModel, type SiteSettings } from "@/lib/db/models/site-settings"
import {
  TestimonialModel,
  type Testimonial,
} from "@/lib/db/models/testimonial"
import type { NewsCategory } from "@/lib/news"

/**
 * The single read path for public content. Everything here filters out
 * unpublished/invisible documents and sorts the way the pages present them.
 */

export async function getPublishedNews(): Promise<NewsPost[]> {
  await connect()
  return NewsModel.find({ isPublished: true })
    .sort({ isFeatured: -1, publishedOn: -1 })
    .lean()
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  await connect()
  return NewsModel.findOne({ slug, isPublished: true }).lean()
}

export async function getNewsByCategory(
  category?: NewsCategory
): Promise<NewsPost[]> {
  await connect()
  const filter = category ? { isPublished: true, category } : { isPublished: true }
  return NewsModel.find(filter).sort({ isFeatured: -1, publishedOn: -1 }).lean()
}

/** Same-category stories first, topped up with the next most recent ones. */
export async function getRelatedNews(
  post: NewsPost,
  limit = 3
): Promise<NewsPost[]> {
  await connect()
  const others = await NewsModel.find({ isPublished: true, slug: { $ne: post.slug } })
    .sort({ publishedOn: -1 })
    .lean()

  const sameCategory = others.filter((candidate) => candidate.category === post.category)
  const rest = others.filter((candidate) => candidate.category !== post.category)
  return [...sameCategory, ...rest].slice(0, limit)
}

export async function getVisibleFaculty(
  kind?: FacultyKind
): Promise<FacultyMember[]> {
  await connect()
  const filter = kind ? { isVisible: true, kind } : { isVisible: true }
  return FacultyModel.find(filter).sort({ order: 1 }).lean()
}

export async function getVisibleTestimonials(): Promise<Testimonial[]> {
  await connect()
  return TestimonialModel.find({ isVisible: true })
    .sort({ order: 1, name: 1 })
    .lean()
}

export async function getCoreValues(): Promise<CoreValue[]> {
  await connect()
  return CoreValueModel.find({}).sort({ order: 1, title: 1 }).lean()
}

export async function getMilestones(): Promise<Milestone[]> {
  await connect()
  return MilestoneModel.find({}).sort({ order: 1, year: 1 }).lean()
}

export async function getMissionVision(): Promise<MissionVisionStatement[]> {
  await connect()
  return MissionVisionModel.find({}).sort({ order: 1, label: 1 }).lean()
}

export async function getAboutStory(): Promise<AboutStory> {
  await connect()
  const story = await AboutStoryModel.findOne().lean()

  if (!story) {
    throw new Error("The About story is not seeded. Run `npm run seed`.")
  }

  return story
}

export async function getSiteSettings(): Promise<SiteSettings> {
  await connect()
  const settings = await SiteSettingsModel.findOne().lean()

  if (!settings) {
    throw new Error("Site settings are not seeded. Run `npm run seed`.")
  }

  return settings
}

export async function getSchoolStats(): Promise<SchoolStats> {
  await connect()
  const [stats, facultyCount] = await Promise.all([
    SchoolStatsModel.findOne().lean(),
    FacultyModel.countDocuments({ isVisible: true }),
  ])

  if (!stats) {
    throw new Error("School stats are not seeded. Run `npm run seed`.")
  }

  return { ...stats, facultyAndStaff: String(facultyCount) }
}
