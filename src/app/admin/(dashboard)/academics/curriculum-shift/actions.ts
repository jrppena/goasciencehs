"use server"

import { redirect } from "next/navigation"

import { requireAdmin } from "@/lib/auth/require-admin"
import {
  createCurriculumShiftStep,
  deleteCurriculumShiftStep,
  updateCurriculumShiftStep,
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

export async function createCurriculumShiftStepAction(
  _previous: AcademicsListFormState,
  formData: FormData
): Promise<AcademicsListFormState> {
  await requireAdmin()

  const values = readValues(formData, FIELDS)
  try {
    await createCurriculumShiftStep({
      year: values.year,
      title: values.title,
      body: values.body,
      order: readOrder(formData),
    })
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("academics")
  redirect("/admin/academics/curriculum-shift")
}

export async function updateCurriculumShiftStepAction(
  _previous: AcademicsListFormState,
  formData: FormData
): Promise<AcademicsListFormState> {
  await requireAdmin()

  const values = readValues(formData, FIELDS)
  try {
    const updated = await updateCurriculumShiftStep(readString(formData, "id"), {
      year: values.year,
      title: values.title,
      body: values.body,
      order: readOrder(formData),
    })
    if (!updated) {
      return {
        status: "error",
        message: "That curriculum shift step no longer exists.",
      }
    }
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("academics")
  redirect("/admin/academics/curriculum-shift")
}

export async function deleteCurriculumShiftStepAction(formData: FormData) {
  await requireAdmin()

  await deleteCurriculumShiftStep(readString(formData, "id"))
  revalidateContent("academics")
  redirect("/admin/academics/curriculum-shift")
}
