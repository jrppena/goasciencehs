"use server"

import { Error as MongooseError } from "mongoose"
import { redirect } from "next/navigation"

import { requireAdmin } from "@/lib/auth/require-admin"
import { updateSchoolStats, updateSiteSettings } from "@/lib/db/admin"
import { revalidateContent } from "@/lib/db/revalidate"
import type {
  SettingsFormState,
  SiteSettingsValues,
  StatsFormState,
  StatsValues,
} from "./form-state"

export async function updateSiteSettingsAction(
  _previous: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  await requireAdmin()

  const values = readSiteValues(formData)
  try {
    await updateSiteSettings(values)
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("site")
  redirect("/admin/settings")
}

export async function updateSchoolStatsAction(
  _previous: StatsFormState,
  formData: FormData
): Promise<StatsFormState> {
  await requireAdmin()

  const values = readStatsValues(formData)
  try {
    await updateSchoolStats(values)
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("stats")
  redirect("/admin/settings")
}

function readSiteValues(formData: FormData): SiteSettingsValues {
  const labels = formData.getAll("socialLabel")
  const hrefs = formData.getAll("socialHref")

  const socials = labels
    .map((label, index) => {
      const href = hrefs[index]

      return {
        label: typeof label === "string" ? label.trim() : "",
        href: typeof href === "string" ? href.trim() : "",
      }
    })
    .filter((social) => social.label || social.href)

  return {
    name: readString(formData, "name"),
    shortName: readString(formData, "shortName"),
    tagline: readString(formData, "tagline"),
    description: readString(formData, "description"),
    address: readString(formData, "address"),
    phone: readString(formData, "phone"),
    email: readString(formData, "email"),
    socials,
  }
}

function readStatsValues(formData: FormData): StatsValues {
  return {
    learnersEnrolled: readString(formData, "learnersEnrolled"),
    yearEstablished: readString(formData, "yearEstablished"),
    collegeProgressionRate: readString(formData, "collegeProgressionRate"),
  }
}

function readString(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value.trim() : ""
}

function toErrorState(error: unknown): {
  status: "error"
  message: string
  fieldErrors: Record<string, string>
} {
  if (error instanceof MongooseError.ValidationError) {
    const fieldErrors: Record<string, string> = {}
    for (const [path, issue] of Object.entries(error.errors)) {
      fieldErrors[path] = issue.message
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
    }
  }

  throw error
}
