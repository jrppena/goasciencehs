"use server"

import { Error as MongooseError } from "mongoose"
import { redirect } from "next/navigation"

import { requireAdmin } from "@/lib/auth/require-admin"
import {
  createNews,
  deleteNews,
  setNewsFeatured,
  setNewsPublished,
  updateNews,
} from "@/lib/db/admin"
import { revalidateContent } from "@/lib/db/revalidate"
import { slugify, type NewsPost } from "@/lib/news"
import type { NewsFormState, NewsValues } from "./form-state"

export async function createNewsAction(
  _previous: NewsFormState,
  formData: FormData
): Promise<NewsFormState> {
  await requireAdmin()

  const values = readNewsValues(formData)
  try {
    await createNews(toNewsPost(values))
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("news")
  redirect("/admin/news")
}

export async function updateNewsAction(
  _previous: NewsFormState,
  formData: FormData
): Promise<NewsFormState> {
  await requireAdmin()

  const values = readNewsValues(formData)
  try {
    const post = await updateNews(readString(formData, "id"), toNewsPost(values))
    if (!post) {
      return { status: "error", message: "That post no longer exists." }
    }
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("news")
  redirect("/admin/news")
}

export async function deleteNewsAction(formData: FormData) {
  await requireAdmin()

  await deleteNews(readString(formData, "id"))
  revalidateContent("news")
  redirect("/admin/news")
}

export async function setPublishedAction(id: string, isPublished: boolean) {
  await requireAdmin()

  await setNewsPublished(id, isPublished)
  revalidateContent("news")
}

export async function setFeaturedAction(id: string, isFeatured: boolean) {
  await requireAdmin()

  await setNewsFeatured(id, isFeatured)
  revalidateContent("news")
}

function readNewsValues(formData: FormData): NewsValues {
  return {
    title: readString(formData, "title"),
    slug: readString(formData, "slug"),
    category: readString(formData, "category"),
    publishedOn: readString(formData, "publishedOn"),
    author: readString(formData, "author"),
    excerpt: readString(formData, "excerpt"),
    body: readString(formData, "body"),
    isPublished: formData.get("isPublished") === "on",
    isFeatured: formData.get("isFeatured") === "on",
  }
}

function toNewsPost(values: NewsValues): NewsPost {
  return {
    title: values.title,
    slug: values.slug || slugify(values.title),
    category: values.category as NewsPost["category"],
    publishedOn: values.publishedOn,
    excerpt: values.excerpt,
    author: values.author,
    body: values.body
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean),
    isPublished: values.isPublished,
    isFeatured: values.isFeatured,
  }
}

function readString(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value.trim() : ""
}

function toErrorState(error: unknown): NewsFormState {
  if (error instanceof MongooseError.ValidationError) {
    const fieldErrors: Record<string, string> = {}
    for (const [path, issue] of Object.entries(error.errors)) {
      fieldErrors[path] = issue.message
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
    }
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: number }).code === 11000
  ) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: { slug: "This slug is already in use." },
    }
  }

  throw error
}
