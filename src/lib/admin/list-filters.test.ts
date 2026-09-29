import { describe, expect, it } from "vitest"

import {
  buildListHref,
  formatItemCount,
  matchesFacultyFilters,
  matchesListQuery,
  matchesNewsFilters,
  matchesTestimonialFilters,
  parseListOption,
  parseListQuery,
} from "./list-filters"

describe("parseListQuery", () => {
  it("trims, collapses whitespace, and takes the first array value", () => {
    expect(parseListQuery(undefined)).toBe("")
    expect(parseListQuery("  class   suspension ")).toBe("class suspension")
    expect(parseListQuery(["first", "second"])).toBe("first")
  })
})

describe("parseListOption", () => {
  const options = ["published", "draft"] as const

  it("accepts only an exact offered option", () => {
    expect(parseListOption("draft", options)).toBe("draft")
    expect(parseListOption(" draft ", options)).toBe("draft")
    expect(parseListOption("nonsense", options)).toBeUndefined()
    expect(parseListOption(undefined, options)).toBeUndefined()
  })
})

describe("buildListHref", () => {
  it("drops empty params and encodes the rest", () => {
    expect(buildListHref("/admin/news", { q: "", category: undefined })).toBe(
      "/admin/news"
    )
    expect(
      buildListHref("/admin/news", { q: "suspension", status: "draft" })
    ).toBe("/admin/news?q=suspension&status=draft")
    expect(buildListHref("/admin/news", { q: "a&b=c" })).toBe(
      "/admin/news?q=a%26b%3Dc"
    )
  })
})

describe("formatItemCount", () => {
  const noun = { singular: "post", plural: "posts" }

  it("pluralises at one", () => {
    expect(formatItemCount(1, noun)).toBe("1 post")
    expect(formatItemCount(2, noun)).toBe("2 posts")
    expect(formatItemCount(0, noun)).toBe("0 posts")
  })
})

describe("matchesListQuery", () => {
  const fields = ["Class suspension guidelines", "Ronald Peña", "Advisory"]

  it("matches everything on an empty query", () => {
    expect(matchesListQuery(fields, "")).toBe(true)
    expect(matchesListQuery(fields, "   ")).toBe(true)
  })

  it("ignores case and diacritics", () => {
    expect(matchesListQuery(fields, "PENA")).toBe(true)
    expect(matchesListQuery(fields, "suspension")).toBe(true)
  })

  it("requires every token, across any field", () => {
    expect(matchesListQuery(fields, "pena suspension")).toBe(true)
    expect(matchesListQuery(fields, "pena athletics")).toBe(false)
  })
})

describe("matchesNewsFilters", () => {
  const post = {
    title: "Class suspension guidelines",
    excerpt: "How announcements are released.",
    author: "Office of the Principal",
    body: ["Suspensions covering the whole municipality."],
    category: "Advisory",
    isPublished: false,
  }

  it("filters by category, status, and query together", () => {
    expect(matchesNewsFilters(post, { q: "" })).toBe(true)
    expect(matchesNewsFilters(post, { q: "", status: "draft" })).toBe(true)
    expect(matchesNewsFilters(post, { q: "", status: "published" })).toBe(false)
    expect(matchesNewsFilters(post, { q: "", category: "Advisory" })).toBe(true)
    expect(matchesNewsFilters(post, { q: "", category: "Athletics" })).toBe(
      false
    )
    expect(
      matchesNewsFilters(post, { q: "municipality", status: "draft" })
    ).toBe(true)
    expect(
      matchesNewsFilters(post, { q: "municipality", status: "published" })
    ).toBe(false)
  })

  it("searches the body, not just the title", () => {
    expect(matchesNewsFilters(post, { q: "municipality" })).toBe(true)
  })
})

describe("matchesFacultyFilters", () => {
  const member = {
    honorific: "Ma'am",
    name: "Bernadette G. Cariño",
    position: "Teacher III",
    kind: "teaching",
    isVisible: false,
  }

  it("filters by kind, visibility, and query", () => {
    expect(matchesFacultyFilters(member, { q: "" })).toBe(true)
    expect(matchesFacultyFilters(member, { q: "", kind: "teaching" })).toBe(true)
    expect(matchesFacultyFilters(member, { q: "", kind: "head" })).toBe(false)
    expect(matchesFacultyFilters(member, { q: "", visibility: "hidden" })).toBe(
      true
    )
    expect(matchesFacultyFilters(member, { q: "", visibility: "visible" })).toBe(
      false
    )
    expect(matchesFacultyFilters(member, { q: "carino" })).toBe(true)
    expect(matchesFacultyFilters(member, { q: "cariño" })).toBe(true)
  })
})

describe("matchesTestimonialFilters", () => {
  const testimonial = {
    name: "Alumna Name",
    batch: "Batch 2016",
    quote: "The laboratory hours were the hardest part of my week.",
    isVisible: true,
  }

  it("filters by visibility and query", () => {
    expect(matchesTestimonialFilters(testimonial, { q: "" })).toBe(true)
    expect(
      matchesTestimonialFilters(testimonial, { q: "", visibility: "visible" })
    ).toBe(true)
    expect(
      matchesTestimonialFilters(testimonial, { q: "", visibility: "hidden" })
    ).toBe(false)
    expect(matchesTestimonialFilters(testimonial, { q: "batch 2016" })).toBe(
      true
    )
    expect(matchesTestimonialFilters(testimonial, { q: "laboratory" })).toBe(
      true
    )
  })
})
