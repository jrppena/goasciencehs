"use client"

import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button"
import { deleteTestimonialAction } from "./actions"

function DeleteTestimonialButton({ id, name }: { id: string; name: string }) {
  return (
    <ConfirmDeleteButton id={id} label={name} action={deleteTestimonialAction} />
  )
}

export { DeleteTestimonialButton }
