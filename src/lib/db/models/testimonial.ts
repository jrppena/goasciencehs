import "server-only"

import { model, models, Schema, type InferSchemaType, type Model } from "mongoose"

const testimonialSchema = new Schema({
  quote: { type: String, required: true },
  name: { type: String, required: true },
  batch: { type: String, required: true },
  now: { type: String, required: true },
  isVisible: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
})

export type Testimonial = InferSchemaType<typeof testimonialSchema>

export const TestimonialModel: Model<Testimonial> =
  (models.Testimonial as Model<Testimonial> | undefined) ??
  model<Testimonial>("Testimonial", testimonialSchema)
