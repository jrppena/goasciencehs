"use client"

import { ConfirmActionButton } from "@/components/admin/confirm-action-button"

/** Two-step delete shared by every admin list. */
function ConfirmDeleteButton({
  id,
  label,
  action,
}: {
  id: string
  label: string
  action: (formData: FormData) => Promise<void>
}) {
  return (
    <ConfirmActionButton
      action={action}
      hiddenFields={[{ name: "id", value: id }]}
      label="Delete"
      ariaLabel={`Delete ${label}`}
      confirmLabel={`Delete “${label}”?`}
      submitVariant="destructive"
    />
  )
}

export { ConfirmDeleteButton }
