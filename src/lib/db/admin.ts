import "server-only"

import { isValidObjectId } from "mongoose"

import { connect } from "@/lib/db/connect"
import { AboutStoryModel, type AboutStory } from "@/lib/db/models/about-story"
import {
  AcademicsSettingsModel,
  type AcademicsSettings,
} from "@/lib/db/models/academics-settings"
import { CoreSubjectModel, type CoreSubject } from "@/lib/db/models/core-subject"
import { CoreValueModel, type CoreValue } from "@/lib/db/models/core-value"
import {
  CurriculumShiftStepModel,
  type CurriculumShiftStep,
} from "@/lib/db/models/curriculum-shift-step"
import {
  ElectiveClusterModel,
  type ElectiveCluster,
} from "@/lib/db/models/elective-cluster"
import { FacultyModel, type FacultyMember } from "@/lib/db/models/faculty"
import { LearningAreaModel, type LearningArea } from "@/lib/db/models/learning-area"
import { MatatagStepModel, type MatatagStep } from "@/lib/db/models/matatag-step"
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
  ScienceProgramLevelModel,
  type ScienceProgramLevel,
} from "@/lib/db/models/science-program-level"
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

  const [
    news,
    publishedNews,
    drafts,
    latestAdvisory,
    faculty,
    visibleFaculty,
    testimonials,
    visibleTestimonials,
    coreValues,
    milestones,
    missionVision,
    story,
    learningAreas,
    scienceProgramLevels,
    matatagSteps,
    coreSubjects,
    electiveClusters,
    curriculumShiftSteps,
    siteSettings,
  ] = await Promise.all([
    NewsModel.countDocuments({}),
    NewsModel.countDocuments({ isPublished: true }),
    NewsModel.countDocuments({ isPublished: false }),
    NewsModel.findOne({ category: "Advisory" })
      .sort({ publishedOn: -1 })
      .select({ title: 1, publishedOn: 1, isPublished: 1 })
      .lean(),
    FacultyModel.countDocuments({}),
    FacultyModel.countDocuments({ isVisible: true }),
    TestimonialModel.countDocuments({}),
    TestimonialModel.countDocuments({ isVisible: true }),
    CoreValueModel.countDocuments({}),
    MilestoneModel.countDocuments({}),
    MissionVisionModel.countDocuments({}),
    AboutStoryModel.exists({}),
    LearningAreaModel.countDocuments({}),
    ScienceProgramLevelModel.countDocuments({}),
    MatatagStepModel.countDocuments({}),
    CoreSubjectModel.countDocuments({}),
    ElectiveClusterModel.countDocuments({}),
    CurriculumShiftStepModel.countDocuments({}),
    SiteSettingsModel.exists({}),
  ])

  return {
    news: {
      total: news,
      published: publishedNews,
      drafts,
      latestAdvisory: latestAdvisory
        ? {
            id: String(latestAdvisory._id),
            title: latestAdvisory.title,
            publishedOn: latestAdvisory.publishedOn,
            isPublished: latestAdvisory.isPublished,
          }
        : null,
    },
    faculty: { total: faculty, visible: visibleFaculty },
    testimonials: { total: testimonials, visible: visibleTestimonials },
    about: {
      coreValues,
      milestones,
      missionVision,
      story: story !== null,
      entries: coreValues + milestones + missionVision,
    },
    academics: {
      learningAreas,
      scienceProgramLevels,
      matatagSteps,
      coreSubjects,
      electiveClusters,
      curriculumShiftSteps,
      entries:
        learningAreas +
        scienceProgramLevels +
        matatagSteps +
        coreSubjects +
        electiveClusters +
        curriculumShiftSteps,
    },
    settings: { stored: siteSettings !== null },
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

/**
 * Validates before connecting. Update validators run with query context, not
 * document context, so a conditional `required` (see `requiredForAdvisory` in
 * the News model) would otherwise be silently skipped on edit.
 */
export async function updateNews(
  id: string,
  input: NewsPost
): Promise<AdminNewsPost | null> {
  if (!isValidObjectId(id)) return null

  await new NewsModel(input).validate()

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

export type AdminLearningArea = WithId<LearningArea>

export async function getAdminLearningAreas(): Promise<AdminLearningArea[]> {
  await connect()
  const areas = await LearningAreaModel.find({}).sort({ order: 1, name: 1 }).lean()
  return areas.map(withId)
}

export async function getAdminLearningAreaById(
  id: string
): Promise<AdminLearningArea | null> {
  if (!isValidObjectId(id)) return null

  await connect()
  const area = await LearningAreaModel.findById(id).lean()
  return area ? withId(area) : null
}

/** Validates before connecting, so bad input never opens a database connection. */
export async function createLearningArea(input: LearningArea) {
  const area = new LearningAreaModel(input)
  await area.validate()

  await connect()
  await area.save()
}

export async function updateLearningArea(id: string, input: LearningArea) {
  if (!isValidObjectId(id)) return false

  await connect()
  const result = await LearningAreaModel.updateOne(
    { _id: id },
    { $set: input },
    { runValidators: true }
  )
  return result.matchedCount > 0
}

export async function deleteLearningArea(id: string) {
  if (!isValidObjectId(id)) return

  await connect()
  await LearningAreaModel.findByIdAndDelete(id)
}

export type AdminScienceProgramLevel = WithId<ScienceProgramLevel>

export async function getAdminScienceProgramLevels(): Promise<
  AdminScienceProgramLevel[]
> {
  await connect()
  const levels = await ScienceProgramLevelModel.find({})
    .sort({ order: 1, grade: 1 })
    .lean()
  return levels.map(withId)
}

export async function getAdminScienceProgramLevelById(
  id: string
): Promise<AdminScienceProgramLevel | null> {
  if (!isValidObjectId(id)) return null

  await connect()
  const level = await ScienceProgramLevelModel.findById(id).lean()
  return level ? withId(level) : null
}

/** Validates before connecting, so bad input never opens a database connection. */
export async function createScienceProgramLevel(input: ScienceProgramLevel) {
  const level = new ScienceProgramLevelModel(input)
  await level.validate()

  await connect()
  await level.save()
}

export async function updateScienceProgramLevel(
  id: string,
  input: ScienceProgramLevel
) {
  if (!isValidObjectId(id)) return false

  await connect()
  const result = await ScienceProgramLevelModel.updateOne(
    { _id: id },
    { $set: input },
    { runValidators: true }
  )
  return result.matchedCount > 0
}

export async function deleteScienceProgramLevel(id: string) {
  if (!isValidObjectId(id)) return

  await connect()
  await ScienceProgramLevelModel.findByIdAndDelete(id)
}

export type AdminMatatagStep = WithId<MatatagStep>

export async function getAdminMatatagSteps(): Promise<AdminMatatagStep[]> {
  await connect()
  const steps = await MatatagStepModel.find({}).sort({ order: 1, title: 1 }).lean()
  return steps.map(withId)
}

export async function getAdminMatatagStepById(
  id: string
): Promise<AdminMatatagStep | null> {
  if (!isValidObjectId(id)) return null

  await connect()
  const step = await MatatagStepModel.findById(id).lean()
  return step ? withId(step) : null
}

/** Validates before connecting, so bad input never opens a database connection. */
export async function createMatatagStep(input: MatatagStep) {
  const step = new MatatagStepModel(input)
  await step.validate()

  await connect()
  await step.save()
}

export async function updateMatatagStep(id: string, input: MatatagStep) {
  if (!isValidObjectId(id)) return false

  await connect()
  const result = await MatatagStepModel.updateOne(
    { _id: id },
    { $set: input },
    { runValidators: true }
  )
  return result.matchedCount > 0
}

export async function deleteMatatagStep(id: string) {
  if (!isValidObjectId(id)) return

  await connect()
  await MatatagStepModel.findByIdAndDelete(id)
}

export type AdminCoreSubject = WithId<CoreSubject>

export async function getAdminCoreSubjects(): Promise<AdminCoreSubject[]> {
  await connect()
  const subjects = await CoreSubjectModel.find({})
    .sort({ order: 1, name: 1 })
    .lean()
  return subjects.map(withId)
}

export async function getAdminCoreSubjectById(
  id: string
): Promise<AdminCoreSubject | null> {
  if (!isValidObjectId(id)) return null

  await connect()
  const subject = await CoreSubjectModel.findById(id).lean()
  return subject ? withId(subject) : null
}

/** Validates before connecting, so bad input never opens a database connection. */
export async function createCoreSubject(input: CoreSubject) {
  const subject = new CoreSubjectModel(input)
  await subject.validate()

  await connect()
  await subject.save()
}

export async function updateCoreSubject(id: string, input: CoreSubject) {
  if (!isValidObjectId(id)) return false

  await connect()
  const result = await CoreSubjectModel.updateOne(
    { _id: id },
    { $set: input },
    { runValidators: true }
  )
  return result.matchedCount > 0
}

export async function deleteCoreSubject(id: string) {
  if (!isValidObjectId(id)) return

  await connect()
  await CoreSubjectModel.findByIdAndDelete(id)
}

export type AdminElectiveCluster = WithId<ElectiveCluster>

export async function getAdminElectiveClusters(): Promise<AdminElectiveCluster[]> {
  await connect()
  const clusters = await ElectiveClusterModel.find({})
    .sort({ order: 1, name: 1 })
    .lean()
  return clusters.map(withId)
}

export async function getAdminElectiveClusterById(
  id: string
): Promise<AdminElectiveCluster | null> {
  if (!isValidObjectId(id)) return null

  await connect()
  const cluster = await ElectiveClusterModel.findById(id).lean()
  return cluster ? withId(cluster) : null
}

/** Validates before connecting, so bad input never opens a database connection. */
export async function createElectiveCluster(input: ElectiveCluster) {
  const cluster = new ElectiveClusterModel(input)
  await cluster.validate()

  await connect()
  await cluster.save()
}

export async function updateElectiveCluster(id: string, input: ElectiveCluster) {
  if (!isValidObjectId(id)) return false

  await connect()
  const result = await ElectiveClusterModel.updateOne(
    { _id: id },
    { $set: input },
    { runValidators: true }
  )
  return result.matchedCount > 0
}

export async function deleteElectiveCluster(id: string) {
  if (!isValidObjectId(id)) return

  await connect()
  await ElectiveClusterModel.findByIdAndDelete(id)
}

export type AdminCurriculumShiftStep = WithId<CurriculumShiftStep>

export async function getAdminCurriculumShiftSteps(): Promise<
  AdminCurriculumShiftStep[]
> {
  await connect()
  const steps = await CurriculumShiftStepModel.find({})
    .sort({ order: 1, title: 1 })
    .lean()
  return steps.map(withId)
}

export async function getAdminCurriculumShiftStepById(
  id: string
): Promise<AdminCurriculumShiftStep | null> {
  if (!isValidObjectId(id)) return null

  await connect()
  const step = await CurriculumShiftStepModel.findById(id).lean()
  return step ? withId(step) : null
}

/** Validates before connecting, so bad input never opens a database connection. */
export async function createCurriculumShiftStep(input: CurriculumShiftStep) {
  const step = new CurriculumShiftStepModel(input)
  await step.validate()

  await connect()
  await step.save()
}

export async function updateCurriculumShiftStep(
  id: string,
  input: CurriculumShiftStep
) {
  if (!isValidObjectId(id)) return false

  await connect()
  const result = await CurriculumShiftStepModel.updateOne(
    { _id: id },
    { $set: input },
    { runValidators: true }
  )
  return result.matchedCount > 0
}

export async function deleteCurriculumShiftStep(id: string) {
  if (!isValidObjectId(id)) return

  await connect()
  await CurriculumShiftStepModel.findByIdAndDelete(id)
}

/** Validates before connecting, so bad input never opens a database connection. */
export async function updateAcademicsSettings(input: AcademicsSettings) {
  const settings = new AcademicsSettingsModel(input)
  await settings.validate()

  await connect()
  await AcademicsSettingsModel.findOneAndUpdate(
    {},
    { $set: input },
    { upsert: true, runValidators: true }
  )
}
