import { describe, expect, it } from "vitest"

import { hashPassword, verifyPassword } from "@/lib/auth/password"

const PASSWORD = "correct horse battery staple"

describe("password hashing", () => {
  it("returns a bcrypt hash that does not contain the password", async () => {
    const hash = await hashPassword(PASSWORD)

    expect(hash).toMatch(/^\$2[aby]\$/)
    expect(hash).not.toContain(PASSWORD)
  })

  it("verifies the right password and rejects the wrong one", async () => {
    const hash = await hashPassword(PASSWORD)

    await expect(verifyPassword(PASSWORD, hash)).resolves.toBe(true)
    await expect(verifyPassword("wrong password", hash)).resolves.toBe(false)
  })
})
