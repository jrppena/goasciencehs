import "server-only"

import { model, models, Schema, type InferSchemaType, type Model } from "mongoose"

const coreSubjectSchema = new Schema({
  name: { type: String, required: true },
  body: { type: String, required: true },
  order: { type: Number, default: 0 },
})

export type CoreSubject = InferSchemaType<typeof coreSubjectSchema>

export const CoreSubjectModel: Model<CoreSubject> =
  (models.CoreSubject as Model<CoreSubject> | undefined) ??
  model<CoreSubject>("CoreSubject", coreSubjectSchema)
