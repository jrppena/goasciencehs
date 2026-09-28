import "server-only"

import { model, models, Schema, type InferSchemaType, type Model } from "mongoose"

const facultySchema = new Schema({
  honorific: { type: String, enum: ["Ma'am", "Sir"] as const, required: true },
  name: { type: String, required: true },
  position: String,
  email: String,
  room: String,
  subjects: { type: [String], default: undefined },
  photo: String,
  kind: {
    type: String,
    enum: ["head", "teaching", "non-teaching"] as const,
    required: true,
  },
  isVisible: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
})

export type FacultyMember = InferSchemaType<typeof facultySchema>

export type Honorific = FacultyMember["honorific"]

export type FacultyKind = FacultyMember["kind"]

export const FacultyModel: Model<FacultyMember> =
  (models.Faculty as Model<FacultyMember> | undefined) ??
  model<FacultyMember>("Faculty", facultySchema)
