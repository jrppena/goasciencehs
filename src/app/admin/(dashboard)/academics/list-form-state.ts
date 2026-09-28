export type AcademicsListFormState = {
  status: "idle" | "error"
  message?: string
  fieldErrors?: Record<string, string>
  /** Echoed back so a failed submit does not lose the admin's input. */
  values?: Record<string, string | string[]>
}

export const initialAcademicsListFormState: AcademicsListFormState = {
  status: "idle",
}
