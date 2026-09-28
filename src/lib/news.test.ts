import { describe, expect, it } from "vitest"

import { advisoryWindow, slugify } from "@/lib/news"

describe("advisoryWindow", () => {
  it("anchors to the Asia/Manila calendar date, not UTC", () => {
    expect(advisoryWindow(new Date("2026-09-28T16:30:00Z"))).toEqual({
      since: "2026-09-27",
      today: "2026-09-29",
    })
  })

  it("rolls the window across a UTC day boundary", () => {
    expect(advisoryWindow(new Date("2026-10-01T02:00:00Z"))).toEqual({
      since: "2026-09-29",
      today: "2026-10-01",
    })
  })

  it("rolls the window across a year boundary", () => {
    expect(advisoryWindow(new Date("2027-01-01T01:00:00Z")).since).toBe("2026-12-30")
  })
})

describe("slugify", () => {
  it("produces distinct ids for the seed elective cluster names", () => {
    expect(slugify("Science, Technology, Engineering and Mathematics")).toBe(
      "science-technology-engineering-and-mathematics"
    )
    expect(slugify("Business and Entrepreneurship")).toBe(
      "business-and-entrepreneurship"
    )
    expect(slugify("Field Experience")).toBe("field-experience")
  })
})
