import { describe, expect, it } from "vitest"

import { FacultyModel, type FacultyMember } from "@/lib/db/models/faculty"

const validMember: Partial<FacultyMember> = {
  honorific: "Ma'am",
  name: "Angela P. Ortiz",
  kind: "teaching",
}

describe("Faculty model", () => {
  it("accepts a valid member and applies the visibility defaults", async () => {
    const member = new FacultyModel(validMember)

    await expect(member.validate()).resolves.toBeUndefined()
    expect(member.isVisible).toBe(true)
    expect(member.order).toBe(0)
  })

  it("rejects a missing required field", async () => {
    const member = new FacultyModel({ ...validMember, name: undefined })

    await expect(member.validate()).rejects.toHaveProperty("errors.name")
  })

  it("rejects an unknown kind", async () => {
    const member = new FacultyModel({
      ...validMember,
      kind: "staff" as unknown as FacultyMember["kind"],
    })

    await expect(member.validate()).rejects.toHaveProperty("errors.kind")
  })
})
