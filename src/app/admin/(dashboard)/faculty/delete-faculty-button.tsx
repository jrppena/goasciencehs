"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { deleteFacultyAction } from "./actions"

function DeleteFacultyButton({ id, name }: { id: string; name: string }) {
  const [confirming, setConfirming] = useState(false)

  if (!confirming) {
    return (
      <Button variant="ghost" size="sm" onClick={() => setConfirming(true)}>
        Delete
      </Button>
    )
  }

  return (
    <form action={deleteFacultyAction} className="flex items-center gap-xs">
      <input type="hidden" name="id" value={id} />
      <span className="max-w-[14rem] truncate font-mono text-label-md uppercase text-error">
        Delete “{name}”?
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

export { DeleteFacultyButton }
