import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-20 w-full rounded-control border border-input bg-card px-sm py-xs text-body-md text-foreground transition-colors outline-none",
        "placeholder:text-outline",
        "focus-visible:border-2 focus-visible:border-ring focus-visible:px-[calc(var(--spacing-sm)-1px)]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50",
        "aria-invalid:border-2 aria-invalid:border-on-primary-fixed-variant aria-invalid:px-[calc(var(--spacing-sm)-1px)]",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
