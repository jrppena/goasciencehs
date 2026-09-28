import { describe, expect, it } from "vitest"

import {
  ElectiveClusterModel,
  type ElectiveCluster,
} from "@/lib/db/models/elective-cluster"

const validCluster: Partial<ElectiveCluster> = {
  name: "Field Experience",
  summary: "Optional in the Academic Track.",
  subjects: ["Apprenticeship with a partner laboratory, clinic, or firm"],
  pathways: "Any cluster",
  tone: "primary",
}

describe("ElectiveCluster model", () => {
  it("accepts a valid cluster and defaults order to 0", async () => {
    const cluster = new ElectiveClusterModel(validCluster)

    await expect(cluster.validate()).resolves.toBeUndefined()
    expect(cluster.order).toBe(0)
  })

  it("rejects a tone outside primary | secondary", async () => {
    const cluster = new ElectiveClusterModel({
      ...validCluster,
      tone: "tertiary" as ElectiveCluster["tone"],
    })

    await expect(cluster.validate()).rejects.toHaveProperty("errors.tone")
  })
})
