"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// DESIGN.md > Typography: JetBrains Mono carries labels and metadata.
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-xs font-mono text-label-md leading-none uppercase text-muted-foreground select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
