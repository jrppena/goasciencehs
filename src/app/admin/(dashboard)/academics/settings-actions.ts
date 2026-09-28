"use server"

import { redirect } from "next/navigation"

import { requireAdmin } from "@/lib/auth/require-admin"
import { updateAcademicsSettings } from "@/lib/db/admin"
import { revalidateContent } from "@/lib/db/revalidate"
import { readString, toErrorState } from "./action-utils"
import type { AcademicsListFormState } from "./list-form-state"

export async function updateAcademicsSettingsAction(
  _previous: AcademicsListFormState,
  formData: FormData
): Promise<AcademicsListFormState> {
  await requireAdmin()

  const raw = readString(formData, "coreSubjectHours")
  try {
    await updateAcademicsSettings({ coreSubjectHours: Number(raw) })
  } catch (error) {
    return { ...toErrorState(error), values: { coreSubjectHours: raw } }
  }

  revalidateContent("academics")
  redirect("/admin/academics")
}
