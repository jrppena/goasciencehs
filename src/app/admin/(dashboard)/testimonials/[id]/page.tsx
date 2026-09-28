import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getAdminTestimonialById } from "@/lib/db/admin"
import { TestimonialForm } from "../testimonial-form"

export const metadata: Metadata = {
  title: "Edit testimonial",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function EditTestimonialPage({
  params,
}: PageProps<"/admin/testimonials/[id]">) {
  const testimonial = await getAdminTestimonialById((await params).id)
  if (!testimonial) notFound()

  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        Edit testimonial
      </h1>
      <TestimonialForm testimonial={testimonial} />
    </div>
  )
}
