"use server"

import { redirect } from "next/navigation"

import { requireAdmin } from "@/lib/auth/require-admin"
import { createCoreValue, deleteCoreValue, updateCoreValue } from "@/lib/db/admin"
import { revalidateContent } from "@/lib/db/revalidate"
import { pickIcon, valueIconNames } from "@/lib/icons"
import {
  readOrder,
  readString,
  readValues,
  toErrorState,
} from "../action-utils"
import type { AboutListFormState } from "../list-form-state"

const FIELDS = ["icon", "title", "body", "order"]

export async function createCoreValueAction(
  _previous: AboutListFormState,
  formData: FormData
): Promise<AboutListFormState> {
  await requireAdmin()

  const values = readValues(formData, FIELDS)
  try {
    await createCoreValue({
      icon: pickIcon(values.icon, valueIconNames, "FlaskConical"),
      title: values.title,
      body: values.body,
      order: readOrder(formData),
    })
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("about")
  redirect("/admin/about/core-values")
}

export async function updateCoreValueAction(
  _previous: AboutListFormState,
  formData: FormData
): Promise<AboutListFormState> {
  await requireAdmin()

  const values = readValues(formData, FIELDS)
  try {
    const updated = await updateCoreValue(readString(formData, "id"), {
      icon: pickIcon(values.icon, valueIconNames, "FlaskConical"),
      title: values.title,
      body: values.body,
      order: readOrder(formData),
    })
    if (!updated) {
      return { status: "error", message: "That core value no longer exists." }
    }
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("about")
  redirect("/admin/about/core-values")
}

export async function deleteCoreValueAction(formData: FormData) {
  await requireAdmin()

  await deleteCoreValue(readString(formData, "id"))
  revalidateContent("about")
  redirect("/admin/about/core-values")
}
