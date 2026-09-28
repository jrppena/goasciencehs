import "server-only"

import { model, models, Schema, type InferSchemaType, type Model } from "mongoose"

const scienceProgramLevelSchema = new Schema({
  grade: { type: String, required: true },
  specialisation: { type: String, required: true },
  summary: { type: String, required: true },
  work: { type: [String], required: true },
  tone: { type: String, enum: ["primary", "secondary"] as const, required: true },
  order: { type: Number, default: 0 },
})

export type ScienceProgramLevel = InferSchemaType<typeof scienceProgramLevelSchema>

export const ScienceProgramLevelModel: Model<ScienceProgramLevel> =
  (models.ScienceProgramLevel as Model<ScienceProgramLevel> | undefined) ??
  model<ScienceProgramLevel>("ScienceProgramLevel", scienceProgramLevelSchema)
