import { describe, expect, it } from "vitest"

import { telHref } from "@/lib/utils"

describe("telHref", () => {
  it("strips whitespace from a display phone number", () => {
    expect(telHref("(054) 123 4567")).toBe("tel:(054)1234567")
  })
})
