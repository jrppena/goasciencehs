"use client"

import { useActionState } from "react"
import Link from "next/link"

import type { Testimonial } from "@/lib/testimonials"
import { describedBy } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createTestimonialAction, updateTestimonialAction } from "./actions"
import { initialTestimonialFormState } from "./form-state"

type TestimonialFormProps = {
  testimonial?: Testimonial & { _id: string }
}

function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const [state, formAction, pending] = useActionState(
    testimonial ? updateTestimonialAction : createTestimonialAction,
    initialTestimonialFormState
  )

  return (
    <form
      action={formAction}
      className="grid items-start gap-lg xl:grid-cols-[minmax(0,1fr)_22rem]"
    >
      {testimonial ? (
        <input type="hidden" name="id" value={testimonial._id} />
      ) : null}

      <div className="flex flex-col gap-md">
        <div className="flex flex-col gap-xs">
          <Label htmlFor="quote">Quote</Label>
          <Textarea
            id="quote"
            name="quote"
            rows={5}
            defaultValue={state.values?.quote ?? testimonial?.quote ?? ""}
            aria-invalid={state.fieldErrors?.quote ? true : undefined}
            aria-describedby={describedBy(
              state.fieldErrors?.quote && "quote-error"
            )}
          />
          <FieldError id="quote-error" message={state.fieldErrors?.quote} />
        </div>

        <div className="flex flex-col gap-xs">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={state.values?.name ?? testimonial?.name ?? ""}
            aria-invalid={state.fieldErrors?.name ? true : undefined}
            aria-describedby={describedBy(
              state.fieldErrors?.name && "name-error"
            )}
          />
          <FieldError id="name-error" message={state.fieldErrors?.name} />
        </div>

        <div className="grid gap-md sm:grid-cols-2">
          <div className="flex flex-col gap-xs">
            <Label htmlFor="batch">Batch</Label>
            <Input
              id="batch"
              name="batch"
              defaultValue={state.values?.batch ?? testimonial?.batch ?? ""}
              aria-invalid={state.fieldErrors?.batch ? true : undefined}
              aria-describedby={describedBy(
                state.fieldErrors?.batch && "batch-error"
              )}
            />
            <FieldError id="batch-error" message={state.fieldErrors?.batch} />
          </div>

          <div className="flex flex-col gap-xs">
            <Label htmlFor="now">Now</Label>
            <Input
              id="now"
              name="now"
              defaultValue={state.values?.now ?? testimonial?.now ?? ""}
              aria-invalid={state.fieldErrors?.now ? true : undefined}
              aria-describedby={describedBy(
                state.fieldErrors?.now && "now-error"
              )}
            />
            <FieldError id="now-error" message={state.fieldErrors?.now} />
          </div>
        </div>
      </div>

      <aside className="flex flex-col gap-md rounded-container border border-border bg-card p-md">
        <span className="font-mono text-label-md uppercase text-muted-foreground">
          Display
        </span>

        <div className="flex flex-col gap-xs">
          <Label htmlFor="order">Order</Label>
          <Input
            id="order"
            name="order"
            type="number"
            defaultValue={state.values?.order ?? String(testimonial?.order ?? 0)}
            aria-invalid={state.fieldErrors?.order ? true : undefined}
            aria-describedby={describedBy(
              "order-hint",
              state.fieldErrors?.order && "order-error"
            )}
          />
          <p id="order-hint" className="text-body-sm text-muted-foreground">
            Lower numbers appear first.
          </p>
          <FieldError id="order-error" message={state.fieldErrors?.order} />
        </div>

        <label className="flex items-center gap-xs text-body-md">
          <input
            type="checkbox"
            name="isVisible"
            defaultChecked={
              state.values?.isVisible ?? testimonial?.isVisible ?? true
            }
            className="size-4 accent-primary"
          />
          Visible on the homepage
        </label>

        {state.status === "error" && state.message ? (
          <p role="alert" className="text-body-md text-error">
            {state.message}
          </p>
        ) : null}

        <div className="flex flex-col gap-sm">
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Saving…" : testimonial ? "Save changes" : "Add testimonial"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            render={<Link href="/admin/testimonials" />}
          >
            Cancel
          </Button>
        </div>
      </aside>
    </form>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null

  return (
    <p id={id} className="text-body-sm text-error">
      {message}
    </p>
  )
}

export { TestimonialForm }
