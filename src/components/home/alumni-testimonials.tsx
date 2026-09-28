import { QuoteIcon } from "lucide-react"

import { getVisibleTestimonials } from "@/lib/db/content"
import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

async function AlumniTestimonials() {
  const testimonials = await getVisibleTestimonials()
  if (testimonials.length === 0) return null

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
            key={`${testimonial.name}-${testimonial.batch}`}
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
