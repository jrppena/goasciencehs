import { beforeEach, describe, expect, it, vi } from "vitest"

const { mockedRequireAdmin } = vi.hoisted(() => ({
  mockedRequireAdmin: vi.fn(),
}))

vi.mock("@/lib/auth/require-admin", () => ({
  requireAdmin: mockedRequireAdmin,
}))
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }))
vi.mock("next/navigation", () => ({ redirect: vi.fn() }))

import { createScienceProgramLevelAction } from "./actions"
import { initialAcademicsListFormState } from "../list-form-state"

function levelForm(overrides: Record<string, string> = {}) {
  const formData = new FormData()
  formData.set("grade", "Grade 7")
  formData.set("specialisation", "Environmental Science")
  formData.set("summary", "A summary.")
  formData.append("work", "Field sampling and data collection")
  formData.set("tone", "primary")
  formData.set("order", "1")

  for (const [key, value] of Object.entries(overrides)) {
    formData.set(key, value)
  }

  return formData
}

describe("createScienceProgramLevelAction", () => {
  beforeEach(() => {
    mockedRequireAdmin.mockReset()
  })

  it("rejects unauthenticated calls", async () => {
    mockedRequireAdmin.mockRejectedValue(new Error("Unauthorized"))

    await expect(
      createScienceProgramLevelAction(initialAcademicsListFormState, levelForm())
    ).rejects.toThrow("Unauthorized")
  })

  it("rejects a tone outside primary | secondary", async () => {
    mockedRequireAdmin.mockResolvedValue({ email: "admin@example.com" })

    const state = await createScienceProgramLevelAction(
      initialAcademicsListFormState,
      levelForm({ tone: "tertiary" })
    )

    expect(state.status).toBe("error")
    expect(state.fieldErrors).toHaveProperty("tone")
  })
})
