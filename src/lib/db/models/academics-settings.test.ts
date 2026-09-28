import { describe, expect, it } from "vitest"

import { AcademicsSettingsModel } from "@/lib/db/models/academics-settings"

describe("AcademicsSettings model", () => {
  it("accepts the core subject hours", async () => {
    const settings = new AcademicsSettingsModel({ coreSubjectHours: 160 })

    await expect(settings.validate()).resolves.toBeUndefined()
  })

  it("rejects a missing coreSubjectHours", async () => {
    const settings = new AcademicsSettingsModel({})

    await expect(settings.validate()).rejects.toHaveProperty(
      "errors.coreSubjectHours"
    )
  })

  it("rejects core subject hours below 1", async () => {
    const settings = new AcademicsSettingsModel({ coreSubjectHours: 0 })

    await expect(settings.validate()).rejects.toHaveProperty(
      "errors.coreSubjectHours"
    )
  })
})
