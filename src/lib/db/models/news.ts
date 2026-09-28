import "server-only"

import { model, models, Schema, type InferSchemaType, type Model } from "mongoose"

import { newsCategories, signatoryRoles } from "@/lib/news"

/** Advisory required-ness must survive update-validator query context, where
 * `this` is the query rather than the document — see `updateNews`. */
function requiredForAdvisory(this: { category?: string } | null) {
  return this?.category === "Advisory"
}

const newsSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  category: { type: String, enum: newsCategories, required: true },
  publishedOn: { type: String, required: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  author: { type: String, required: true },
  signatoryName: { type: String, required: requiredForAdvisory },
  signatoryRole: {
    type: String,
    enum: signatoryRoles,
    required: requiredForAdvisory,
  },
  body: { type: [String], required: true },
  image: String,
  isPublished: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
})

export type NewsPost = InferSchemaType<typeof newsSchema>

export const NewsModel: Model<NewsPost> =
  (models.News as Model<NewsPost> | undefined) ??
  model<NewsPost>("News", newsSchema)
