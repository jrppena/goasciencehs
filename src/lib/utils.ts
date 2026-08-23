import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// The type scale in DESIGN.md uses word-shaped names (text-body-md,
// text-button). tailwind-merge cannot tell those from text colors, so
// without this it treats `text-button` and `text-on-primary` as the same
// group and drops the font size. Register the scale explicitly.
const fontSizes = [
  "display-lg",
  "headline-lg",
  "headline-lg-mobile",
  "headline-md",
  "body-lg",
  "body-md",
  "label-md",
  "button",
] as const

// Same problem for the motion scale: tailwind-merge only recognises numeric
// durations, so without this it cannot tell `duration-fast` from
// `duration-300` and both survive a merge.
const durations = ["fast", "base", "slow"] as const

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...fontSizes] }],
      duration: [{ duration: [...durations] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
