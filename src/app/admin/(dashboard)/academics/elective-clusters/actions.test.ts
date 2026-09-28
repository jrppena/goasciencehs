import { beforeEach, describe, expect, it, vi } from "vitest"

const { mockedRequireAdmin } = vi.hoisted(() => ({
  mockedRequireAdmin: vi.fn(),
}))

vi.mock("@/lib/auth/require-admin", () => ({
  requireAdmin: mockedRequireAdmin,
}))
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }))
vi.mock("next/navigation", () => ({ redirect: vi.fn() }))

import { createElectiveClusterAction } from "./actions"
import { initialAcademicsListFormState } from "../list-form-state"

function clusterForm(overrides: Record<string, string> = {}) {
  const formData = new FormData()
  formData.set("name", "Field Experience")
  formData.set("summary", "A summary.")
  formData.append("subjects", "Apprenticeship with a partner laboratory")
  formData.set("pathways", "Any cluster")
  formData.set("tone", "primary")
  formData.set("order", "1")

  for (const [key, value] of Object.entries(overrides)) {
    formData.set(key, value)
  }

  return formData
}

describe("createElectiveClusterAction", () => {
  beforeEach(() => {
    mockedRequireAdmin.mockReset()
  })

  it("rejects unauthenticated calls", async () => {
    mockedRequireAdmin.mockRejectedValue(new Error("Unauthorized"))

    await expect(
      createElectiveClusterAction(initialAcademicsListFormState, clusterForm())
    ).rejects.toThrow("Unauthorized")
  })

  it("rejects a tone outside primary | secondary", async () => {
    mockedRequireAdmin.mockResolvedValue({ email: "admin@example.com" })

    const state = await createElectiveClusterAction(
      initialAcademicsListFormState,
      clusterForm({ tone: "tertiary" })
    )

    expect(state.status).toBe("error")
    expect(state.fieldErrors).toHaveProperty("tone")
  })
})
