import { beforeEach, describe, expect, it, vi } from "vitest"

const { mockedRequireAdmin } = vi.hoisted(() => ({
  mockedRequireAdmin: vi.fn(),
}))

vi.mock("@/lib/auth/require-admin", () => ({
  requireAdmin: mockedRequireAdmin,
}))
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }))
vi.mock("next/navigation", () => ({ redirect: vi.fn() }))

import { updateSchoolStatsAction, updateSiteSettingsAction } from "./actions"
import {
  initialSettingsFormState,
  initialStatsFormState,
} from "./form-state"

function settingsForm(overrides: Record<string, string> = {}) {
  const formData = new FormData()
  formData.set("name", "Goa Science High School")
  formData.set("shortName", "GSHS")
  formData.set("tagline", "Tagline")
  formData.set("description", "Description")
  formData.set("address", "Address")
  formData.set("phone", "+63 54 453 1234")
  formData.set("email", "info@goasciencehs.edu.ph")
  formData.append("socialLabel", "Facebook")
  formData.append("socialHref", "https://facebook.com")

  for (const [key, value] of Object.entries(overrides)) {
    formData.set(key, value)
  }

  return formData
}

describe("updateSiteSettingsAction", () => {
  beforeEach(() => {
    mockedRequireAdmin.mockReset()
  })

  it("rejects unauthenticated calls", async () => {
    mockedRequireAdmin.mockRejectedValue(new Error("Unauthorized"))

    await expect(
      updateSiteSettingsAction(initialSettingsFormState, settingsForm())
    ).rejects.toThrow("Unauthorized")
  })

  it("rejects invalid payloads with field errors", async () => {
    mockedRequireAdmin.mockResolvedValue({ email: "admin@example.com" })

    const state = await updateSiteSettingsAction(
      initialSettingsFormState,
      settingsForm({ name: "" })
    )

    expect(state.status).toBe("error")
    expect(state.fieldErrors).toHaveProperty("name")
  })
})

describe("updateSchoolStatsAction", () => {
  beforeEach(() => {
    mockedRequireAdmin.mockReset()
  })

  it("rejects unauthenticated calls", async () => {
    mockedRequireAdmin.mockRejectedValue(new Error("Unauthorized"))

    const formData = new FormData()
    await expect(
      updateSchoolStatsAction(initialStatsFormState, formData)
    ).rejects.toThrow("Unauthorized")
  })

  it("rejects invalid payloads with field errors", async () => {
    mockedRequireAdmin.mockResolvedValue({ email: "admin@example.com" })

    const formData = new FormData()
    formData.set("yearEstablished", "2015")
    formData.set("collegeProgressionRate", "97%")

    const state = await updateSchoolStatsAction(initialStatsFormState, formData)

    expect(state.status).toBe("error")
    expect(state.fieldErrors).toHaveProperty("learnersEnrolled")
  })
})
