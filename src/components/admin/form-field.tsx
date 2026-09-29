import type { ComponentProps, ReactNode } from "react"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type FormControlProps = {
  id: string
  name: string
  "aria-invalid": true | undefined
  "aria-describedby": string | undefined
}

type FormFieldProps = {
  name: string
  label: string
  /** Validation message from the server action, rendered under the control. */
  error?: string
  /** Persistent helper text, linked to the control via aria-describedby. */
  hint?: string
  /** Extra wrapper classes, e.g. a grid span. */
  className?: string
  /** Repeating controls (a list of inputs) label the group, not one input. */
  group?: boolean
  children: (control: FormControlProps) => ReactNode
}

/**
 * One labelled field: the label, the control (through a render prop that
 * receives its id and aria wiring), an optional hint, and the error slot.
 * Centralising this keeps every admin form's helper, focus, and error styling
 * in one place, and the `${name}-hint` / `${name}-error` id convention is what
 * the form actions' fieldErrors are keyed on.
 */
function FormField({
  name,
  label,
  error,
  hint,
  className,
  group = false,
  children,
}: FormFieldProps) {
  const describedBy =
    [hint && `${name}-hint`, error && `${name}-error`]
      .filter(Boolean)
      .join(" ") || undefined

  return (
    <div className={cn("flex flex-col gap-xs", className)}>
      <Label htmlFor={group ? undefined : name}>{label}</Label>
      {children({
        id: name,
        name,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })}
      {hint ? (
        <p id={`${name}-hint`} className="text-body-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
      <FieldError id={`${name}-error`} message={error} />
    </div>
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

// DESIGN.md > Components > Input Fields: error states use a high-contrast
// version of the brand palette rather than red.
const selectClasses =
  "h-10 w-full rounded-control border border-input bg-card px-sm text-body-md text-foreground transition-colors outline-none focus-visible:border-2 focus-visible:border-ring aria-invalid:border-2 aria-invalid:border-on-primary-fixed-variant"

function Select({ className, ...props }: ComponentProps<"select">) {
  return <select className={cn(selectClasses, className)} {...props} />
}

export { FieldError, FormField, Select }
