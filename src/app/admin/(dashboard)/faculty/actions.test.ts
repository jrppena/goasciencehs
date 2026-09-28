import { beforeEach, describe, expect, it, vi } from "vitest"

const { mockedRequireAdmin } = vi.hoisted(() => ({
  mockedRequireAdmin: vi.fn(),
}))

vi.mock("@/lib/auth/require-admin", () => ({
  requireAdmin: mockedRequireAdmin,
}))
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }))
vi.mock("next/navigation", () => ({ redirect: vi.fn() }))

import { createFacultyAction } from "./actions"
import { initialFacultyFormState } from "./form-state"

function facultyForm(overrides: Record<string, string> = {}) {
  const formData = new FormData()
  formData.set("honorific", "Ma'am")
  formData.set("name", "Test Teacher")
  formData.set("kind", "teaching")
  formData.set("order", "1")

  for (const [key, value] of Object.entries(overrides)) {
    formData.set(key, value)
  }

  return formData
}

describe("createFacultyAction", () => {
  beforeEach(() => {
    mockedRequireAdmin.mockReset()
  })

  it("rejects unauthenticated calls", async () => {
    mockedRequireAdmin.mockRejectedValue(new Error("Unauthorized"))

    await expect(
      createFacultyAction(initialFacultyFormState, facultyForm())
    ).rejects.toThrow("Unauthorized")
  })

  it("rejects invalid payloads with field errors", async () => {
    mockedRequireAdmin.mockResolvedValue({ email: "admin@example.com" })

    const state = await createFacultyAction(
      initialFacultyFormState,
      facultyForm({ name: "" })
    )

    expect(state.status).toBe("error")
    expect(state.fieldErrors).toHaveProperty("name")
  })
})
