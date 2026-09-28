"use server"

import { redirect } from "next/navigation"

import { requireAdmin } from "@/lib/auth/require-admin"
import {
  createLearningArea,
  deleteLearningArea,
  updateLearningArea,
} from "@/lib/db/admin"
import { revalidateContent } from "@/lib/db/revalidate"
import {
  readOrder,
  readString,
  readValues,
  toErrorState,
} from "../action-utils"
import type { AcademicsListFormState } from "../list-form-state"

const FIELDS = ["name", "body", "order"]

export async function createLearningAreaAction(
  _previous: AcademicsListFormState,
  formData: FormData
): Promise<AcademicsListFormState> {
  await requireAdmin()

  const values = readValues(formData, FIELDS)
  try {
    await createLearningArea({
      name: values.name,
      body: values.body,
      order: readOrder(formData),
    })
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("academics")
  redirect("/admin/academics/learning-areas")
}

export async function updateLearningAreaAction(
  _previous: AcademicsListFormState,
  formData: FormData
): Promise<AcademicsListFormState> {
  await requireAdmin()

  const values = readValues(formData, FIELDS)
  try {
    const updated = await updateLearningArea(readString(formData, "id"), {
      name: values.name,
      body: values.body,
      order: readOrder(formData),
    })
    if (!updated) {
      return { status: "error", message: "That learning area no longer exists." }
    }
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("academics")
  redirect("/admin/academics/learning-areas")
}

export async function deleteLearningAreaAction(formData: FormData) {
  await requireAdmin()

  await deleteLearningArea(readString(formData, "id"))
  revalidateContent("academics")
  redirect("/admin/academics/learning-areas")
}
