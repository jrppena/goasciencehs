import { beforeEach, describe, expect, it, vi } from "vitest"

const { mockedRequireAdmin } = vi.hoisted(() => ({
  mockedRequireAdmin: vi.fn(),
}))

vi.mock("@/lib/auth/require-admin", () => ({
  requireAdmin: mockedRequireAdmin,
}))
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }))
vi.mock("next/navigation", () => ({ redirect: vi.fn() }))

import { createTestimonialAction } from "./actions"
import { initialTestimonialFormState } from "./form-state"

function testimonialForm(overrides: Record<string, string> = {}) {
  const formData = new FormData()
  formData.set("quote", "A quote from an alumna.")
  formData.set("name", "Alumna Name")
  formData.set("batch", "Batch 2016")
  formData.set("now", "Medical Technologist")
  formData.set("order", "1")

  for (const [key, value] of Object.entries(overrides)) {
    formData.set(key, value)
  }

  return formData
}

describe("createTestimonialAction", () => {
  beforeEach(() => {
    mockedRequireAdmin.mockReset()
  })

  it("rejects unauthenticated calls", async () => {
    mockedRequireAdmin.mockRejectedValue(new Error("Unauthorized"))

    await expect(
      createTestimonialAction(initialTestimonialFormState, testimonialForm())
    ).rejects.toThrow("Unauthorized")
  })

  it("rejects invalid payloads with field errors", async () => {
    mockedRequireAdmin.mockResolvedValue({ email: "admin@example.com" })

    const state = await createTestimonialAction(
      initialTestimonialFormState,
      testimonialForm({ quote: "" })
    )

    expect(state.status).toBe("error")
    expect(state.fieldErrors).toHaveProperty("quote")
  })
})
