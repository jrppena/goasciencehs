export type AboutListFormState = {
  status: "idle" | "error"
  message?: string
  fieldErrors?: Record<string, string>
  /** Echoed back so a failed submit does not lose the admin's input. */
  values?: Record<string, string>
}

export const initialAboutListFormState: AboutListFormState = { status: "idle" }
