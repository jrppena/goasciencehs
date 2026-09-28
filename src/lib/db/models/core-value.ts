import "server-only"

import { model, models, Schema, type InferSchemaType, type Model } from "mongoose"

const coreValueSchema = new Schema({
  icon: { type: String, default: "FlaskConical" },
  title: { type: String, required: true },
  body: { type: String, required: true },
  order: { type: Number, default: 0 },
})

export type CoreValue = InferSchemaType<typeof coreValueSchema>

export const CoreValueModel: Model<CoreValue> =
  (models.CoreValue as Model<CoreValue> | undefined) ??
  model<CoreValue>("CoreValue", coreValueSchema)
