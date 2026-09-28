import type { Testimonial } from "@/lib/db/models/testimonial"

export type { Testimonial } from "@/lib/db/models/testimonial"

/**
 * Seed source for the alumni testimonials; `npm run seed` upserts by quote.
 *
 * TODO: replace with quotes cleared by the alumni themselves before launch —
 * nothing here is attributable to a real graduate.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "The laboratory hours were the hardest part of my week and the reason college labs never scared me. I had already written the reports.",
    name: "Alumna Name",
    batch: "Batch 2016",
    now: "Medical Technologist",
    isVisible: true,
    order: 1,
  },
  {
    quote:
      "Sections were small enough that no one could hide at the back. A teacher noticed I was struggling in Grade 8 and stayed after class until I was not.",
    name: "Alumnus Name",
    batch: "Batch 2018",
    now: "Civil Engineer",
    isVisible: true,
    order: 2,
  },
  {
    quote:
      "Our regional science fair project was the first thing I ever defended in front of strangers. I have been doing some version of that ever since.",
    name: "Alumna Name",
    batch: "Batch 2020",
    now: "Data Analyst",
    isVisible: true,
    order: 3,
  },
]
