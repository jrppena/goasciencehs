import { beforeEach, describe, expect, it, vi } from "vitest"

const { mockedRequireAdmin } = vi.hoisted(() => ({
  mockedRequireAdmin: vi.fn(),
}))

vi.mock("@/lib/auth/require-admin", () => ({
  requireAdmin: mockedRequireAdmin,
}))
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }))
vi.mock("next/navigation", () => ({ redirect: vi.fn() }))

import { updateAcademicsSettingsAction } from "./settings-actions"
import { initialAcademicsListFormState } from "./list-form-state"

function settingsForm(overrides: Record<string, string> = {}) {
  const formData = new FormData()
  formData.set("coreSubjectHours", "160")

  for (const [key, value] of Object.entries(overrides)) {
    formData.set(key, value)
  }

  return formData
}

describe("updateAcademicsSettingsAction", () => {
  beforeEach(() => {
    mockedRequireAdmin.mockReset()
  })

  it("rejects unauthenticated calls", async () => {
    mockedRequireAdmin.mockRejectedValue(new Error("Unauthorized"))

    await expect(
      updateAcademicsSettingsAction(initialAcademicsListFormState, settingsForm())
    ).rejects.toThrow("Unauthorized")
  })

  it("rejects non-numeric core subject hours", async () => {
    mockedRequireAdmin.mockResolvedValue({ email: "admin@example.com" })

    const state = await updateAcademicsSettingsAction(
      initialAcademicsListFormState,
      settingsForm({ coreSubjectHours: "abc" })
    )

    expect(state.status).toBe("error")
    expect(state.fieldErrors).toHaveProperty("coreSubjectHours")
  })

  it("rejects empty core subject hours", async () => {
    mockedRequireAdmin.mockResolvedValue({ email: "admin@example.com" })

    const state = await updateAcademicsSettingsAction(
      initialAcademicsListFormState,
      settingsForm({ coreSubjectHours: "" })
    )

    expect(state.status).toBe("error")
    expect(state.fieldErrors).toHaveProperty("coreSubjectHours")
  })
})
