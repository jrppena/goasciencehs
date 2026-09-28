import { beforeEach, describe, expect, it, vi } from "vitest"

const { mockedRequireAdmin } = vi.hoisted(() => ({
  mockedRequireAdmin: vi.fn(),
}))

vi.mock("@/lib/auth/require-admin", () => ({
  requireAdmin: mockedRequireAdmin,
}))
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }))
vi.mock("next/navigation", () => ({ redirect: vi.fn() }))

import { createNewsAction } from "./actions"
import { initialNewsFormState } from "./form-state"

function newsForm(overrides: Record<string, string> = {}) {
  const formData = new FormData()
  formData.set("title", "A new post")
  formData.set("category", "Advisory")
  formData.set("publishedOn", "2026-01-01")
  formData.set("excerpt", "An excerpt.")
  formData.set("author", "Office of the Principal")
  formData.set("signatoryName", "Ronald Enciso")
  formData.set("signatoryRole", "Principal")
  formData.set("body", "First paragraph.\n\nSecond paragraph.")

  for (const [key, value] of Object.entries(overrides)) {
    formData.set(key, value)
  }

  return formData
}

describe("createNewsAction", () => {
  beforeEach(() => {
    mockedRequireAdmin.mockReset()
  })

  it("rejects unauthenticated calls", async () => {
    mockedRequireAdmin.mockRejectedValue(new Error("Unauthorized"))

    await expect(
      createNewsAction(initialNewsFormState, newsForm())
    ).rejects.toThrow("Unauthorized")
  })

  it("rejects invalid payloads with field errors", async () => {
    mockedRequireAdmin.mockResolvedValue({ email: "admin@example.com" })

    const state = await createNewsAction(
      initialNewsFormState,
      newsForm({ title: "" })
    )

    expect(state.status).toBe("error")
    expect(state.fieldErrors).toHaveProperty("title")
  })

  it("requires a signatory for an Advisory post", async () => {
    mockedRequireAdmin.mockResolvedValue({ email: "admin@example.com" })

    const state = await createNewsAction(
      initialNewsFormState,
      newsForm({ signatoryName: "", signatoryRole: "" })
    )

    expect(state.fieldErrors).toHaveProperty("signatoryName")
    expect(state.fieldErrors).toHaveProperty("signatoryRole")
  })
})
