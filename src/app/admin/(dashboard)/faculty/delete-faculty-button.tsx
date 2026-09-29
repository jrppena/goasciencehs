"use client"

import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button"
import { deleteFacultyAction } from "./actions"

function DeleteFacultyButton({ id, name }: { id: string; name: string }) {
  return <ConfirmDeleteButton id={id} label={name} action={deleteFacultyAction} />
}

export { DeleteFacultyButton }
