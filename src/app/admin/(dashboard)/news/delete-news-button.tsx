"use client"

import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button"
import { deleteNewsAction } from "./actions"

function DeleteNewsButton({ id, title }: { id: string; title: string }) {
  return <ConfirmDeleteButton id={id} label={title} action={deleteNewsAction} />
}

export { DeleteNewsButton }
