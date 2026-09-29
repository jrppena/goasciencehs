"use client"

import { useEffect, useRef, useState, type ComponentProps } from "react"

import { Button } from "@/components/ui/button"

type ConfirmActionButtonProps = {
  action: (formData: FormData) => Promise<void>
  /**
   * Values submitted with the action; omit when the action is already bound.
   * Repeating a name (as bulk actions do with `ids`) submits several values.
   */
  hiddenFields?: Array<{ name: string; value: string }>
  /** Visible label on the resting trigger button and the confirm submit. */
  label: string
  /** Question announced when confirming, e.g. Delete “Title”? */
  confirmLabel: string
  /** Accessible name for the trigger; defaults to label. */
  ariaLabel?: string
  triggerVariant?: ComponentProps<typeof Button>["variant"]
  submitVariant?: ComponentProps<typeof Button>["variant"]
}

/**
 * Two-step inline action shared by every admin list. The confirm is announced
 * as an alert and focus lands on Cancel, so a keyboard user can never confirm
 * with a stray Enter. Escape cancels and hands focus back to the trigger.
 */
function ConfirmActionButton({
  action,
  hiddenFields,
  label,
  confirmLabel,
  ariaLabel,
  triggerVariant = "ghost",
  submitVariant = "destructive",
}: ConfirmActionButtonProps) {
  const [confirming, setConfirming] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const restoreFocus = useRef(false)

  useEffect(() => {
    if (!confirming && restoreFocus.current) {
      restoreFocus.current = false
      triggerRef.current?.focus()
    }
  }, [confirming])

  function cancel() {
    restoreFocus.current = true
    setConfirming(false)
  }

  if (!confirming) {
    return (
      <Button
        ref={triggerRef}
        variant={triggerVariant}
        size="sm"
        onClick={() => setConfirming(true)}
        aria-label={ariaLabel ?? label}
      >
        {label}
      </Button>
    )
  }

  return (
    <form
      action={action}
      onKeyDown={(event) => {
        if (event.key === "Escape") cancel()
      }}
      className="flex items-center gap-xs"
    >
      {hiddenFields?.map((field, index) => (
        <input
          key={`${field.name}-${index}`}
          type="hidden"
          name={field.name}
          value={field.value}
        />
      ))}
      <span
        role="alert"
        title={confirmLabel}
        className="max-w-[14rem] truncate font-mono text-label-md uppercase text-error"
      >
        {confirmLabel}
      </span>
      <Button type="button" variant="ghost" size="sm" onClick={cancel} autoFocus>
        Cancel
      </Button>
      <Button type="submit" variant={submitVariant} size="sm">
        {label}
      </Button>
    </form>
  )
}

export { ConfirmActionButton }
