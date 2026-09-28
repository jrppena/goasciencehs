import "server-only"

import { isValidObjectId } from "mongoose"

import { connect } from "@/lib/db/connect"
import { FacultyModel, type FacultyMember } from "@/lib/db/models/faculty"
import { NewsModel, type NewsPost } from "@/lib/db/models/news"

/** A news document with a serialisable id, for admin lists and forms. */
export type AdminNewsPost = NewsPost & { _id: string }

/** Dashboard counts. Unlike the public data layer, these include hidden records. */
export async function getAdminCounts() {
  await connect()

  const [news, publishedNews, faculty, visibleFaculty] = await Promise.all([
    NewsModel.countDocuments({}),
    NewsModel.countDocuments({ isPublished: true }),
    FacultyModel.countDocuments({}),
    FacultyModel.countDocuments({ isVisible: true }),
  ])

  return {
    news: { total: news, published: publishedNews },
    faculty: { total: faculty, visible: visibleFaculty },
  }
}

export async function getAdminNews(): Promise<AdminNewsPost[]> {
  await connect()
  const posts = await NewsModel.find({}).sort({ publishedOn: -1 }).lean()
  return posts.map((post) => ({ ...post, _id: String(post._id) }))
}

export async function getAdminNewsById(id: string): Promise<AdminNewsPost | null> {
  if (!isValidObjectId(id)) return null

  await connect()
  const post = await NewsModel.findById(id).lean()
  return post ? { ...post, _id: String(post._id) } : null
}

/** Validates before connecting, so bad input never opens a database connection. */
export async function createNews(input: NewsPost): Promise<AdminNewsPost> {
  const post = new NewsModel(input)
  await post.validate()

  await connect()
  await post.save()
  if (post.isFeatured) await unsetOtherFeatured(String(post._id))

  return { ...post.toObject(), _id: String(post._id) }
}

export async function updateNews(
  id: string,
  input: NewsPost
): Promise<AdminNewsPost | null> {
  if (!isValidObjectId(id)) return null

  await connect()
  const post = await NewsModel.findByIdAndUpdate(
    id,
    { $set: input },
    { runValidators: true, returnDocument: "after" }
  ).lean()
  if (!post) return null

  if (post.isFeatured) await unsetOtherFeatured(id)

  return { ...post, _id: String(post._id) }
}

export async function deleteNews(id: string) {
  if (!isValidObjectId(id)) return

  await connect()
  await NewsModel.findByIdAndDelete(id)
}

export async function setNewsPublished(id: string, isPublished: boolean) {
  await connect()
  await NewsModel.updateOne(
    { _id: id },
    { $set: { isPublished } },
    { runValidators: true }
  )
}

export async function setNewsFeatured(id: string, isFeatured: boolean) {
  await connect()
  if (isFeatured) await unsetOtherFeatured(id)

  await NewsModel.updateOne(
    { _id: id },
    { $set: { isFeatured } },
    { runValidators: true }
  )
}

/** Only one post is featured at a time — the public pages lead with it. */
async function unsetOtherFeatured(keepId: string) {
  await NewsModel.updateMany(
    { _id: { $ne: keepId }, isFeatured: true },
    { $set: { isFeatured: false } }
  )
}

/** A faculty document with a serialisable id, for admin lists and forms. */
export type AdminFacultyMember = FacultyMember & { _id: string }

export async function getAdminFaculty(): Promise<AdminFacultyMember[]> {
  await connect()
  const members = await FacultyModel.find({}).sort({ order: 1, name: 1 }).lean()
  return members.map((member) => ({ ...member, _id: String(member._id) }))
}

export async function getAdminFacultyById(
  id: string
): Promise<AdminFacultyMember | null> {
  if (!isValidObjectId(id)) return null

  await connect()
  const member = await FacultyModel.findById(id).lean()
  return member ? { ...member, _id: String(member._id) } : null
}

/** Validates before connecting, so bad input never opens a database connection. */
export async function createFaculty(
  input: FacultyMember
): Promise<AdminFacultyMember> {
  const member = new FacultyModel(input)
  await member.validate()

  await connect()
  await member.save()

  return { ...member.toObject(), _id: String(member._id) }
}

export async function updateFaculty(
  id: string,
  input: FacultyMember
): Promise<AdminFacultyMember | null> {
  if (!isValidObjectId(id)) return null

  await connect()
  const member = await FacultyModel.findByIdAndUpdate(
    id,
    { $set: input },
    { runValidators: true, returnDocument: "after" }
  ).lean()

  return member ? { ...member, _id: String(member._id) } : null
}

export async function deleteFaculty(id: string) {
  if (!isValidObjectId(id)) return

  await connect()
  await FacultyModel.findByIdAndDelete(id)
}

export async function setFacultyVisible(id: string, isVisible: boolean) {
  await connect()
  await FacultyModel.updateOne(
    { _id: id },
    { $set: { isVisible } },
    { runValidators: true }
  )
}
