import { describe, expect, it, vi } from "vitest"
import { models } from "mongoose"

import { NewsModel, type NewsPost } from "@/lib/db/models/news"

const validNews: Partial<NewsPost> = {
  slug: "a-post",
  category: "Advisory",
  publishedOn: "2026-01-01",
  title: "A post",
  excerpt: "An excerpt.",
  author: "Office of the Principal",
  body: ["First paragraph."],
}

describe("News model", () => {
  it("accepts a valid post and applies the publishing defaults", async () => {
    const post = new NewsModel(validNews)

    await expect(post.validate()).resolves.toBeUndefined()
    expect(post.isPublished).toBe(true)
    expect(post.isFeatured).toBe(false)
  })

  it("rejects a missing required field", async () => {
    const post = new NewsModel({ ...validNews, title: undefined })

    await expect(post.validate()).rejects.toHaveProperty("errors.title")
  })

  it("rejects an unknown category", async () => {
    const post = new NewsModel({
      ...validNews,
      category: "Sports" as unknown as NewsPost["category"],
    })

    await expect(post.validate()).rejects.toHaveProperty("errors.category")
  })

  it("survives a dev HMR re-evaluation without OverwriteModelError", async () => {
    vi.resetModules()

    const reloaded = await import("./news")

    expect(reloaded.NewsModel).toBe(models.News)
  })
})
