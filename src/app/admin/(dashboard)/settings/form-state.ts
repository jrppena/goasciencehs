export type SiteSettingsValues = {
  name: string
  shortName: string
  tagline: string
  description: string
  address: string
  phone: string
  email: string
  socials: Array<{ label: string; href: string }>
}

export type StatsValues = {
  learnersEnrolled: string
  yearEstablished: string
  collegeProgressionRate: string
}

export type SettingsFormState = {
  status: "idle" | "error"
  message?: string
  fieldErrors?: Record<string, string>
  /** Echoed back so a failed submit does not lose the admin's input. */
  values?: SiteSettingsValues
}

export type StatsFormState = {
  status: "idle" | "error"
  message?: string
  fieldErrors?: Record<string, string>
  values?: StatsValues
}

export const initialSettingsFormState: SettingsFormState = { status: "idle" }
export const initialStatsFormState: StatsFormState = { status: "idle" }
