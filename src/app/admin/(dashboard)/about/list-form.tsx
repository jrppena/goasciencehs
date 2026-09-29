"use client"

import { useActionState } from "react"
import Link from "next/link"

import { describedBy } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  initialAboutListFormState,
  type AboutListFormState,
} from "./list-form-state"

export type AboutListField = {
  name: string
  label: string
  kind: "text" | "number" | "textarea" | "select"
  rows?: number
  options?: Array<{ value: string; label: string }>
  hint?: string
}

type AboutListFormProps = {
  action: (
    state: AboutListFormState,
    formData: FormData
  ) => Promise<AboutListFormState>
  fields: AboutListField[]
  submitLabel: string
  cancelHref: string
  hiddenId?: string
  values?: Record<string, string>
}

/** Shared form for the About page's ordered lists and the story singleton. */
function AboutListForm({
  action,
  fields,
  submitLabel,
  cancelHref,
  hiddenId,
  values,
}: AboutListFormProps) {
  const [state, formAction, pending] = useActionState(
    action,
    initialAboutListFormState
  )

  return (
    <form action={formAction} className="grid gap-md md:grid-cols-2">
      {hiddenId ? <input type="hidden" name="id" value={hiddenId} /> : null}

      {fields.map((field) => {
        const defaultValue =
          state.values?.[field.name] ?? values?.[field.name] ?? ""
        const wide = field.kind === "textarea"
        const selectClassName =
          "h-10 w-full rounded-control border border-input bg-card px-sm text-body-md text-foreground transition-colors outline-none focus-visible:border-2 focus-visible:border-ring aria-invalid:border-2 aria-invalid:border-on-primary-fixed-variant"

        return (
          <div
            key={field.name}
            className={wide ? "flex flex-col gap-xs md:col-span-2" : "flex flex-col gap-xs"}
          >
            <Label htmlFor={field.name}>{field.label}</Label>
            {field.kind === "textarea" ? (
              <Textarea
                id={field.name}
                name={field.name}
                rows={field.rows ?? 4}
                defaultValue={defaultValue}
                aria-invalid={state.fieldErrors?.[field.name] ? true : undefined}
                aria-describedby={describedBy(
                  field.hint && `${field.name}-hint`,
                  state.fieldErrors?.[field.name] && `${field.name}-error`
                )}
              />
            ) : field.kind === "select" ? (
              <select
                id={field.name}
                name={field.name}
                defaultValue={defaultValue}
                aria-invalid={state.fieldErrors?.[field.name] ? true : undefined}
                aria-describedby={describedBy(
                  field.hint && `${field.name}-hint`,
                  state.fieldErrors?.[field.name] && `${field.name}-error`
                )}
                className={selectClassName}
              >
                {(field.options ?? []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                id={field.name}
                name={field.name}
                type={field.kind === "number" ? "number" : "text"}
                defaultValue={defaultValue}
                aria-invalid={state.fieldErrors?.[field.name] ? true : undefined}
                aria-describedby={describedBy(
                  field.hint && `${field.name}-hint`,
                  state.fieldErrors?.[field.name] && `${field.name}-error`
                )}
              />
            )}
            {field.hint ? (
              <p
                id={`${field.name}-hint`}
                className="text-body-sm text-muted-foreground"
              >
                {field.hint}
              </p>
            ) : null}
            {state.fieldErrors?.[field.name] ? (
              <p
                id={`${field.name}-error`}
                className="text-body-sm text-error"
              >
                {state.fieldErrors[field.name]}
              </p>
            ) : null}
          </div>
        )
      })}

      {state.status === "error" && state.message ? (
        <p role="alert" className="text-body-md text-error md:col-span-2">
          {state.message}
        </p>
      ) : null}

      <div className="flex items-center gap-sm md:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
        <Button type="button" variant="ghost" render={<Link href={cancelHref} />}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export { AboutListForm }
