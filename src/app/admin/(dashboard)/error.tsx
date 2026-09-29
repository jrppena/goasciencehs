"use client"

import { useEffect } from "react"
import Link from "next/link"
import { RotateCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AdminError({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col gap-md">
      <div className="flex flex-col gap-xs">
        <h1 className="font-display text-headline-lg uppercase text-primary">
          Something went wrong
        </h1>
        <p className="max-w-prose text-body-md text-muted-foreground">
          This section could not be loaded. It is usually temporary — try
          again, or head back to the dashboard.
        </p>
        {error.digest ? (
          <p className="font-mono text-label-md uppercase text-muted-foreground">
            Reference: {error.digest}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-sm">
        <Button onClick={() => retry()}>
          Try again
          <RotateCcwIcon />
        </Button>
        <Button variant="outline" render={<Link href="/admin" />}>
          Back to dashboard
        </Button>
      </div>
    </div>
  )
}
