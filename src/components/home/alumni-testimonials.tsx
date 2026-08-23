import { QuoteIcon } from "lucide-react"

import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

/**
 * Placeholder copy. TODO: replace with quotes cleared by the alumni
 * themselves before launch — nothing here is attributable to a real graduate.
 */
const testimonials = [
  {
    quote:
      "The laboratory hours were the hardest part of my week and the reason college labs never scared me. I had already written the reports.",
    name: "Alumna Name",
    batch: "Batch 2016",
    now: "Medical Technologist",
  },
  {
    quote:
      "Sections were small enough that no one could hide at the back. A teacher noticed I was struggling in Grade 8 and stayed after class until I was not.",
    name: "Alumnus Name",
    batch: "Batch 2018",
    now: "Civil Engineer",
  },
  {
    quote:
      "Our regional science fair project was the first thing I ever defended in front of strangers. I have been doing some version of that ever since.",
    name: "Alumna Name",
    batch: "Batch 2020",
    now: "Data Analyst",
  },
]

function AlumniTestimonials() {
  return (
    <Section
      eyebrow="Alumni"
      title="Where six years leads"
      description="Graduates on what the school asked of them, and what it was for."
    >
      <RevealGroup className="grid gap-md lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <RevealItem
            as="figure"
            key={testimonial.quote}
            className="flex flex-col gap-sm rounded-container border border-border bg-surface-container-low p-md"
          >
            <QuoteIcon className="size-6 text-primary" aria-hidden="true" />
            <blockquote className="text-body-lg">
              {testimonial.quote}
            </blockquote>
            <figcaption className="mt-auto flex flex-col gap-xs pt-sm">
              <span className="font-display text-headline-md uppercase">
                {testimonial.name}
              </span>
              <span className="font-mono text-label-md uppercase text-muted-foreground">
                {testimonial.batch} — {testimonial.now}
              </span>
            </figcaption>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

export { AlumniTestimonials }
