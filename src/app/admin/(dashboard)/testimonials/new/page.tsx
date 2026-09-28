import type { Metadata } from "next"

import { TestimonialForm } from "../testimonial-form"

export const metadata: Metadata = {
  title: "New testimonial",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default function NewTestimonialPage() {
  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        New testimonial
      </h1>
      <TestimonialForm />
    </div>
  )
}
