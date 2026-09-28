"use server"

import { requireAdmin } from "@/lib/auth/require-admin"
import { UploadError, uploadImage } from "@/lib/cloudinary"

export type UploadResult = { url: string } | { error: string }

export async function uploadImageAction(
  formData: FormData
): Promise<UploadResult> {
  await requireAdmin()

  const file = formData.get("file")
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose an image to upload." }
  }

  try {
    return { url: await uploadImage(file) }
  } catch (error) {
    if (error instanceof UploadError) {
      return { error: error.message }
    }
    throw error
  }
}
