/**
 * JS mirror of the motion tokens in globals.css. CSS custom properties are not
 * readable from JS at module scope, so the two layers have to be kept in step
 * by hand — change one, change the other.
 */

/** DESIGN.md's single easing curve, in the tuple form Motion expects. */
const EASE_ATHLETIC = [0.2, 0, 0, 1] as const

/** --transition-duration-* from globals.css, in seconds. */
const DURATION = {
  fast: 0.15,
  base: 0.3,
  slow: 0.45,
} as const

/** How far a revealing block travels before settling. Matches --spacing-md. */
const REVEAL_OFFSET_PX = 24

/** Gap between siblings in a staggered grid or list. */
const STAGGER_SECONDS = 0.07

export { EASE_ATHLETIC, DURATION, REVEAL_OFFSET_PX, STAGGER_SECONDS }
