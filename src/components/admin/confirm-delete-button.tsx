"use client"

import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"

/**
 * Two-step delete shared by every admin list. The inline confirm is announced
 * as an alert and focus lands on Cancel, so a keyboard user can never confirm
 * the delete with a stray Enter. Escape cancels and hands focus back to the
 * trigger.
 */
function ConfirmDeleteButton({
  id,
  label,
  action,
}: {
  id: string
  label: string
  action: (formData: FormData) => Promise<void>
}) {
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
        variant="ghost"
        size="sm"
        onClick={() => setConfirming(true)}
        aria-label={`Delete ${label}`}
      >
        Delete
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
      <input type="hidden" name="id" value={id} />
      <span
        role="alert"
        className="max-w-[14rem] truncate font-mono text-label-md uppercase text-error"
      >
        Delete “{label}”?
      </span>
      <Button type="button" variant="ghost" size="sm" onClick={cancel} autoFocus>
        Cancel
      </Button>
      <Button type="submit" variant="destructive" size="sm">
        Delete
      </Button>
    </form>
  )
}

export { ConfirmDeleteButton }
