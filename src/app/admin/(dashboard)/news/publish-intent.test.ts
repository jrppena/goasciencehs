import { describe, expect, it } from "vitest"

import { resolveIsPublished } from "./publish-intent"

function intentForm(intent?: string, published?: string) {
  const formData = new FormData()
  if (intent) formData.set("intent", intent)
  if (published) formData.set("published", published)
  return formData
}

describe("resolveIsPublished", () => {
  it("keeps a new post a draft when the form is submitted as-is", () => {
    expect(resolveIsPublished(intentForm())).toBe(false)
    expect(resolveIsPublished(intentForm("save"))).toBe(false)
  })

  it("publishes only when Publish is the chosen intent", () => {
    expect(resolveIsPublished(intentForm("publish"))).toBe(true)
    expect(resolveIsPublished(intentForm("publish", "off"))).toBe(true)
  })

  it("unpublishes only when Unpublish is the chosen intent", () => {
    expect(resolveIsPublished(intentForm("unpublish", "on"))).toBe(false)
  })

  it("keeps a live post live on an ordinary save", () => {
    expect(resolveIsPublished(intentForm("save", "on"))).toBe(true)
  })
})
