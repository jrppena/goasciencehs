"use server"

import { redirect } from "next/navigation"

import { requireAdmin } from "@/lib/auth/require-admin"
import {
  createCoreSubject,
  deleteCoreSubject,
  updateCoreSubject,
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

export async function createCoreSubjectAction(
  _previous: AcademicsListFormState,
  formData: FormData
): Promise<AcademicsListFormState> {
  await requireAdmin()

  const values = readValues(formData, FIELDS)
  try {
    await createCoreSubject({
      name: values.name,
      body: values.body,
      order: readOrder(formData),
    })
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("academics")
  redirect("/admin/academics/core-subjects")
}

export async function updateCoreSubjectAction(
  _previous: AcademicsListFormState,
  formData: FormData
): Promise<AcademicsListFormState> {
  await requireAdmin()

  const values = readValues(formData, FIELDS)
  try {
    const updated = await updateCoreSubject(readString(formData, "id"), {
      name: values.name,
      body: values.body,
      order: readOrder(formData),
    })
    if (!updated) {
      return { status: "error", message: "That core subject no longer exists." }
    }
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("academics")
  redirect("/admin/academics/core-subjects")
}

export async function deleteCoreSubjectAction(formData: FormData) {
  await requireAdmin()

  await deleteCoreSubject(readString(formData, "id"))
  revalidateContent("academics")
  redirect("/admin/academics/core-subjects")
}
