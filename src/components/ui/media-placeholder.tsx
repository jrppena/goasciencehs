import { ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Stands in for photography that has not been shot yet. Pure CSS and an icon,
 * so no placeholder images land in `public/`. Purely decorative, so it's
 * hidden from assistive tech.
 */
function MediaPlaceholder({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="media-placeholder"
      aria-hidden="true"
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
