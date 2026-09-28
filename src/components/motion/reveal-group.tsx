"use client"

import { motion, stagger } from "motion/react"

import { STAGGER_SECONDS } from "@/lib/motion"
import { useRevealControls } from "@/components/motion/use-reveal-controls"

/**
 * The group animates nothing itself; it exists to hand its RevealItem children
 * a shared trigger and a single stagger delay, so no call site ever hardcodes
 * a per-card delay.
 */
const revealGroupVariants = {
  hidden: {},
  visible: { transition: { delayChildren: stagger(STAGGER_SECONDS) } },
}

type RevealGroupElement = "div" | "ul" | "ol" | "dl"

function RevealGroup({
  as = "div",
  className,
  children,
}: {
  as?: RevealGroupElement
  className?: string
  children: React.ReactNode
}) {
  const Component = motion[as]
  const { ref, controls } = useRevealControls()

  return (
    <Component
      // `Component` is a dynamic `motion[as]`, so its ref type is an
      // intersection across every possible element — no single ref
      // satisfies it structurally, though `ref` is always an HTMLElement.
      ref={ref as never}
      className={className}
      initial={false}
      animate={controls}
      whileInView="visible"
      // No `amount`: it's relative to the whole element, so on tall
      // content (e.g. long grids) the viewport can never satisfy a
      // fraction and it stays hidden forever. Default ("some") fires on
      // any pixel intersecting.
      viewport={{ once: true }}
      variants={revealGroupVariants}
    >
      {children}
    </Component>
  )
}

export { RevealGroup }
