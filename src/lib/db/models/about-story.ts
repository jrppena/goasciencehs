import "server-only"

import { model, models, Schema, type InferSchemaType, type Model } from "mongoose"

const aboutStorySchema = new Schema({
  heading: { type: String, required: true },
  paragraphs: { type: [String], required: true },
})

export type AboutStory = InferSchemaType<typeof aboutStorySchema>

export const AboutStoryModel: Model<AboutStory> =
  (models.AboutStory as Model<AboutStory> | undefined) ??
  model<AboutStory>("AboutStory", aboutStorySchema)
