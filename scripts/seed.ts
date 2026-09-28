import { loadEnvConfig } from "@next/env"
import mongoose from "mongoose"

import { connect } from "@/lib/db/connect"
import { AboutStoryModel } from "@/lib/db/models/about-story"
import { CoreValueModel } from "@/lib/db/models/core-value"
import { FacultyModel } from "@/lib/db/models/faculty"
import { MilestoneModel } from "@/lib/db/models/milestone"
import { MissionVisionModel } from "@/lib/db/models/mission-vision"
import { NewsModel } from "@/lib/db/models/news"
import { SchoolStatsModel } from "@/lib/db/models/school-stats"
import { SiteSettingsModel } from "@/lib/db/models/site-settings"
import { TestimonialModel } from "@/lib/db/models/testimonial"
import {
  aboutStory,
  coreValues,
  milestones,
  missionVisionStatements,
} from "@/lib/about"
import { facultyMembers, nonTeachingPersonnel, schoolHead } from "@/lib/faculty"
import { newsPosts } from "@/lib/news"
import { schoolStats } from "@/lib/school-stats"
import { site } from "@/lib/site"
import { testimonials } from "@/lib/testimonials"

loadEnvConfig(process.cwd())

const facultyRoster = [schoolHead, ...facultyMembers, ...nonTeachingPersonnel]

/**
 * Idempotent: news upsert by slug, faculty by name, settings and stats as
 * single documents. Re-running only updates what changed.
 */
async function seed() {
  await connect()

  let newNews = 0
  for (const post of newsPosts) {
    const { upsertedCount } = await NewsModel.updateOne(
      { slug: post.slug },
      { $set: post },
      { upsert: true, runValidators: true }
    )
    newNews += upsertedCount
  }

  let newFaculty = 0
  for (const member of facultyRoster) {
    const { upsertedCount } = await FacultyModel.updateOne(
      { name: member.name },
      { $set: member },
      { upsert: true, runValidators: true }
    )
    newFaculty += upsertedCount
  }

  await SiteSettingsModel.updateOne(
    {},
    { $set: site },
    { upsert: true, runValidators: true }
  )
  // facultyAndStaff is recomputed on read from the faculty collection, so the
  // stored value is only a placeholder that satisfies the schema.
  await SchoolStatsModel.updateOne(
    {},
    { $set: schoolStats },
    { upsert: true, runValidators: true }
  )

  let newTestimonials = 0
  for (const testimonial of testimonials) {
    const { upsertedCount } = await TestimonialModel.updateOne(
      { quote: testimonial.quote },
      { $set: testimonial },
      { upsert: true, runValidators: true }
    )
    newTestimonials += upsertedCount
  }

  for (const coreValue of coreValues) {
    await CoreValueModel.updateOne(
      { title: coreValue.title },
      { $set: coreValue },
      { upsert: true, runValidators: true }
    )
  }
  for (const milestone of milestones) {
    await MilestoneModel.updateOne(
      { year: milestone.year },
      { $set: milestone },
      { upsert: true, runValidators: true }
    )
  }
  for (const statement of missionVisionStatements) {
    await MissionVisionModel.updateOne(
      { label: statement.label },
      { $set: statement },
      { upsert: true, runValidators: true }
    )
  }
  await AboutStoryModel.updateOne(
    {},
    { $set: aboutStory },
    { upsert: true, runValidators: true }
  )

  console.log(
    `News: ${newsPosts.length} posts (${newNews} new) · faculty: ${facultyRoster.length} entries (${newFaculty} new) · testimonials: ${testimonials.length} (${newTestimonials} new) · About: ${coreValues.length} values, ${milestones.length} milestones, ${missionVisionStatements.length} statements, story · site settings and school stats updated`
  )
}

seed()
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
  .finally(() => mongoose.disconnect())
