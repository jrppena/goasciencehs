export type TestimonialValues = {
  quote: string
  name: string
  batch: string
  now: string
  isVisible: boolean
  order: string
}

export type TestimonialFormState = {
  status: "idle" | "error"
  message?: string
  fieldErrors?: Record<string, string>
  /** Echoed back so a failed submit does not lose the admin's input. */
  values?: TestimonialValues
}

export const initialTestimonialFormState: TestimonialFormState = {
  status: "idle",
}
