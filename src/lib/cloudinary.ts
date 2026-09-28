import "server-only"

import { v2 as cloudinary } from "cloudinary"

const MAX_IMAGE_MB = 5

/** A rejection the admin can act on, as opposed to an infrastructure failure. */
export class UploadError extends Error {}

/** Uploads an admin-supplied image to Cloudinary and returns its secure URL. */
export async function uploadImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new UploadError("Only image files can be uploaded.")
  }
  if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
    throw new UploadError(`Images must be ${MAX_IMAGE_MB} MB or smaller.`)
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Missing Cloudinary configuration. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
    )
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  })

  const buffer = Buffer.from(await file.arrayBuffer())

  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { folder: "gshs", resource_type: "image" },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new UploadError("The upload failed. Try again."))
          return
        }
        resolve(result.secure_url)
      }
    )

    upload.end(buffer)
  })
}
