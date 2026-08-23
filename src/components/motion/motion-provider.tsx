"use client"

import { MotionConfig } from "motion/react"

import { DURATION, EASE_ATHLETIC } from "@/lib/motion"

/**
 * Site-wide motion defaults. `reducedMotion="user"` drops transform and layout
 * animation for anyone whose OS asks for less motion, while keeping the opacity
 * fade — content still arrives rather than popping.
 */
function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: DURATION.base, ease: EASE_ATHLETIC }}
    >
      {children}
    </MotionConfig>
  )
}

export { MotionProvider }
