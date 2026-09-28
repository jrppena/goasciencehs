"use client"

import { useActionState, useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  initialAcademicsListFormState,
  type AcademicsListFormState,
} from "./list-form-state"

export type AcademicsListField = {
  name: string
  label: string
  kind: "text" | "number" | "textarea" | "select" | "list"
  rows?: number
  options?: Array<{ value: string; label: string }>
  hint?: string
}

type AcademicsListFormProps = {
  action: (
    state: AcademicsListFormState,
    formData: FormData
  ) => Promise<AcademicsListFormState>
  fields: AcademicsListField[]
  submitLabel: string
  cancelHref: string
  hiddenId?: string
  values?: Record<string, string | string[]>
}

/** Seeds the controlled rows of every list field from the edit page's values. */
function initialRows(
  fields: AcademicsListField[],
  values?: Record<string, string | string[]>
) {
  const rows: Record<string, string[]> = {}

  for (const field of fields) {
    if (field.kind !== "list") continue

    const value = values?.[field.name]
    rows[field.name] = Array.isArray(value) ? value : value ? [value] : []
  }

  return rows
}

/** Shared form for the Academics page's ordered lists. */
function AcademicsListForm({
  action,
  fields,
  submitLabel,
  cancelHref,
  hiddenId,
  values,
}: AcademicsListFormProps) {
  const [state, formAction, pending] = useActionState(
    action,
    initialAcademicsListFormState
  )
  const [listValues, setListValues] = useState<Record<string, string[]>>(() =>
    initialRows(fields, values)
  )

  function updateRow(field: string, index: number, value: string) {
    setListValues((current) => {
      const rows = [...(current[field] ?? [])]
      rows[index] = value
      return { ...current, [field]: rows }
    })
  }

  function removeRow(field: string, index: number) {
    setListValues((current) => ({
      ...current,
      [field]: (current[field] ?? []).filter((_, i) => i !== index),
    }))
  }

  function addRow(field: string) {
    setListValues((current) => ({
      ...current,
      [field]: [...(current[field] ?? []), ""],
    }))
  }

  return (
    <form action={formAction} className="grid gap-md md:grid-cols-2">
      {hiddenId ? <input type="hidden" name="id" value={hiddenId} /> : null}

      {fields.map((field) => {
        const rawValue = state.values?.[field.name] ?? values?.[field.name]
        const defaultValue = typeof rawValue === "string" ? rawValue : ""
        const wide = field.kind === "textarea" || field.kind === "list"
        const selectClassName =
          "h-10 w-full rounded-control border border-input bg-card px-sm text-body-md text-foreground transition-colors outline-none focus-visible:border-2 focus-visible:border-ring aria-invalid:border-2 aria-invalid:border-on-primary-fixed-variant"

        return (
          <div
            key={field.name}
            className={wide ? "flex flex-col gap-xs md:col-span-2" : "flex flex-col gap-xs"}
          >
            <Label htmlFor={field.kind === "list" ? undefined : field.name}>
              {field.label}
            </Label>
            {field.kind === "list" ? (
              <>
                {(listValues[field.name] ?? []).map((item, index) => (
                  <div key={index} className="flex items-center gap-xs">
                    <Input
                      name={field.name}
                      value={item}
                      onChange={(event) =>
                        updateRow(field.name, index, event.target.value)
                      }
                      aria-label={`${field.label} item ${index + 1}`}
                      aria-invalid={
                        state.fieldErrors?.[field.name] ? true : undefined
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRow(field.name, index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-fit"
                  onClick={() => addRow(field.name)}
                >
                  Add item
                </Button>
              </>
            ) : field.kind === "textarea" ? (
              <Textarea
                id={field.name}
                name={field.name}
                rows={field.rows ?? 4}
                defaultValue={defaultValue}
                aria-invalid={state.fieldErrors?.[field.name] ? true : undefined}
              />
            ) : field.kind === "select" ? (
              <select
                id={field.name}
                name={field.name}
                defaultValue={defaultValue}
                aria-invalid={state.fieldErrors?.[field.name] ? true : undefined}
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
              />
            )}
            {field.hint ? (
              <p className="text-body-sm text-muted-foreground">{field.hint}</p>
            ) : null}
            {state.fieldErrors?.[field.name] ? (
              <p className="text-body-sm text-error">
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

export { AcademicsListForm }
