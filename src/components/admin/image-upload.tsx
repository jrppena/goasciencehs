"use client"

import { useRef, useState } from "react"
import Image from "next/image"

import { uploadImageAction } from "@/app/admin/upload-action"
import { describedBy } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"

type ImageUploadProps = {
  name: string
  label: string
  defaultValue?: string | null
  hint?: string
}

/** URL text field plus a server-signed Cloudinary upload for the chosen file. */
function ImageUpload({ name, label, defaultValue, hint }: ImageUploadProps) {
  const [url, setUrl] = useState(defaultValue ?? "")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string>()
  const fileInput = useRef<HTMLInputElement>(null)

  async function handleFile(file: File | undefined) {
    if (!file) return

    setPending(true)
    setError(undefined)

    const formData = new FormData()
    formData.set("file", file)
    const result = await uploadImageAction(formData)

    setPending(false)

    if ("error" in result) {
      setError(result.error)
      return
    }

    setUrl(result.url)
  }

  return (
    <div className="flex flex-col gap-xs">
      <Label htmlFor={name}>{label}</Label>
      <div className="flex items-start gap-md">
        {url ? (
          <Image
            src={url}
            alt=""
            width={96}
            height={96}
            unoptimized
            className="size-24 shrink-0 rounded-container border border-border object-cover"
          />
        ) : (
          <MediaPlaceholder className="size-24 shrink-0" />
        )}

        <div className="flex flex-1 flex-col gap-xs">
          <Input
            id={name}
            name={name}
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy(
              `${name}-hint`,
              error && `${name}-error`
            )}
            placeholder="/photo.png or https://res.cloudinary.com/…"
          />
          <div className="flex items-center gap-sm">
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleFile(event.target.files?.[0])}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={pending}
              onClick={() => fileInput.current?.click()}
            >
              {pending ? "Uploading…" : "Upload image"}
            </Button>
            {url ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setUrl("")}
              >
                Clear
              </Button>
            ) : null}
          </div>
          <p id={`${name}-hint`} className="text-body-sm text-muted-foreground">
            {hint ?? "Uploads go to Cloudinary. Images up to 5 MB."}
          </p>
          {error ? (
            <p id={`${name}-error`} className="text-body-sm text-error">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export { ImageUpload }
