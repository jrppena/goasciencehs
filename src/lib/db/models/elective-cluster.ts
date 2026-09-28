import "server-only"

import { model, models, Schema, type InferSchemaType, type Model } from "mongoose"

const electiveClusterSchema = new Schema({
  name: { type: String, required: true },
  summary: { type: String, required: true },
  subjects: { type: [String], required: true },
  pathways: { type: String, required: true },
  tone: { type: String, enum: ["primary", "secondary"] as const, required: true },
  order: { type: Number, default: 0 },
})

export type ElectiveCluster = InferSchemaType<typeof electiveClusterSchema>

export const ElectiveClusterModel: Model<ElectiveCluster> =
  (models.ElectiveCluster as Model<ElectiveCluster> | undefined) ??
  model<ElectiveCluster>("ElectiveCluster", electiveClusterSchema)
