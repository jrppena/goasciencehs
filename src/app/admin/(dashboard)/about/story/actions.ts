"use server"

import { redirect } from "next/navigation"

import { requireAdmin } from "@/lib/auth/require-admin"
import { updateAboutStory } from "@/lib/db/admin"
import { revalidateContent } from "@/lib/db/revalidate"
import { readValues, toErrorState } from "../action-utils"
import type { AboutListFormState } from "../list-form-state"

const FIELDS = ["heading", "paragraphs"]

export async function updateAboutStoryAction(
  _previous: AboutListFormState,
  formData: FormData
): Promise<AboutListFormState> {
  await requireAdmin()

  const values = readValues(formData, FIELDS)
  try {
    await updateAboutStory({
      heading: values.heading,
      paragraphs: values.paragraphs
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
    })
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("about")
  redirect("/admin/about/story")
}
