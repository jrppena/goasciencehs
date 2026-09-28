"use client"

import { useActionState, useState } from "react"
import Link from "next/link"

import { newsCategories, slugify, type NewsPost } from "@/lib/news"
import { ImageUpload } from "@/components/admin/image-upload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createNewsAction, updateNewsAction } from "./actions"
import { initialNewsFormState } from "./form-state"

type NewsFormProps = {
  post?: NewsPost & { _id: string }
  defaultPublishedOn: string
}

function NewsForm({ post, defaultPublishedOn }: NewsFormProps) {
  const [state, formAction, pending] = useActionState(
    post ? updateNewsAction : createNewsAction,
    initialNewsFormState
  )

  const [title, setTitle] = useState(post?.title ?? "")
  const [slug, setSlug] = useState(post?.slug ?? "")
  const [slugEdited, setSlugEdited] = useState(Boolean(post))

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugEdited) setSlug(slugify(value))
  }

  return (
    <form
      action={formAction}
      className="grid items-start gap-lg xl:grid-cols-[minmax(0,1fr)_22rem]"
    >
      {post ? <input type="hidden" name="id" value={post._id} /> : null}

      <div className="flex flex-col gap-md">
        <div className="flex flex-col gap-xs">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            aria-invalid={state.fieldErrors?.title ? true : undefined}
          />
          <FieldError message={state.fieldErrors?.title} />
        </div>

        <div className="flex flex-col gap-xs">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={slug}
            onChange={(event) => {
              setSlug(event.target.value)
              setSlugEdited(true)
            }}
            aria-invalid={state.fieldErrors?.slug ? true : undefined}
          />
          <p className="text-body-sm text-muted-foreground">
            The URL segment under /about/news-and-announcements.
          </p>
          <FieldError message={state.fieldErrors?.slug} />
        </div>

        <div className="flex flex-col gap-xs">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            defaultValue={state.values?.excerpt ?? post?.excerpt ?? ""}
            aria-invalid={state.fieldErrors?.excerpt ? true : undefined}
          />
          <FieldError message={state.fieldErrors?.excerpt} />
        </div>

        <ImageUpload
          name="image"
          label="Image"
          defaultValue={state.values?.image ?? post?.image ?? ""}
          hint="Shown on the article page. Uploads go to Cloudinary; images up to 5 MB."
        />

        <div className="flex flex-col gap-xs">
          <Label htmlFor="body">Body</Label>
          <Textarea
            id="body"
            name="body"
            rows={16}
            defaultValue={state.values?.body ?? post?.body.join("\n\n") ?? ""}
            aria-invalid={state.fieldErrors?.body ? true : undefined}
          />
          <p className="text-body-sm text-muted-foreground">
            Separate paragraphs with a blank line.
          </p>
          <FieldError message={state.fieldErrors?.body} />
        </div>
      </div>

      <aside className="flex flex-col gap-md rounded-container border border-border bg-card p-md">
        <span className="font-mono text-label-md uppercase text-muted-foreground">
          Publishing
        </span>

        <div className="flex flex-col gap-xs">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            defaultValue={state.values?.category ?? post?.category ?? "Achievement"}
            aria-invalid={state.fieldErrors?.category ? true : undefined}
            className="h-10 w-full rounded-control border border-input bg-card px-sm text-body-md text-foreground transition-colors outline-none focus-visible:border-2 focus-visible:border-ring aria-invalid:border-2 aria-invalid:border-on-primary-fixed-variant"
          >
            {newsCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <FieldError message={state.fieldErrors?.category} />
        </div>

        <div className="flex flex-col gap-xs">
          <Label htmlFor="publishedOn">Published on</Label>
          <Input
            id="publishedOn"
            name="publishedOn"
            type="date"
            defaultValue={
              state.values?.publishedOn ?? post?.publishedOn ?? defaultPublishedOn
            }
            aria-invalid={state.fieldErrors?.publishedOn ? true : undefined}
          />
          <FieldError message={state.fieldErrors?.publishedOn} />
        </div>

        <div className="flex flex-col gap-xs">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            name="author"
            defaultValue={state.values?.author ?? post?.author ?? ""}
            aria-invalid={state.fieldErrors?.author ? true : undefined}
          />
          <FieldError message={state.fieldErrors?.author} />
        </div>

        <fieldset className="flex flex-col gap-sm">
          <label className="flex items-center gap-xs text-body-md">
            <input
              type="checkbox"
              name="isPublished"
              defaultChecked={
                state.values?.isPublished ?? post?.isPublished ?? true
              }
              className="size-4 accent-primary"
            />
            Published
          </label>
          <label className="flex items-center gap-xs text-body-md">
            <input
              type="checkbox"
              name="isFeatured"
              defaultChecked={
                state.values?.isFeatured ?? post?.isFeatured ?? false
              }
              className="size-4 accent-primary"
            />
            Feature on the home and news pages
          </label>
        </fieldset>

        {state.status === "error" && state.message ? (
          <p role="alert" className="text-body-md text-error">
            {state.message}
          </p>
        ) : null}

        <div className="flex flex-col gap-sm">
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Saving…" : post ? "Save changes" : "Create post"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            render={<Link href="/admin/news" />}
          >
            Cancel
          </Button>
        </div>
      </aside>
    </form>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null

  return <p className="text-body-sm text-error">{message}</p>
}

export { NewsForm }
