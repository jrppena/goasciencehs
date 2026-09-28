import { beforeAll, describe, expect, it, vi } from "vitest"

const { uploadStream } = vi.hoisted(() => ({ uploadStream: vi.fn() }))

vi.mock("cloudinary", () => ({
  v2: {
    config: vi.fn(),
    uploader: { upload_stream: uploadStream },
  },
}))

import { UploadError, uploadImage } from "@/lib/cloudinary"

beforeAll(() => {
  process.env.CLOUDINARY_CLOUD_NAME = "test-cloud"
  process.env.CLOUDINARY_API_KEY = "test-key"
  process.env.CLOUDINARY_API_SECRET = "test-secret"
})

describe("uploadImage", () => {
  it("rejects non-images before uploading", async () => {
    const file = new File(["notes"], "notes.txt", { type: "text/plain" })

    await expect(uploadImage(file)).rejects.toBeInstanceOf(UploadError)
    expect(uploadStream).not.toHaveBeenCalled()
  })

  it("rejects images larger than 5 MB", async () => {
    const file = new File([new Uint8Array(5 * 1024 * 1024 + 1)], "big.png", {
      type: "image/png",
    })

    await expect(uploadImage(file)).rejects.toThrow("5 MB")
    expect(uploadStream).not.toHaveBeenCalled()
  })

  it("returns the secure URL for a valid image", async () => {
    uploadStream.mockImplementation(
      (
        _options: unknown,
        callback: (error: unknown, result: { secure_url: string }) => void
      ) => ({
        end: () =>
          callback(null, {
            secure_url: "https://res.cloudinary.com/demo/image/upload/gshs/a.png",
          }),
      })
    )

    const file = new File([new Uint8Array(16)], "a.png", { type: "image/png" })

    await expect(uploadImage(file)).resolves.toBe(
      "https://res.cloudinary.com/demo/image/upload/gshs/a.png"
    )
  })
})
