import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

// DESIGN.md > Components > Input Fields: clean 1px bordered box in body-md,
// focus is a 2px Athletic Blue border. Error states use a high-contrast
// version of the brand palette rather than red.
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-control border border-input bg-card px-sm py-xs text-body-md text-foreground transition-colors outline-none",
        "file:inline-flex file:h-8 file:border-0 file:bg-transparent file:font-mono file:text-label-md file:text-foreground",
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

export { Input }
