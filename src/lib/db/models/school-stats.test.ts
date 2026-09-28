import { describe, expect, it } from "vitest"

import { SchoolStatsModel, type SchoolStats } from "@/lib/db/models/school-stats"

const validStats: Partial<SchoolStats> = {
  learnersEnrolled: "1,240",
  facultyAndStaff: "24",
  yearEstablished: "2015",
  collegeProgressionRate: "97%",
}

describe("SchoolStats model", () => {
  it("accepts valid stats", async () => {
    await expect(new SchoolStatsModel(validStats).validate()).resolves.toBeUndefined()
  })

  it("rejects a missing required field", async () => {
    const stats = new SchoolStatsModel({
      ...validStats,
      learnersEnrolled: undefined,
    })

    await expect(stats.validate()).rejects.toHaveProperty("errors.learnersEnrolled")
  })
})
