"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { deleteNewsAction } from "./actions"

function DeleteNewsButton({ id, title }: { id: string; title: string }) {
  const [confirming, setConfirming] = useState(false)

  if (!confirming) {
    return (
      <Button variant="ghost" size="sm" onClick={() => setConfirming(true)}>
        Delete
      </Button>
    )
  }

  return (
    <form action={deleteNewsAction} className="flex items-center gap-xs">
      <input type="hidden" name="id" value={id} />
      <span className="max-w-[14rem] truncate font-mono text-label-md uppercase text-error">
        Delete “{title}”?
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

export { DeleteNewsButton }
