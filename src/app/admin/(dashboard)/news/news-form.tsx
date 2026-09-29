"use client"

import { useActionState, useState } from "react"
import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"

import {
  newsCategories,
  signatoryRoles,
  slugify,
  type NewsCategory,
  type NewsPost,
} from "@/lib/news"
import { describedBy } from "@/lib/utils"
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
  const [category, setCategory] = useState<NewsCategory>(
    post?.category ?? "Achievement"
  )

  const isAdvisory = category === "Advisory"

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
            aria-describedby={describedBy(
              state.fieldErrors?.title && "title-error"
            )}
          />
          <FieldError id="title-error" message={state.fieldErrors?.title} />
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
            aria-describedby={describedBy(
              "slug-hint",
              state.fieldErrors?.slug && "slug-error"
            )}
          />
          <p id="slug-hint" className="text-body-sm text-muted-foreground">
            The URL segment under /about/news-and-announcements.
          </p>
          <FieldError id="slug-error" message={state.fieldErrors?.slug} />
        </div>

        <div className="flex flex-col gap-xs">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            defaultValue={state.values?.excerpt ?? post?.excerpt ?? ""}
            aria-invalid={state.fieldErrors?.excerpt ? true : undefined}
            aria-describedby={describedBy(
              state.fieldErrors?.excerpt && "excerpt-error"
            )}
          />
          <FieldError id="excerpt-error" message={state.fieldErrors?.excerpt} />
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
            aria-describedby={describedBy(
              "body-hint",
              state.fieldErrors?.body && "body-error"
            )}
          />
          <p id="body-hint" className="text-body-sm text-muted-foreground">
            Separate paragraphs with a blank line.
          </p>
          <FieldError id="body-error" message={state.fieldErrors?.body} />
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
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as NewsCategory)
            }
            aria-invalid={state.fieldErrors?.category ? true : undefined}
            aria-describedby={describedBy(
              state.fieldErrors?.category && "category-error"
            )}
            className="h-10 w-full rounded-control border border-input bg-card px-sm text-body-md text-foreground transition-colors outline-none focus-visible:border-2 focus-visible:border-ring aria-invalid:border-2 aria-invalid:border-on-primary-fixed-variant"
          >
            {newsCategories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError id="category-error" message={state.fieldErrors?.category} />
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
            aria-describedby={describedBy(
              state.fieldErrors?.publishedOn && "publishedOn-error"
            )}
          />
          <FieldError
            id="publishedOn-error"
            message={state.fieldErrors?.publishedOn}
          />
        </div>

        <div className="flex flex-col gap-xs">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            name="author"
            defaultValue={state.values?.author ?? post?.author ?? ""}
            aria-invalid={state.fieldErrors?.author ? true : undefined}
            aria-describedby={describedBy(
              state.fieldErrors?.author && "author-error"
            )}
          />
          <FieldError id="author-error" message={state.fieldErrors?.author} />
        </div>

        {isAdvisory ? (
          <>
            <div className="flex flex-col gap-xs">
              <Label htmlFor="signatoryName">Signatory name</Label>
              <Input
                id="signatoryName"
                name="signatoryName"
                defaultValue={
                  state.values?.signatoryName ?? post?.signatoryName ?? ""
                }
                aria-invalid={state.fieldErrors?.signatoryName ? true : undefined}
                aria-describedby={describedBy(
                  state.fieldErrors?.signatoryName && "signatoryName-error"
                )}
              />
              <FieldError
                id="signatoryName-error"
                message={state.fieldErrors?.signatoryName}
              />
            </div>

            <div className="flex flex-col gap-xs">
              <Label htmlFor="signatoryRole">Signatory role</Label>
              <select
                id="signatoryRole"
                name="signatoryRole"
                defaultValue={
                  state.values?.signatoryRole ?? post?.signatoryRole ?? ""
                }
                aria-invalid={
                  state.fieldErrors?.signatoryRole ? true : undefined
                }
                aria-describedby={describedBy(
                  "signatoryRole-hint",
                  state.fieldErrors?.signatoryRole && "signatoryRole-error"
                )}
                className="h-10 w-full rounded-control border border-input bg-card px-sm text-body-md text-foreground transition-colors outline-none focus-visible:border-2 focus-visible:border-ring aria-invalid:border-2 aria-invalid:border-on-primary-fixed-variant"
              >
                <option value="">—</option>
                {signatoryRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <p
                id="signatoryRole-hint"
                className="text-body-sm text-muted-foreground"
              >
                Advisories carry a signatory; other categories do not.
              </p>
              <FieldError
                id="signatoryRole-error"
                message={state.fieldErrors?.signatoryRole}
              />
            </div>
          </>
        ) : null}

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
          <div className="hidden flex-col gap-sm xl:flex">
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
          {post?.isPublished ? (
            <Button
              variant="outline"
              className="w-full"
              render={
                <Link
                  href={`/about/news-and-announcements/${post.slug}`}
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              View live
              <ExternalLinkIcon />
            </Button>
          ) : null}
        </div>
      </aside>

      <div className="sticky bottom-0 z-10 -mx-md flex items-center gap-sm border-t border-border bg-card/95 px-md py-sm backdrop-blur md:-mx-lg md:px-lg xl:hidden">
        <Button type="submit" disabled={pending} className="flex-1">
          {pending ? "Saving…" : post ? "Save changes" : "Create post"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          render={<Link href="/admin/news" />}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null

  return (
    <p id={id} className="text-body-sm text-error">
      {message}
    </p>
  )
}

export { NewsForm }
