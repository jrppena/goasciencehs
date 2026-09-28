import "server-only"

import { model, models, Schema, type InferSchemaType, type Model } from "mongoose"

import { newsCategories } from "@/lib/news"

const newsSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  category: { type: String, enum: newsCategories, required: true },
  publishedOn: { type: String, required: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  author: { type: String, required: true },
  body: { type: [String], required: true },
  image: String,
  isPublished: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
})

export type NewsPost = InferSchemaType<typeof newsSchema>

export const NewsModel: Model<NewsPost> =
  (models.News as Model<NewsPost> | undefined) ??
  model<NewsPost>("News", newsSchema)
