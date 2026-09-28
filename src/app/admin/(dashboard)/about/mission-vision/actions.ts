"use server"

import { redirect } from "next/navigation"

import { requireAdmin } from "@/lib/auth/require-admin"
import {
  createMissionVision,
  deleteMissionVision,
  updateMissionVision,
} from "@/lib/db/admin"
import { revalidateContent } from "@/lib/db/revalidate"
import { pickIcon, statementIconNames } from "@/lib/icons"
import type { MissionVisionStatement } from "@/lib/db/models/mission-vision"
import {
  readOrder,
  readString,
  readValues,
  toErrorState,
} from "../action-utils"
import type { AboutListFormState } from "../list-form-state"

const FIELDS = ["icon", "tone", "label", "title", "body", "order"]

export async function createMissionVisionAction(
  _previous: AboutListFormState,
  formData: FormData
): Promise<AboutListFormState> {
  await requireAdmin()

  const values = readValues(formData, FIELDS)
  try {
    await createMissionVision(toStatement(values, formData))
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("about")
  redirect("/admin/about/mission-vision")
}

export async function updateMissionVisionAction(
  _previous: AboutListFormState,
  formData: FormData
): Promise<AboutListFormState> {
  await requireAdmin()

  const values = readValues(formData, FIELDS)
  try {
    const updated = await updateMissionVision(
      readString(formData, "id"),
      toStatement(values, formData)
    )
    if (!updated) {
      return { status: "error", message: "That statement no longer exists." }
    }
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("about")
  redirect("/admin/about/mission-vision")
}

export async function deleteMissionVisionAction(formData: FormData) {
  await requireAdmin()

  await deleteMissionVision(readString(formData, "id"))
  revalidateContent("about")
  redirect("/admin/about/mission-vision")
}

function toStatement(
  values: Record<string, string>,
  formData: FormData
): MissionVisionStatement {
  return {
    icon: pickIcon(values.icon, statementIconNames, "Target"),
    tone: values.tone as MissionVisionStatement["tone"],
    label: values.label,
    title: values.title,
    body: values.body,
    order: readOrder(formData),
  }
}
