import type { Metadata } from "next"

import { GuardedLink } from "@/components/admin/navigation-guard"
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
      <header className="flex flex-col gap-xs">
        <GuardedLink
          href="/admin/testimonials"
          className="font-mono text-label-md uppercase text-muted-foreground hover:text-primary"
        >
          ← Testimonials
        </GuardedLink>
        <h1 className="font-display text-headline-lg uppercase text-primary">
          New testimonial
        </h1>
      </header>
      <TestimonialForm />
    </div>
  )
}
