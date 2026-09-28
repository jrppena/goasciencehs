"use client"

import { useEffect, useRef } from "react"
import { useAnimationControls } from "motion/react"

/**
 * Reveal blocks render visible in the SSR HTML. On mount, only hide the ones
 * still below the viewport — never hide content that's already on screen
 * (that would include anchor-nav targets, which land there already scrolled
 * into view). `whileInView` then fades those hidden blocks in once.
 */
function useRevealControls() {
  const ref = useRef<HTMLElement>(null)
  const controls = useAnimationControls()

  useEffect(() => {
    if (ref.current && ref.current.getBoundingClientRect().top >= window.innerHeight) {
      controls.start("hidden")
    }
  }, [controls])

  return { ref, controls }
}

export { useRevealControls }
