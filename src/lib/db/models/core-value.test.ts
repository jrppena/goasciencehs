import { describe, expect, it } from "vitest"

import { CoreValueModel, type CoreValue } from "@/lib/db/models/core-value"

const validValue: Partial<CoreValue> = {
  icon: "FlaskConical",
  title: "Inquiry",
  body: "Questions before answers.",
}

describe("CoreValue model", () => {
  it("accepts a valid value and applies the order default", async () => {
    const value = new CoreValueModel(validValue)

    await expect(value.validate()).resolves.toBeUndefined()
    expect(value.order).toBe(0)
  })

  it("rejects a missing required field", async () => {
    const value = new CoreValueModel({ ...validValue, title: undefined })

    await expect(value.validate()).rejects.toHaveProperty("errors.title")
  })
})
