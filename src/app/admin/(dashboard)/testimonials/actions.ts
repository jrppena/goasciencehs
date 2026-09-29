"use server"

import { Error as MongooseError } from "mongoose"
import { redirect } from "next/navigation"

import { requireAdmin } from "@/lib/auth/require-admin"
import {
  createTestimonial,
  deleteTestimonial,
  deleteTestimonialMany,
  setTestimonialVisible,
  setTestimonialVisibleMany,
  updateTestimonial,
} from "@/lib/db/admin"
import { revalidateContent } from "@/lib/db/revalidate"
import type { Testimonial } from "@/lib/testimonials"
import type { TestimonialFormState, TestimonialValues } from "./form-state"

export async function createTestimonialAction(
  _previous: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  await requireAdmin()

  const values = readTestimonialValues(formData)
  try {
    await createTestimonial(toTestimonial(values))
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("testimonials")
  redirect("/admin/testimonials")
}

export async function updateTestimonialAction(
  _previous: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  await requireAdmin()

  const values = readTestimonialValues(formData)
  try {
    const testimonial = await updateTestimonial(
      readString(formData, "id"),
      toTestimonial(values)
    )
    if (!testimonial) {
      return { status: "error", message: "That testimonial no longer exists." }
    }
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("testimonials")
  redirect("/admin/testimonials")
}

export async function deleteTestimonialAction(formData: FormData) {
  await requireAdmin()

  await deleteTestimonial(readString(formData, "id"))
  revalidateContent("testimonials")
  redirect("/admin/testimonials")
}

export async function setTestimonialVisibleAction(
  id: string,
  isVisible: boolean
) {
  await requireAdmin()

  await setTestimonialVisible(id, isVisible)
  revalidateContent("testimonials")
}

export async function bulkShowTestimonialAction(ids: string[]) {
  await requireAdmin()

  await setTestimonialVisibleMany(ids, true)
  revalidateContent("testimonials")
}

export async function bulkHideTestimonialAction(ids: string[]) {
  await requireAdmin()

  await setTestimonialVisibleMany(ids, false)
  revalidateContent("testimonials")
}

export async function bulkDeleteTestimonialAction(formData: FormData) {
  await requireAdmin()

  await deleteTestimonialMany(formData.getAll("ids").map(String))
  revalidateContent("testimonials")
}

function readTestimonialValues(formData: FormData): TestimonialValues {
  return {
    quote: readString(formData, "quote"),
    name: readString(formData, "name"),
    batch: readString(formData, "batch"),
    now: readString(formData, "now"),
    isVisible: formData.get("isVisible") === "on",
    order: readString(formData, "order"),
  }
}

function toTestimonial(values: TestimonialValues): Testimonial {
  return {
    quote: values.quote,
    name: values.name,
    batch: values.batch,
    now: values.now,
    isVisible: values.isVisible,
    order: values.order === "" ? 0 : Number(values.order),
  }
}

function readString(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value.trim() : ""
}

function toErrorState(error: unknown): TestimonialFormState {
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

  throw error
}
