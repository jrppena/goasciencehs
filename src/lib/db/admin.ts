import "server-only"

import { isValidObjectId } from "mongoose"

import { connect } from "@/lib/db/connect"
import { AboutStoryModel, type AboutStory } from "@/lib/db/models/about-story"
import { CoreValueModel, type CoreValue } from "@/lib/db/models/core-value"
import { FacultyModel, type FacultyMember } from "@/lib/db/models/faculty"
import { MilestoneModel, type Milestone } from "@/lib/db/models/milestone"
import {
  MissionVisionModel,
  type MissionVisionStatement,
} from "@/lib/db/models/mission-vision"
import { NewsModel, type NewsPost } from "@/lib/db/models/news"
import {
  SchoolStatsModel,
  type SchoolStats,
} from "@/lib/db/models/school-stats"
import {
  SiteSettingsModel,
  type SiteSettings,
} from "@/lib/db/models/site-settings"
import {
  TestimonialModel,
  type Testimonial,
} from "@/lib/db/models/testimonial"

/** A news document with a serialisable id, for admin lists and forms. */
export type AdminNewsPost = NewsPost & { _id: string }

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

export async function getAdminNews(): Promise<AdminNewsPost[]> {
  await connect()
  const posts = await NewsModel.find({}).sort({ publishedOn: -1 }).lean()
  return posts.map((post) => ({ ...post, _id: String(post._id) }))
}

export async function getAdminNewsById(id: string): Promise<AdminNewsPost | null> {
  if (!isValidObjectId(id)) return null

  await connect()
  const post = await NewsModel.findById(id).lean()
  return post ? { ...post, _id: String(post._id) } : null
}

/** Validates before connecting, so bad input never opens a database connection. */
export async function createNews(input: NewsPost): Promise<AdminNewsPost> {
  const post = new NewsModel(input)
  await post.validate()

  await connect()
  await post.save()
  if (post.isFeatured) await unsetOtherFeatured(String(post._id))

  return { ...post.toObject(), _id: String(post._id) }
}

export async function updateNews(
  id: string,
  input: NewsPost
): Promise<AdminNewsPost | null> {
  if (!isValidObjectId(id)) return null

  await connect()
  const post = await NewsModel.findByIdAndUpdate(
    id,
    { $set: input },
    { runValidators: true, returnDocument: "after" }
  ).lean()
  if (!post) return null

  if (post.isFeatured) await unsetOtherFeatured(id)

  return { ...post, _id: String(post._id) }
}

export async function deleteNews(id: string) {
  if (!isValidObjectId(id)) return

  await connect()
  await NewsModel.findByIdAndDelete(id)
}

export async function setNewsPublished(id: string, isPublished: boolean) {
  await connect()
  await NewsModel.updateOne(
    { _id: id },
    { $set: { isPublished } },
    { runValidators: true }
  )
}

export async function setNewsFeatured(id: string, isFeatured: boolean) {
  await connect()
  if (isFeatured) await unsetOtherFeatured(id)

  await NewsModel.updateOne(
    { _id: id },
    { $set: { isFeatured } },
    { runValidators: true }
  )
}

/** Only one post is featured at a time — the public pages lead with it. */
async function unsetOtherFeatured(keepId: string) {
  await NewsModel.updateMany(
    { _id: { $ne: keepId }, isFeatured: true },
    { $set: { isFeatured: false } }
  )
}

/** A faculty document with a serialisable id, for admin lists and forms. */
export type AdminFacultyMember = FacultyMember & { _id: string }

export async function getAdminFaculty(): Promise<AdminFacultyMember[]> {
  await connect()
  const members = await FacultyModel.find({}).sort({ order: 1, name: 1 }).lean()
  return members.map((member) => ({ ...member, _id: String(member._id) }))
}

export async function getAdminFacultyById(
  id: string
): Promise<AdminFacultyMember | null> {
  if (!isValidObjectId(id)) return null

  await connect()
  const member = await FacultyModel.findById(id).lean()
  return member ? { ...member, _id: String(member._id) } : null
}

/** Validates before connecting, so bad input never opens a database connection. */
export async function createFaculty(
  input: FacultyMember
): Promise<AdminFacultyMember> {
  const member = new FacultyModel(input)
  await member.validate()

  await connect()
  await member.save()

  return { ...member.toObject(), _id: String(member._id) }
}

export async function updateFaculty(
  id: string,
  input: FacultyMember
): Promise<AdminFacultyMember | null> {
  if (!isValidObjectId(id)) return null

  await connect()
  const member = await FacultyModel.findByIdAndUpdate(
    id,
    { $set: input },
    { runValidators: true, returnDocument: "after" }
  ).lean()

  return member ? { ...member, _id: String(member._id) } : null
}

export async function deleteFaculty(id: string) {
  if (!isValidObjectId(id)) return

  await connect()
  await FacultyModel.findByIdAndDelete(id)
}

export async function setFacultyVisible(id: string, isVisible: boolean) {
  await connect()
  await FacultyModel.updateOne(
    { _id: id },
    { $set: { isVisible } },
    { runValidators: true }
  )
}

/** Validates before connecting, so bad input never opens a database connection. */
export async function updateSiteSettings(input: SiteSettings) {
  const settings = new SiteSettingsModel(input)
  await settings.validate()

  await connect()
  await SiteSettingsModel.findOneAndUpdate(
    {},
    { $set: input },
    { upsert: true, runValidators: true }
  )
}

/**
 * Stores the three school-supplied figures. `facultyAndStaff` is derived: it
 * is recomputed from the visible faculty here so the stored value never lies.
 */
export async function updateSchoolStats(
  input: Omit<SchoolStats, "facultyAndStaff">
) {
  const stats = new SchoolStatsModel({ ...input, facultyAndStaff: "0" })
  await stats.validate()

  await connect()
  const facultyAndStaff = String(
    await FacultyModel.countDocuments({ isVisible: true })
  )

  await SchoolStatsModel.findOneAndUpdate(
    {},
    { $set: { ...input, facultyAndStaff } },
    { upsert: true, runValidators: true }
  )
}

/** A testimonial with a serialisable id, for admin lists and forms. */
export type AdminTestimonial = Testimonial & { _id: string }

export async function getAdminTestimonials(): Promise<AdminTestimonial[]> {
  await connect()
  const testimonials = await TestimonialModel.find({})
    .sort({ order: 1, name: 1 })
    .lean()
  return testimonials.map((testimonial) => ({
    ...testimonial,
    _id: String(testimonial._id),
  }))
}

export async function getAdminTestimonialById(
  id: string
): Promise<AdminTestimonial | null> {
  if (!isValidObjectId(id)) return null

  await connect()
  const testimonial = await TestimonialModel.findById(id).lean()
  return testimonial
    ? { ...testimonial, _id: String(testimonial._id) }
    : null
}

/** Validates before connecting, so bad input never opens a database connection. */
export async function createTestimonial(
  input: Testimonial
): Promise<AdminTestimonial> {
  const testimonial = new TestimonialModel(input)
  await testimonial.validate()

  await connect()
  await testimonial.save()

  return { ...testimonial.toObject(), _id: String(testimonial._id) }
}

export async function updateTestimonial(
  id: string,
  input: Testimonial
): Promise<AdminTestimonial | null> {
  if (!isValidObjectId(id)) return null

  await connect()
  const testimonial = await TestimonialModel.findByIdAndUpdate(
    id,
    { $set: input },
    { runValidators: true, returnDocument: "after" }
  ).lean()

  return testimonial
    ? { ...testimonial, _id: String(testimonial._id) }
    : null
}

export async function deleteTestimonial(id: string) {
  if (!isValidObjectId(id)) return

  await connect()
  await TestimonialModel.findByIdAndDelete(id)
}

export async function setTestimonialVisible(id: string, isVisible: boolean) {
  await connect()
  await TestimonialModel.updateOne(
    { _id: id },
    { $set: { isVisible } },
    { runValidators: true }
  )
}

/** An About list entry with a serialisable id, for admin lists and forms. */
type WithId<T> = T & { _id: string }

function withId<T extends { _id: unknown }>(document: T): WithId<T> {
  return { ...document, _id: String(document._id) }
}

export type AdminCoreValue = WithId<CoreValue>

export async function getAdminCoreValues(): Promise<AdminCoreValue[]> {
  await connect()
  const values = await CoreValueModel.find({}).sort({ order: 1, title: 1 }).lean()
  return values.map(withId)
}

export async function getAdminCoreValueById(
  id: string
): Promise<AdminCoreValue | null> {
  if (!isValidObjectId(id)) return null

  await connect()
  const value = await CoreValueModel.findById(id).lean()
  return value ? withId(value) : null
}

/** Validates before connecting, so bad input never opens a database connection. */
export async function createCoreValue(input: CoreValue) {
  const value = new CoreValueModel(input)
  await value.validate()

  await connect()
  await value.save()
}

export async function updateCoreValue(id: string, input: CoreValue) {
  if (!isValidObjectId(id)) return false

  await connect()
  const result = await CoreValueModel.updateOne(
    { _id: id },
    { $set: input },
    { runValidators: true }
  )
  return result.matchedCount > 0
}

export async function deleteCoreValue(id: string) {
  if (!isValidObjectId(id)) return

  await connect()
  await CoreValueModel.findByIdAndDelete(id)
}

export type AdminMilestone = WithId<Milestone>

export async function getAdminMilestones(): Promise<AdminMilestone[]> {
  await connect()
  const milestones = await MilestoneModel.find({})
    .sort({ order: 1, year: 1 })
    .lean()
  return milestones.map(withId)
}

export async function getAdminMilestoneById(
  id: string
): Promise<AdminMilestone | null> {
  if (!isValidObjectId(id)) return null

  await connect()
  const milestone = await MilestoneModel.findById(id).lean()
  return milestone ? withId(milestone) : null
}

export async function createMilestone(input: Milestone) {
  const milestone = new MilestoneModel(input)
  await milestone.validate()

  await connect()
  await milestone.save()
}

export async function updateMilestone(id: string, input: Milestone) {
  if (!isValidObjectId(id)) return false

  await connect()
  const result = await MilestoneModel.updateOne(
    { _id: id },
    { $set: input },
    { runValidators: true }
  )
  return result.matchedCount > 0
}

export async function deleteMilestone(id: string) {
  if (!isValidObjectId(id)) return

  await connect()
  await MilestoneModel.findByIdAndDelete(id)
}

export type AdminMissionVision = WithId<MissionVisionStatement>

export async function getAdminMissionVision(): Promise<AdminMissionVision[]> {
  await connect()
  const statements = await MissionVisionModel.find({})
    .sort({ order: 1, label: 1 })
    .lean()
  return statements.map(withId)
}

export async function getAdminMissionVisionById(
  id: string
): Promise<AdminMissionVision | null> {
  if (!isValidObjectId(id)) return null

  await connect()
  const statement = await MissionVisionModel.findById(id).lean()
  return statement ? withId(statement) : null
}

export async function createMissionVision(input: MissionVisionStatement) {
  const statement = new MissionVisionModel(input)
  await statement.validate()

  await connect()
  await statement.save()
}

export async function updateMissionVision(
  id: string,
  input: MissionVisionStatement
) {
  if (!isValidObjectId(id)) return false

  await connect()
  const result = await MissionVisionModel.updateOne(
    { _id: id },
    { $set: input },
    { runValidators: true }
  )
  return result.matchedCount > 0
}

export async function deleteMissionVision(id: string) {
  if (!isValidObjectId(id)) return

  await connect()
  await MissionVisionModel.findByIdAndDelete(id)
}

/** Validates before connecting, so bad input never opens a database connection. */
export async function updateAboutStory(input: AboutStory) {
  const story = new AboutStoryModel(input)
  await story.validate()

  await connect()
  await AboutStoryModel.updateOne(
    {},
    { $set: input },
    { upsert: true, runValidators: true }
  )
}
