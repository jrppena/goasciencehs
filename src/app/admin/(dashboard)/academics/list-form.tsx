"use client"

import {
  AdminListForm,
  type AdminListField,
} from "@/components/admin/admin-list-form"
import {
  initialAcademicsListFormState,
  type AcademicsListFormState,
} from "./list-form-state"

type AcademicsListField = AdminListField

type AcademicsListFormProps = {
  action: (
    state: AcademicsListFormState,
    formData: FormData
  ) => Promise<AcademicsListFormState>
  fields: AcademicsListField[]
  submitLabel: string
  cancelHref: string
  hiddenId?: string
  values?: Record<string, string | string[]>
}

/** Binds the shared list form to the Academics page's form state. */
function AcademicsListForm(props: AcademicsListFormProps) {
  return (
    <AdminListForm
      {...props}
      initialState={initialAcademicsListFormState}
    />
  )
}

export { AcademicsListForm }
export type { AcademicsListField }
