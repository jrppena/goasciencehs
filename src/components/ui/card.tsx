import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// DESIGN.md > Elevation: no shadows, a 1px low-contrast outline instead.
// DESIGN.md > Components > Cards: a 4px Notice Stripe on the top edge,
// reserved for Advisory and Admissions posts.
const cardVariants = cva(
  "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-container border border-border bg-card py-(--card-spacing) text-body-md text-card-foreground [--card-spacing:var(--spacing-md)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:var(--spacing-sm)] data-[size=sm]:has-data-[slot=card-footer]:pb-0",
  {
    variants: {
      stripe: {
        none: "",
        top: "border-t-4 border-t-primary",
      },
      // DESIGN.md > Elevation: a hovered card shifts colour and gains a sharp
      // accent — it never lifts on a shadow.
      interactive: {
        true: "transition-colors duration-fast hover:border-primary focus-within:border-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background",
        false: "",
      },
    },
    compoundVariants: [
      // The wipe rides on the top stripe, so it only makes sense there.
      { stripe: "top", interactive: true, class: "stripe-wipe" },
    ],
    defaultVariants: {
      stripe: "none",
      interactive: false,
    },
  }
)

function Card({
  className,
  size = "default",
  stripe,
  interactive,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(cardVariants({ stripe, interactive }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-xs px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-display text-headline-md text-on-surface group-data-[size=sm]/card:text-body-lg",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-body-md text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center border-t bg-surface-container-low p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
}
