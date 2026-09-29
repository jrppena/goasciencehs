"use client"

import Link from "next/link"
import { useActionState, useState } from "react"

import { FormField, Select } from "@/components/admin/form-field"
import { useUnsavedChanges } from "@/components/admin/navigation-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export type AdminListFormState = {
  status: "idle" | "error"
  message?: string
  fieldErrors?: Record<string, string>
  /** Echoed back so a failed submit does not lose the admin's input. */
  values?: Record<string, string | string[]>
}

export type AdminListField = {
  name: string
  label: string
  kind: "text" | "number" | "textarea" | "select" | "list"
  rows?: number
  options?: Array<{ value: string; label: string }>
  hint?: string
}

type AdminListFormProps<S extends AdminListFormState> = {
  action: (state: S, formData: FormData) => Promise<S>
  initialState: S
  fields: AdminListField[]
  submitLabel: string
  cancelHref: string
  hiddenId?: string
  values?: Record<string, string | string[]>
}

/** Seeds the controlled rows of every list field from the edit page's values. */
function initialRows(
  fields: AdminListField[],
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

/**
 * The shared form behind the About and Academics ordered lists: fields are
 * described by configuration, so both sections stay one implementation.
 */
function AdminListForm<S extends AdminListFormState>({
  action,
  initialState,
  fields,
  submitLabel,
  cancelHref,
  hiddenId,
  values,
}: AdminListFormProps<S>) {
  // S is always a plain state object here, so Awaited<S> is S.
  const [state, formAction, pending] = useActionState<S, FormData>(
    action,
    initialState as Awaited<S>
  )
  const [listValues, setListValues] = useState<Record<string, string[]>>(() =>
    initialRows(fields, values)
  )
  const [dirty, setDirty] = useState(false)

  useUnsavedChanges(dirty)

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
    <form
      action={formAction}
      onChange={() => setDirty(true)}
      className="grid gap-md md:grid-cols-2"
    >
      {hiddenId ? <input type="hidden" name="id" value={hiddenId} /> : null}

      {fields.map((field) => {
        const rawValue = state.values?.[field.name] ?? values?.[field.name]
        const defaultValue = typeof rawValue === "string" ? rawValue : ""
        const wide = field.kind === "textarea" || field.kind === "list"

        return (
          <FormField
            key={field.name}
            name={field.name}
            label={field.label}
            hint={field.hint}
            error={state.fieldErrors?.[field.name]}
            className={wide ? "md:col-span-2" : undefined}
            group={field.kind === "list"}
          >
            {(control) => {
              if (field.kind === "list") {
                return (
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
                          aria-invalid={control["aria-invalid"]}
                          aria-describedby={control["aria-describedby"]}
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
                )
              }

              if (field.kind === "textarea") {
                return (
                  <Textarea
                    {...control}
                    rows={field.rows ?? 4}
                    defaultValue={defaultValue}
                  />
                )
              }

              if (field.kind === "select") {
                return (
                  <Select {...control} defaultValue={defaultValue}>
                    {(field.options ?? []).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                )
              }

              return (
                <Input
                  {...control}
                  type={field.kind === "number" ? "number" : "text"}
                  defaultValue={defaultValue}
                />
              )
            }}
          </FormField>
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

export { AdminListForm }
