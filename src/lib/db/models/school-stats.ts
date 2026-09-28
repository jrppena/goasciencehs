import "server-only"

import { model, models, Schema, type InferSchemaType, type Model } from "mongoose"

const schoolStatsSchema = new Schema({
  learnersEnrolled: { type: String, required: true },
  facultyAndStaff: { type: String, required: true },
  yearEstablished: { type: String, required: true },
  collegeProgressionRate: { type: String, required: true },
})

export type SchoolStats = InferSchemaType<typeof schoolStatsSchema>

export const SchoolStatsModel: Model<SchoolStats> =
  (models.SchoolStats as Model<SchoolStats> | undefined) ??
  model<SchoolStats>("SchoolStats", schoolStatsSchema)
