import { ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Stands in for photography that has not been shot yet. Pure CSS and an icon,
 * so no placeholder images land in `public/`. Swapping in `next/image` later
 * is a change to this one file. `label` names the missing shot for assistive
 * tech; it is deliberately not drawn.
 */
function MediaPlaceholder({
  label,
  className,
  ...props
}: React.ComponentProps<"div"> & { label: string }) {
  return (
    <div
      data-slot="media-placeholder"
      role="img"
      aria-label={`Placeholder image: ${label}`}
      className={cn(
        "flex items-center justify-center rounded-container border border-border bg-surface-container",
        className
      )}
      {...props}
    >
      <ImageIcon
        className="size-16 text-outline"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </div>
  )
}

export { MediaPlaceholder }
