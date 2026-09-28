import { describe, expect, it } from "vitest"

import { TestimonialModel, type Testimonial } from "@/lib/db/models/testimonial"

const validTestimonial: Partial<Testimonial> = {
  quote: "A quote from an alumna.",
  name: "Alumna Name",
  batch: "Batch 2016",
  now: "Medical Technologist",
}

describe("Testimonial model", () => {
  it("accepts a valid testimonial and applies the display defaults", async () => {
    const testimonial = new TestimonialModel(validTestimonial)

    await expect(testimonial.validate()).resolves.toBeUndefined()
    expect(testimonial.isVisible).toBe(true)
    expect(testimonial.order).toBe(0)
  })

  it("rejects a missing required field", async () => {
    const testimonial = new TestimonialModel({
      ...validTestimonial,
      quote: undefined,
    })

    await expect(testimonial.validate()).rejects.toHaveProperty("errors.quote")
  })
})
