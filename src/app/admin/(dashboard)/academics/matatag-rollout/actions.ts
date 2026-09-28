"use server"

import { redirect } from "next/navigation"

import { requireAdmin } from "@/lib/auth/require-admin"
import {
  createMatatagStep,
  deleteMatatagStep,
  updateMatatagStep,
} from "@/lib/db/admin"
import { revalidateContent } from "@/lib/db/revalidate"
import {
  readOrder,
  readString,
  readValues,
  toErrorState,
} from "../action-utils"
import type { AcademicsListFormState } from "../list-form-state"

const FIELDS = ["year", "title", "body", "order"]

export async function createMatatagStepAction(
  _previous: AcademicsListFormState,
  formData: FormData
): Promise<AcademicsListFormState> {
  await requireAdmin()

  const values = readValues(formData, FIELDS)
  try {
    await createMatatagStep({
      year: values.year,
      title: values.title,
      body: values.body,
      order: readOrder(formData),
    })
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("academics")
  redirect("/admin/academics/matatag-rollout")
}

export async function updateMatatagStepAction(
  _previous: AcademicsListFormState,
  formData: FormData
): Promise<AcademicsListFormState> {
  await requireAdmin()

  const values = readValues(formData, FIELDS)
  try {
    const updated = await updateMatatagStep(readString(formData, "id"), {
      year: values.year,
      title: values.title,
      body: values.body,
      order: readOrder(formData),
    })
    if (!updated) {
      return { status: "error", message: "That MATATAG step no longer exists." }
    }
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("academics")
  redirect("/admin/academics/matatag-rollout")
}

export async function deleteMatatagStepAction(formData: FormData) {
  await requireAdmin()

  await deleteMatatagStep(readString(formData, "id"))
  revalidateContent("academics")
  redirect("/admin/academics/matatag-rollout")
}
