export type NewsValues = {
  title: string
  slug: string
  category: string
  publishedOn: string
  author: string
  signatoryName: string
  signatoryRole: string
  excerpt: string
  body: string
  image: string
  isFeatured: boolean
}

export type NewsFormState = {
  status: "idle" | "error"
  message?: string
  fieldErrors?: Record<string, string>
  /** Echoed back so a failed submit does not lose the admin's input. */
  values?: NewsValues
}

export const initialNewsFormState: NewsFormState = { status: "idle" }
