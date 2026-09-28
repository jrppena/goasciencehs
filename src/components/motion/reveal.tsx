"use client"

import { motion } from "motion/react"

import { DURATION, EASE_ATHLETIC, REVEAL_OFFSET_PX } from "@/lib/motion"
import { useRevealControls } from "@/components/motion/use-reveal-controls"

/** The elements a reveal is ever asked to be. Keeps the markup semantic. */
type RevealElement = "div" | "section" | "article" | "figure" | "li"

/**
 * Fades a block up the first time it scrolls into view. Renders visible in
 * the SSR HTML; only blocks starting below the viewport get hidden on mount
 * (see useRevealControls) before whileInView fades them back in.
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
  const { ref, controls } = useRevealControls()

  return (
    <Component
      data-reveal
      // `Component` is a dynamic `motion[as]`, so its ref type is an
      // intersection across every possible element — no single ref
      // satisfies it structurally, though `ref` is always an HTMLElement.
      ref={ref as never}
      className={className}
      initial={false}
      animate={controls}
      whileInView="visible"
      variants={{
        hidden: { opacity: 0, y: REVEAL_OFFSET_PX, transition: { duration: 0 } },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.base, ease: EASE_ATHLETIC, delay },
        },
      }}
      // No `amount`: it's relative to the whole element, so tall blocks
      // may never satisfy a fraction and never reveal. Default ("some")
      // fires on any pixel intersecting.
      viewport={{ once: true }}
    >
      {children}
    </Component>
  )
}

export { Reveal }
