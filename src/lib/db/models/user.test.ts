import { describe, expect, it } from "vitest"

import { UserModel, type User } from "@/lib/db/models/user"

const validUser: Partial<User> = {
  email: "admin@goasciencehs.edu.ph",
  passwordHash: "$2b$12$placeholderplaceholderplaceholderplaceholderplaceholde",
}

describe("User model", () => {
  it("accepts a valid user and normalises the email", async () => {
    const user = new UserModel({ ...validUser, email: "  Admin@Example.COM " })

    await expect(user.validate()).resolves.toBeUndefined()
    expect(user.email).toBe("admin@example.com")
  })

  it("rejects a missing required field", async () => {
    const user = new UserModel({ ...validUser, passwordHash: undefined })

    await expect(user.validate()).rejects.toHaveProperty("errors.passwordHash")
  })
})
