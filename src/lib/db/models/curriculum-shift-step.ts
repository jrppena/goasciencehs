import "server-only"

import { model, models, Schema, type InferSchemaType, type Model } from "mongoose"

const curriculumShiftStepSchema = new Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  order: { type: Number, default: 0 },
})

export type CurriculumShiftStep = InferSchemaType<typeof curriculumShiftStepSchema>

export const CurriculumShiftStepModel: Model<CurriculumShiftStep> =
  (models.CurriculumShiftStep as Model<CurriculumShiftStep> | undefined) ??
  model<CurriculumShiftStep>("CurriculumShiftStep", curriculumShiftStepSchema)
