import { beforeEach, describe, expect, it, vi } from "vitest"

const { mockedRequireAdmin } = vi.hoisted(() => ({
  mockedRequireAdmin: vi.fn(),
}))

vi.mock("@/lib/auth/require-admin", () => ({
  requireAdmin: mockedRequireAdmin,
}))
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }))
vi.mock("next/navigation", () => ({ redirect: vi.fn() }))

import { createMissionVisionAction } from "./actions"
import { initialAboutListFormState } from "../list-form-state"

function statementForm(overrides: Record<string, string> = {}) {
  const formData = new FormData()
  formData.set("icon", "Target")
  formData.set("tone", "primary")
  formData.set("label", "Mission")
  formData.set("title", "A statement")
  formData.set("body", "A body.")
  formData.set("order", "1")

  for (const [key, value] of Object.entries(overrides)) {
    formData.set(key, value)
  }

  return formData
}

describe("createMissionVisionAction", () => {
  beforeEach(() => {
    mockedRequireAdmin.mockReset()
  })

  it("rejects unauthenticated calls", async () => {
    mockedRequireAdmin.mockRejectedValue(new Error("Unauthorized"))

    await expect(
      createMissionVisionAction(initialAboutListFormState, statementForm())
    ).rejects.toThrow("Unauthorized")
  })

  it("rejects a tone outside primary | secondary", async () => {
    mockedRequireAdmin.mockResolvedValue({ email: "admin@example.com" })

    const state = await createMissionVisionAction(
      initialAboutListFormState,
      statementForm({ tone: "tertiary" })
    )

    expect(state.status).toBe("error")
    expect(state.fieldErrors).toHaveProperty("tone")
  })
})
