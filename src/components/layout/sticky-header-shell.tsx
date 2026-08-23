"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

/** Far enough that a stray touch does not flicker the state. */
const SCROLL_THRESHOLD_PX = 8

/**
 * The sticky header's chrome. Split out so SiteHeader — the logo, the nav, the
 * skip link — stays a server component; only the scroll listener ships.
 */
function StickyHeaderShell({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const syncScrollState = () =>
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD_PX)

    syncScrollState()
    window.addEventListener("scroll", syncScrollState, { passive: true })
    return () => window.removeEventListener("scroll", syncScrollState)
  }, [])

  return (
    <header
      // Named so view transitions can hold it still while the page slides
      // beneath it — see ::view-transition-group(site-header) in globals.css.
      style={{ viewTransitionName: "site-header" }}
      // DESIGN.md > Elevation: depth is a hard offset, never a blur. This is
      // the 2D-stacked shadow flattened to a 2px bar under the header.
      className={cn(
        "sticky top-0 z-40 border-b bg-card transition-shadow duration-base ease-athletic",
        isScrolled && "shadow-[0_2px_0_0_var(--primary)]"
      )}
    >
      {children}
    </header>
  )
}

export { StickyHeaderShell }
