import { createElement as h } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { Button } from "./button"

describe("Button", () => {
  it("renders a link as a plain anchor, not a button", () => {
    const html = renderToStaticMarkup(h(Button, { render: h("a", { href: "/x" }) }, "Go"))
    expect(html).toMatch(/^<a /)
    expect(html).toContain('href="/x"')
    expect(html).not.toContain('role="button"')
    expect(html).not.toContain("tabindex")
  })

  it("keeps a native button on Base UI", () => {
    const html = renderToStaticMarkup(h(Button, null, "Save"))
    expect(html).toMatch(/^<button /)
    expect(html).toContain('type="button"')
  })
})
