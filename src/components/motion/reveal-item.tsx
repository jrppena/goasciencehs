"use client"

import { motion } from "motion/react"

import { DURATION, EASE_ATHLETIC, REVEAL_OFFSET_PX } from "@/lib/motion"

/** Named so RevealGroup can drive it; the group owns all the timing. */
const revealItemVariants = {
  hidden: { opacity: 0, y: REVEAL_OFFSET_PX, transition: { duration: 0 } },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_ATHLETIC },
  },
}

type RevealItemElement = "div" | "li" | "article" | "figure"

/**
 * One cell of a staggered grid or list. Must be a descendant of RevealGroup —
 * it carries no trigger of its own and takes its cue from the group's variant.
 */
function RevealItem({
  as = "div",
  className,
  children,
}: {
  as?: RevealItemElement
  className?: string
  children: React.ReactNode
}) {
  const Component = motion[as]

  return (
    <Component data-reveal className={className} variants={revealItemVariants}>
      {children}
    </Component>
  )
}

export { RevealItem }
