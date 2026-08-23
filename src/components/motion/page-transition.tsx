import { ViewTransition } from "react"

/**
 * Wraps a route's content so navigation slides rather than cuts. Lives in each
 * page.tsx rather than the layout: layouts persist across navigation, so enter
 * and exit would never fire there.
 *
 * `default: "none"` keeps untyped transitions — browser back/forward, a
 * router.refresh() — from picking up a direction they cannot know.
 */
const directional = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
} as const

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter={directional} exit={directional} default="none">
      {/* A single element, so the browser snapshots the page once instead of
          once per section. Plain block flow — the same box main used to give
          these sections directly. */}
      <div>{children}</div>
    </ViewTransition>
  )
}

export { PageTransition }
