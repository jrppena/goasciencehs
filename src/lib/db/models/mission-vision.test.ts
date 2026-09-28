import { describe, expect, it } from "vitest"

import {
  MissionVisionModel,
  type MissionVisionStatement,
} from "@/lib/db/models/mission-vision"

const validStatement: Partial<MissionVisionStatement> = {
  icon: "Target",
  label: "Mission",
  title: "Teach learners to ask better questions",
  body: "A rigorous science education.",
  tone: "primary",
}

describe("MissionVision model", () => {
  it("accepts a valid statement", async () => {
    const statement = new MissionVisionModel(validStatement)

    await expect(statement.validate()).resolves.toBeUndefined()
  })

  it("rejects a tone outside primary | secondary", async () => {
    const statement = new MissionVisionModel({
      ...validStatement,
      tone: "tertiary" as MissionVisionStatement["tone"],
    })

    await expect(statement.validate()).rejects.toHaveProperty("errors.tone")
  })
})
