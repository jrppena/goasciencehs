import { beforeEach, describe, expect, it, vi } from "vitest"

const { mockedAuth } = vi.hoisted(() => ({ mockedAuth: vi.fn() }))

vi.mock("@/lib/auth", () => ({ auth: mockedAuth }))

import { requireAdmin } from "@/lib/auth/require-admin"

describe("requireAdmin", () => {
  beforeEach(() => {
    mockedAuth.mockReset()
  })

  it("rejects when there is no session at all", async () => {
    mockedAuth.mockResolvedValue(null)

    await expect(requireAdmin()).rejects.toThrow("Unauthorized")
  })

  it("rejects a session without a user", async () => {
    mockedAuth.mockResolvedValue({ expires: "2099-01-01T00:00:00.000Z" })

    await expect(requireAdmin()).rejects.toThrow("Unauthorized")
  })

  it("returns the user for a valid session", async () => {
    const user = { email: "admin@example.com" }
    mockedAuth.mockResolvedValue({ user, expires: "2099-01-01T00:00:00.000Z" })

    await expect(requireAdmin()).resolves.toEqual(user)
  })
})
