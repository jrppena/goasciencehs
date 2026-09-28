"use server"

import { redirect } from "next/navigation"

import { requireAdmin } from "@/lib/auth/require-admin"
import {
  createMilestone,
  deleteMilestone,
  updateMilestone,
} from "@/lib/db/admin"
import { revalidateContent } from "@/lib/db/revalidate"
import {
  readOrder,
  readString,
  readValues,
  toErrorState,
} from "../action-utils"
import type { AboutListFormState } from "../list-form-state"

const FIELDS = ["year", "title", "body", "order"]

export async function createMilestoneAction(
  _previous: AboutListFormState,
  formData: FormData
): Promise<AboutListFormState> {
  await requireAdmin()

  const values = readValues(formData, FIELDS)
  try {
    await createMilestone({
      year: values.year,
      title: values.title,
      body: values.body,
      order: readOrder(formData),
    })
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("about")
  redirect("/admin/about/milestones")
}

export async function updateMilestoneAction(
  _previous: AboutListFormState,
  formData: FormData
): Promise<AboutListFormState> {
  await requireAdmin()

  const values = readValues(formData, FIELDS)
  try {
    const updated = await updateMilestone(readString(formData, "id"), {
      year: values.year,
      title: values.title,
      body: values.body,
      order: readOrder(formData),
    })
    if (!updated) {
      return { status: "error", message: "That milestone no longer exists." }
    }
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("about")
  redirect("/admin/about/milestones")
}

export async function deleteMilestoneAction(formData: FormData) {
  await requireAdmin()

  await deleteMilestone(readString(formData, "id"))
  revalidateContent("about")
  redirect("/admin/about/milestones")
}
