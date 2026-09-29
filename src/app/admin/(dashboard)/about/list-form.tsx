"use client"

import {
  AdminListForm,
  type AdminListField,
} from "@/components/admin/admin-list-form"
import {
  initialAboutListFormState,
  type AboutListFormState,
} from "./list-form-state"

type AboutListField = AdminListField

type AboutListFormProps = {
  action: (
    state: AboutListFormState,
    formData: FormData
  ) => Promise<AboutListFormState>
  fields: AboutListField[]
  submitLabel: string
  cancelHref: string
  hiddenId?: string
  values?: Record<string, string>
}

/** Binds the shared list form to the About page's form state. */
function AboutListForm(props: AboutListFormProps) {
  return (
    <AdminListForm
      {...props}
      initialState={initialAboutListFormState}
    />
  )
}

export { AboutListForm }
export type { AboutListField }
