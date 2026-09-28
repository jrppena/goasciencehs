import { Error as MongooseError } from "mongoose"

import type { AboutListFormState } from "./list-form-state"

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

export function readOrder(formData: FormData) {
  const raw = readString(formData, "order")
  return raw === "" ? 0 : Number(raw)
}

export function toErrorState(error: unknown): AboutListFormState {
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
