import "server-only"

import { model, models, Schema, type InferSchemaType, type Model } from "mongoose"

const socialLinkSchema = new Schema(
  {
    label: { type: String, required: true },
    href: { type: String, required: true },
  },
  { _id: false }
)

const siteSettingsSchema = new Schema({
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  socials: { type: [socialLinkSchema], default: [] },
})

type SiteSettingsDocument = InferSchemaType<typeof siteSettingsSchema>

/**
 * Mongoose types subdocument arrays as `DocumentArray`; the app works with
 * plain arrays, so flatten the one subdocument array in this schema.
 */
export type SiteSettings = Omit<SiteSettingsDocument, "socials"> & {
  socials: InferSchemaType<typeof socialLinkSchema>[]
}

export const SiteSettingsModel: Model<SiteSettingsDocument> =
  (models.SiteSettings as Model<SiteSettingsDocument> | undefined) ??
  model<SiteSettingsDocument>("SiteSettings", siteSettingsSchema)
