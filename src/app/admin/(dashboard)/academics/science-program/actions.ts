"use server"

import { redirect } from "next/navigation"

import { requireAdmin } from "@/lib/auth/require-admin"
import {
  createScienceProgramLevel,
  deleteScienceProgramLevel,
  updateScienceProgramLevel,
} from "@/lib/db/admin"
import { revalidateContent } from "@/lib/db/revalidate"
import type { ScienceProgramLevel } from "@/lib/db/models/science-program-level"
import {
  readList,
  readOrder,
  readString,
  readValues,
  toErrorState,
} from "../action-utils"
import type { AcademicsListFormState } from "../list-form-state"

const FIELDS = ["grade", "specialisation", "summary", "tone", "order"]

function toLevel(
  values: Record<string, string>,
  formData: FormData
): ScienceProgramLevel {
  return {
    grade: values.grade,
    specialisation: values.specialisation,
    summary: values.summary,
    work: readList(formData, "work"),
    tone: values.tone as ScienceProgramLevel["tone"],
    order: readOrder(formData),
  }
}

export async function createScienceProgramLevelAction(
  _previous: AcademicsListFormState,
  formData: FormData
): Promise<AcademicsListFormState> {
  await requireAdmin()

  const scalarValues = readValues(formData, FIELDS)
  const values = { ...scalarValues, work: readList(formData, "work") }
  try {
    await createScienceProgramLevel(toLevel(scalarValues, formData))
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("academics")
  redirect("/admin/academics/science-program")
}

export async function updateScienceProgramLevelAction(
  _previous: AcademicsListFormState,
  formData: FormData
): Promise<AcademicsListFormState> {
  await requireAdmin()

  const scalarValues = readValues(formData, FIELDS)
  const values = { ...scalarValues, work: readList(formData, "work") }
  try {
    const updated = await updateScienceProgramLevel(
      readString(formData, "id"),
      toLevel(scalarValues, formData)
    )
    if (!updated) {
      return {
        status: "error",
        message: "That science program level no longer exists.",
      }
    }
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("academics")
  redirect("/admin/academics/science-program")
}

export async function deleteScienceProgramLevelAction(formData: FormData) {
  await requireAdmin()

  await deleteScienceProgramLevel(readString(formData, "id"))
  revalidateContent("academics")
  redirect("/admin/academics/science-program")
}
