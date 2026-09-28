import { beforeEach, describe, expect, it, vi } from "vitest"

const { mockedRequireAdmin } = vi.hoisted(() => ({
  mockedRequireAdmin: vi.fn(),
}))

vi.mock("@/lib/auth/require-admin", () => ({
  requireAdmin: mockedRequireAdmin,
}))

import { uploadImageAction } from "./upload-action"

describe("uploadImageAction", () => {
  beforeEach(() => {
    mockedRequireAdmin.mockReset()
  })

  it("rejects unauthenticated calls", async () => {
    mockedRequireAdmin.mockRejectedValue(new Error("Unauthorized"))

    await expect(uploadImageAction(new FormData())).rejects.toThrow(
      "Unauthorized"
    )
  })

  it("returns an error when no file is provided", async () => {
    mockedRequireAdmin.mockResolvedValue({ email: "admin@example.com" })

    await expect(uploadImageAction(new FormData())).resolves.toEqual({
      error: "Choose an image to upload.",
    })
  })

  it("rejects non-image files", async () => {
    mockedRequireAdmin.mockResolvedValue({ email: "admin@example.com" })

    const formData = new FormData()
    formData.set("file", new File(["notes"], "notes.txt", { type: "text/plain" }))

    await expect(uploadImageAction(formData)).resolves.toEqual({
      error: "Only image files can be uploaded.",
    })
  })
})
