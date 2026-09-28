import "server-only"

import { model, models, Schema, type InferSchemaType, type Model } from "mongoose"

const matatagStepSchema = new Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  order: { type: Number, default: 0 },
})

export type MatatagStep = InferSchemaType<typeof matatagStepSchema>

export const MatatagStepModel: Model<MatatagStep> =
  (models.MatatagStep as Model<MatatagStep> | undefined) ??
  model<MatatagStep>("MatatagStep", matatagStepSchema)
