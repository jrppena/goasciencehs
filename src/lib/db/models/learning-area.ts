import "server-only"

import { model, models, Schema, type InferSchemaType, type Model } from "mongoose"

const learningAreaSchema = new Schema({
  name: { type: String, required: true },
  body: { type: String, required: true },
  order: { type: Number, default: 0 },
})

export type LearningArea = InferSchemaType<typeof learningAreaSchema>

export const LearningAreaModel: Model<LearningArea> =
  (models.LearningArea as Model<LearningArea> | undefined) ??
  model<LearningArea>("LearningArea", learningAreaSchema)
