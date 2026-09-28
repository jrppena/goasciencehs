import { describe, expect, it } from "vitest"

import { SiteSettingsModel, type SiteSettings } from "@/lib/db/models/site-settings"

const validSettings: Partial<SiteSettings> = {
  name: "Goa Science High School",
  shortName: "GSHS",
  tagline: "Educating the mind without educating the heart is no education at all.",
  description: "A public science high school in Goa, Camarines Sur.",
  address: "Tagongtong, Goa, Camarines Sur, 4422, Philippines",
  phone: "+63 54 453 1234",
  email: "info@goasciencehs.edu.ph",
  socials: [{ label: "Facebook", href: "https://facebook.com" }],
}

describe("SiteSettings model", () => {
  it("accepts valid settings", async () => {
    await expect(new SiteSettingsModel(validSettings).validate()).resolves.toBeUndefined()
  })

  it("rejects a missing required field", async () => {
    const settings = new SiteSettingsModel({
      ...validSettings,
      phone: undefined,
    })

    await expect(settings.validate()).rejects.toHaveProperty("errors.phone")
  })
})
