import "server-only"

import { model, models, Schema, type InferSchemaType, type Model } from "mongoose"

const missionVisionSchema = new Schema({
  icon: { type: String, default: "Target" },
  label: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  tone: { type: String, enum: ["primary", "secondary"] as const, required: true },
  order: { type: Number, default: 0 },
})

export type MissionVisionStatement = InferSchemaType<typeof missionVisionSchema>

export const MissionVisionModel: Model<MissionVisionStatement> =
  (models.MissionVision as Model<MissionVisionStatement> | undefined) ??
  model<MissionVisionStatement>("MissionVision", missionVisionSchema)
