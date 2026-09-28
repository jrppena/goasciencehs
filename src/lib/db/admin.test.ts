import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import mongoose from "mongoose"

import { connect } from "@/lib/db/connect"
import {
  createNews,
  deleteNews,
  getAdminNewsById,
  setNewsFeatured,
  setNewsPublished,
  updateNews,
} from "@/lib/db/admin"
import { getPublishedNews } from "@/lib/db/content"
import { NewsModel, type NewsPost } from "@/lib/db/models/news"

let connected = false

beforeAll(async () => {
  try {
    await connect()
    await NewsModel.init()
    connected = true
  } catch {
    console.warn(
      "MongoDB is not reachable — admin news tests are skipped. Start one (e.g. `docker run -d -p 27017:27017 mongo:8.2`) or set TEST_MONGODB_URI."
    )
  }
})

afterAll(async () => {
  if (connected) await mongoose.connection.dropDatabase()
  await mongoose.disconnect()
})

beforeEach(async () => {
  if (connected) await NewsModel.deleteMany({})
})

const input: NewsPost = {
  slug: "a-post",
  category: "Advisory",
  publishedOn: "2026-01-01",
  title: "A post",
  excerpt: "An excerpt.",
  author: "Office of the Principal",
  body: ["First paragraph."],
  isPublished: true,
  isFeatured: false,
}

describe("admin news operations", () => {
  it("rejects invalid input before touching the database", async () => {
    await expect(createNews({ ...input, title: "" })).rejects.toMatchObject({
      name: "ValidationError",
    })
  })

  it("returns null for an invalid id without querying", async () => {
    await expect(getAdminNewsById("not-an-object-id")).resolves.toBeNull()
  })

  it("publish toggle changes public visibility", async (context) => {
    if (!connected) return context.skip()

    const post = await createNews(input)

    await setNewsPublished(post._id, false)
    expect(await getPublishedNews()).toEqual([])

    await setNewsPublished(post._id, true)
    expect((await getPublishedNews()).map((candidate) => candidate.slug)).toEqual(
      ["a-post"]
    )
  })

  it("keeps a single featured post", async (context) => {
    if (!connected) return context.skip()

    const first = await createNews({ ...input, slug: "first" })
    const second = await createNews({ ...input, slug: "second" })

    await setNewsFeatured(first._id, true)
    await setNewsFeatured(second._id, true)

    const featured = await NewsModel.find({ isFeatured: true }).lean()
    expect(featured.map((post) => post.slug)).toEqual(["second"])
  })

  it("rejects a duplicate slug", async (context) => {
    if (!connected) return context.skip()

    await createNews(input)

    await expect(createNews(input)).rejects.toMatchObject({ code: 11000 })
  })

  it("updates and deletes a post", async (context) => {
    if (!connected) return context.skip()

    const created = await createNews(input)
    const updated = await updateNews(created._id, {
      ...input,
      title: "Updated title",
    })

    expect(updated?.title).toBe("Updated title")
    await expect(getAdminNewsById(created._id)).resolves.toMatchObject({
      title: "Updated title",
    })

    await deleteNews(created._id)
    await expect(getAdminNewsById(created._id)).resolves.toBeNull()
  })
})
