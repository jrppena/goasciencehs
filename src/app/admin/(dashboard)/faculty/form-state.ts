export type FacultyValues = {
  honorific: string
  name: string
  position: string
  email: string
  room: string
  subjects: string
  photo: string
  kind: string
  isVisible: boolean
  order: string
}

export type FacultyFormState = {
  status: "idle" | "error"
  message?: string
  fieldErrors?: Record<string, string>
  /** Echoed back so a failed submit does not lose the admin's input. */
  values?: FacultyValues
}

export const initialFacultyFormState: FacultyFormState = { status: "idle" }
