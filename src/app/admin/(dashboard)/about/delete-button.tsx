"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

/** Two-step delete used by every About list; the action is passed by the page. */
function AboutDeleteButton({
  id,
  label,
  action,
}: {
  id: string
  label: string
  action: (formData: FormData) => Promise<void>
}) {
  const [confirming, setConfirming] = useState(false)

  if (!confirming) {
    return (
      <Button variant="ghost" size="sm" onClick={() => setConfirming(true)}>
        Delete
      </Button>
    )
  }

  return (
    <form action={action} className="flex items-center gap-xs">
      <input type="hidden" name="id" value={id} />
      <span className="max-w-[14rem] truncate font-mono text-label-md uppercase text-error">
        Delete “{label}”?
      </span>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setConfirming(false)}
      >
        Cancel
      </Button>
      <Button type="submit" variant="destructive" size="sm">
        Delete
      </Button>
    </form>
  )
}

export { AboutDeleteButton }
