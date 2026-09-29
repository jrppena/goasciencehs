"use client"

import { useActionState } from "react"
import Link from "next/link"

import type { Testimonial } from "@/lib/testimonials"
import { FormField } from "@/components/admin/form-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
        <FormField name="quote" label="Quote" error={state.fieldErrors?.quote}>
          {(control) => (
            <Textarea
              {...control}
              rows={5}
              defaultValue={state.values?.quote ?? testimonial?.quote ?? ""}
            />
          )}
        </FormField>

        <FormField name="name" label="Name" error={state.fieldErrors?.name}>
          {(control) => (
            <Input
              {...control}
              defaultValue={state.values?.name ?? testimonial?.name ?? ""}
            />
          )}
        </FormField>

        <div className="grid gap-md sm:grid-cols-2">
          <FormField name="batch" label="Batch" error={state.fieldErrors?.batch}>
            {(control) => (
              <Input
                {...control}
                defaultValue={state.values?.batch ?? testimonial?.batch ?? ""}
              />
            )}
          </FormField>

          <FormField name="now" label="Now" error={state.fieldErrors?.now}>
            {(control) => (
              <Input
                {...control}
                defaultValue={state.values?.now ?? testimonial?.now ?? ""}
              />
            )}
          </FormField>
        </div>
      </div>

      <aside className="flex flex-col gap-md rounded-container border border-border bg-card p-md">
        <span className="font-mono text-label-md uppercase text-muted-foreground">
          Display
        </span>

        <FormField
          name="order"
          label="Order"
          hint="Lower numbers appear first."
          error={state.fieldErrors?.order}
        >
          {(control) => (
            <Input
              {...control}
              type="number"
              defaultValue={state.values?.order ?? String(testimonial?.order ?? 0)}
            />
          )}
        </FormField>

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

export { TestimonialForm }
