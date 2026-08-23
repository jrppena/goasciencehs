import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// DESIGN.md > Components > Buttons: Anybody, bold, uppercase, 4px radius.
// Secondary is an Athletic Blue outline with a Golden Yellow hover.
// The trailing-arrow nudge is scoped with :not(:only-child) so icon-only
// buttons, whose glyph is the whole control, stay put.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-control border border-transparent bg-clip-padding font-display text-button whitespace-nowrap uppercase transition-colors duration-fast outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&>svg:not(:only-child)]:transition-transform [&>svg:not(:only-child)]:duration-fast hover:[&>svg:not(:only-child)]:translate-x-0.5",
  {
    variants: {
      variant: {
        default: "bg-primary text-on-primary hover:bg-primary-container",
        secondary:
          "border-2 border-primary bg-transparent text-primary hover:border-secondary-container hover:bg-secondary-container hover:text-on-secondary-fixed",
        outline:
          "border-border bg-card text-foreground hover:border-primary hover:text-primary",
        ghost: "text-primary hover:bg-primary-fixed",
        accent:
          "bg-secondary-container text-on-secondary-fixed hover:bg-secondary-fixed-dim",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-on-error-container focus-visible:ring-destructive",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 gap-base px-md",
        sm: "h-8 gap-xs px-sm text-label-md",
        lg: "h-12 gap-base px-lg",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  render,
  // A rendered element (a Link, say) is usually not a <button>, and Base UI
  // warns when it is told otherwise. Only claim native semantics by default
  // when this really does render a <button>.
  nativeButton = render === undefined,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      render={render}
      nativeButton={nativeButton}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
