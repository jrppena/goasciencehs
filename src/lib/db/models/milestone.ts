import "server-only"

import { model, models, Schema, type InferSchemaType, type Model } from "mongoose"

const milestoneSchema = new Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  order: { type: Number, default: 0 },
})

export type Milestone = InferSchemaType<typeof milestoneSchema>

export const MilestoneModel: Model<Milestone> =
  (models.Milestone as Model<Milestone> | undefined) ??
  model<Milestone>("Milestone", milestoneSchema)
