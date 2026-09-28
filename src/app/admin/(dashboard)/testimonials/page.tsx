import type { Metadata } from "next"
import Link from "next/link"

import { getAdminTestimonials } from "@/lib/db/admin"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DeleteTestimonialButton } from "./delete-testimonial-button"
import { setTestimonialVisibleAction } from "./actions"

export const metadata: Metadata = {
  title: "Testimonials",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function AdminTestimonialsPage() {
  const testimonials = await getAdminTestimonials()

  return (
    <div className="flex flex-col gap-lg">
      <header className="flex flex-wrap items-end justify-between gap-md">
        <div className="flex flex-col gap-xs">
          <h1 className="font-display text-headline-lg uppercase text-primary">
            Testimonials
          </h1>
          <p className="text-body-md text-muted-foreground">
            Alumni quotes for the homepage. Hidden entries stay off the public
            site.
          </p>
        </div>
        <Button render={<Link href="/admin/testimonials/new" />}>
          New testimonial
        </Button>
      </header>

      {testimonials.length === 0 ? (
        <Card className="px-md">
          <p className="text-body-md text-muted-foreground">
            No testimonials yet. Add the first one.
          </p>
        </Card>
      ) : (
        <ul className="flex flex-col gap-sm">
          {testimonials.map((testimonial) => (
            <li key={testimonial._id}>
              <Card className="px-md">
                <div className="flex flex-wrap items-center justify-between gap-md">
                  <div className="flex min-w-0 flex-col gap-xs">
                    <Link
                      href={`/admin/testimonials/${testimonial._id}`}
                      className="font-display text-body-lg text-primary hover:underline"
                    >
                      {testimonial.name}
                    </Link>
                    <p className="max-w-[48rem] truncate text-body-md text-muted-foreground">
                      “{testimonial.quote}”
                    </p>
                    <div className="flex flex-wrap items-center gap-xs">
                      <Badge
                        variant={testimonial.isVisible ? "primary" : "outline"}
                      >
                        {testimonial.isVisible ? "Visible" : "Hidden"}
                      </Badge>
                      <span className="font-mono text-label-md text-muted-foreground">
                        {testimonial.batch} — {testimonial.now} · order{" "}
                        {testimonial.order}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-xs">
                    <form
                      action={setTestimonialVisibleAction.bind(
                        null,
                        testimonial._id,
                        !testimonial.isVisible
                      )}
                    >
                      <Button type="submit" variant="ghost" size="sm">
                        {testimonial.isVisible ? "Hide" : "Show"}
                      </Button>
                    </form>
                    <Button
                      variant="outline"
                      size="sm"
                      render={<Link href={`/admin/testimonials/${testimonial._id}`} />}
                    >
                      Edit
                    </Button>
                    <DeleteTestimonialButton
                      id={testimonial._id}
                      name={testimonial.name}
                    />
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
