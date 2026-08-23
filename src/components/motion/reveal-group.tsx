"use client"

import { motion, stagger } from "motion/react"

import { STAGGER_SECONDS } from "@/lib/motion"

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

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={revealGroupVariants}
    >
      {children}
    </Component>
  )
}

export { RevealGroup }
