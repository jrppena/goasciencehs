import { describe, expect, it } from "vitest"

import {
  ScienceProgramLevelModel,
  type ScienceProgramLevel,
} from "@/lib/db/models/science-program-level"

const validLevel: Partial<ScienceProgramLevel> = {
  grade: "Grade 7",
  specialisation: "Environmental Science",
  summary: "Ecosystems, water and soil quality, and waste.",
  work: ["Field sampling and data collection", "First investigatory project"],
  tone: "primary",
}

describe("ScienceProgramLevel model", () => {
  it("accepts a valid level and defaults order to 0", async () => {
    const level = new ScienceProgramLevelModel(validLevel)

    await expect(level.validate()).resolves.toBeUndefined()
    expect(level.order).toBe(0)
  })

  it("rejects a tone outside primary | secondary", async () => {
    const level = new ScienceProgramLevelModel({
      ...validLevel,
      tone: "tertiary" as ScienceProgramLevel["tone"],
    })

    await expect(level.validate()).rejects.toHaveProperty("errors.tone")
  })
})
