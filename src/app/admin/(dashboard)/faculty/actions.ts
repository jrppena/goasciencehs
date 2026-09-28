"use server"

import { Error as MongooseError } from "mongoose"
import { redirect } from "next/navigation"

import { requireAdmin } from "@/lib/auth/require-admin"
import {
  createFaculty,
  deleteFaculty,
  setFacultyVisible,
  updateFaculty,
} from "@/lib/db/admin"
import { revalidateContent } from "@/lib/db/revalidate"
import type { FacultyMember } from "@/lib/faculty"
import type { FacultyFormState, FacultyValues } from "./form-state"

export async function createFacultyAction(
  _previous: FacultyFormState,
  formData: FormData
): Promise<FacultyFormState> {
  await requireAdmin()

  const values = readFacultyValues(formData)
  try {
    await createFaculty(toFacultyMember(values))
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("faculty")
  redirect("/admin/faculty")
}

export async function updateFacultyAction(
  _previous: FacultyFormState,
  formData: FormData
): Promise<FacultyFormState> {
  await requireAdmin()

  const values = readFacultyValues(formData)
  try {
    const member = await updateFaculty(
      readString(formData, "id"),
      toFacultyMember(values)
    )
    if (!member) {
      return { status: "error", message: "That member no longer exists." }
    }
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("faculty")
  redirect("/admin/faculty")
}

export async function deleteFacultyAction(formData: FormData) {
  await requireAdmin()

  await deleteFaculty(readString(formData, "id"))
  revalidateContent("faculty")
  redirect("/admin/faculty")
}

export async function setFacultyVisibleAction(id: string, isVisible: boolean) {
  await requireAdmin()

  await setFacultyVisible(id, isVisible)
  revalidateContent("faculty")
}

function readFacultyValues(formData: FormData): FacultyValues {
  return {
    honorific: readString(formData, "honorific"),
    name: readString(formData, "name"),
    position: readString(formData, "position"),
    email: readString(formData, "email"),
    room: readString(formData, "room"),
    subjects: readString(formData, "subjects"),
    photo: readString(formData, "photo"),
    kind: readString(formData, "kind"),
    isVisible: formData.get("isVisible") === "on",
    order: readString(formData, "order"),
  }
}

function toFacultyMember(values: FacultyValues): FacultyMember {
  const subjects = values.subjects
    .split("\n")
    .map((subject) => subject.trim())
    .filter(Boolean)

  return {
    honorific: values.honorific as FacultyMember["honorific"],
    name: values.name,
    position: values.position || null,
    email: values.email || null,
    room: values.room || null,
    subjects: subjects.length > 0 ? subjects : null,
    photo: values.photo || null,
    kind: values.kind as FacultyMember["kind"],
    isVisible: values.isVisible,
    order: values.order === "" ? 0 : Number(values.order),
  }
}

function readString(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value.trim() : ""
}

function toErrorState(error: unknown): FacultyFormState {
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
