import "server-only"

import { model, models, Schema, type InferSchemaType, type Model } from "mongoose"

const academicsSettingsSchema = new Schema({
  coreSubjectHours: { type: Number, required: true, min: 1 },
})

export type AcademicsSettings = InferSchemaType<typeof academicsSettingsSchema>

export const AcademicsSettingsModel: Model<AcademicsSettings> =
  (models.AcademicsSettings as Model<AcademicsSettings> | undefined) ??
  model<AcademicsSettings>("AcademicsSettings", academicsSettingsSchema)
