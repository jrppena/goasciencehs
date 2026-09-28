"use client"

import { motion } from "motion/react"

import { DURATION, EASE_ATHLETIC, REVEAL_OFFSET_PX } from "@/lib/motion"

/** The elements a reveal is ever asked to be. Keeps the markup semantic. */
type RevealElement = "div" | "section" | "article" | "figure" | "li"

/**
 * Fades a block up the first time it scrolls into view. Children are rendered
 * by the caller, so a server component passing them here keeps them on the
 * server — only this wrapper crosses the client boundary.
 */
function Reveal({
  as = "div",
  delay = 0,
  className,
  children,
}: {
  as?: RevealElement
  /** Seconds to hold before starting. Use STAGGER_SECONDS multiples. */
  delay?: number
  className?: string
  children: React.ReactNode
}) {
  const Component = motion[as]

  return (
    <Component
      data-reveal
      className={className}
      initial={{ opacity: 0, y: REVEAL_OFFSET_PX }}
      whileInView={{ opacity: 1, y: 0 }}
      // No `amount`: it's relative to the whole element, so tall blocks
      // may never satisfy a fraction and never reveal. Default ("some")
      // fires on any pixel intersecting.
      viewport={{ once: true }}
      transition={{ duration: DURATION.base, ease: EASE_ATHLETIC, delay }}
    >
      {children}
    </Component>
  )
}

export { Reveal }
