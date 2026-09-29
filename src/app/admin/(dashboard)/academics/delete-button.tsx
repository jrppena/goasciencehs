"use client"

import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button"

/** Two-step delete used by every Academics list; the action is passed by the page. */
function AcademicsDeleteButton({
  id,
  label,
  action,
}: {
  id: string
  label: string
  action: (formData: FormData) => Promise<void>
}) {
  return <ConfirmDeleteButton id={id} label={label} action={action} />
}

export { AcademicsDeleteButton }
