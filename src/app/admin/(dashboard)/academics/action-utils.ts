import { Error as MongooseError } from "mongoose"

import type { AcademicsListFormState } from "./list-form-state"

export function readString(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value.trim() : ""
}

export function readValues(formData: FormData, keys: string[]) {
  const values: Record<string, string> = {}
  for (const key of keys) {
    values[key] = readString(formData, key)
  }
  return values
}

/** Trims every repeated value and drops blank rows. */
export function readList(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter((value) => value !== "")
}

export function readOrder(formData: FormData) {
  const raw = readString(formData, "order")
  return raw === "" ? 0 : Number(raw)
}

export function toErrorState(error: unknown): AcademicsListFormState {
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
