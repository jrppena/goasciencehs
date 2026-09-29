"use client"

import { useActionState, useEffect, useState } from "react"
import { ExternalLinkIcon } from "lucide-react"

import {
  newsCategories,
  signatoryRoles,
  slugify,
  type NewsCategory,
  type NewsPost,
} from "@/lib/news"
import {
  GuardedLink,
  useNavigationGuard,
} from "@/components/admin/navigation-guard"
import { FormField, Select } from "@/components/admin/form-field"
import { ImageUpload } from "@/components/admin/image-upload"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createNewsAction, updateNewsAction } from "./actions"
import { initialNewsFormState } from "./form-state"

type NewsFormProps = {
  post?: NewsPost & { _id: string }
  defaultPublishedOn: string
}

type SubmitIntent = "save" | "publish" | "unpublish"

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
  const [dirty, setDirty] = useState(false)
  const [submitting, setSubmitting] = useState<SubmitIntent | null>(null)

  const guard = useNavigationGuard()
  const setIsBlocked = guard?.setIsBlocked

  const isAdvisory = category === "Advisory"
  const published = post?.isPublished ?? false
  const publishIntent: SubmitIntent = published ? "unpublish" : "publish"
  const primaryLabel = post ? "Save changes" : "Save draft"
  const publishLabel = published ? "Unpublish" : "Publish"

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugEdited) setSlug(slugify(value))
  }

  // A reload or tab close would discard unsaved work.
  useEffect(() => {
    if (!dirty) return

    function handleBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault()
      event.returnValue = ""
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [dirty])

  // In-app navigation through the shell asks first, too.
  useEffect(() => {
    if (!setIsBlocked) return

    setIsBlocked(dirty)
    return () => setIsBlocked(false)
  }, [dirty, setIsBlocked])

  return (
    <form
      action={formAction}
      onChange={() => setDirty(true)}
      className="grid items-start gap-lg xl:grid-cols-[minmax(0,1fr)_22rem]"
    >
      {post ? <input type="hidden" name="id" value={post._id} /> : null}
      <input
        type="hidden"
        name="published"
        value={published ? "on" : "off"}
      />

      <div className="flex flex-col gap-md">
        <FormField name="title" label="Title" error={state.fieldErrors?.title}>
          {(control) => (
            <Input
              {...control}
              value={title}
              onChange={(event) => handleTitleChange(event.target.value)}
            />
          )}
        </FormField>

        <FormField
          name="slug"
          label="Slug"
          hint="The URL segment under /about/news-and-announcements."
          error={state.fieldErrors?.slug}
        >
          {(control) => (
            <Input
              {...control}
              value={slug}
              onChange={(event) => {
                setSlug(event.target.value)
                setSlugEdited(true)
              }}
            />
          )}
        </FormField>

        <FormField
          name="excerpt"
          label="Excerpt"
          error={state.fieldErrors?.excerpt}
        >
          {(control) => (
            <Textarea
              {...control}
              rows={3}
              defaultValue={state.values?.excerpt ?? post?.excerpt ?? ""}
            />
          )}
        </FormField>

        <ImageUpload
          name="image"
          label="Image"
          defaultValue={state.values?.image ?? post?.image ?? ""}
          hint="Shown on the article page. Uploads go to Cloudinary; images up to 5 MB."
        />

        <FormField
          name="body"
          label="Body"
          hint="Separate paragraphs with a blank line."
          error={state.fieldErrors?.body}
        >
          {(control) => (
            <Textarea
              {...control}
              rows={16}
              defaultValue={state.values?.body ?? post?.body.join("\n\n") ?? ""}
            />
          )}
        </FormField>
      </div>

      <aside className="flex flex-col gap-md rounded-container border border-border bg-card p-md">
        <span className="font-mono text-label-md uppercase text-muted-foreground">
          Publishing
        </span>

        <FormField
          name="category"
          label="Category"
          error={state.fieldErrors?.category}
        >
          {(control) => (
            <Select
              {...control}
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as NewsCategory)
              }
            >
              {newsCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          )}
        </FormField>

        <FormField
          name="publishedOn"
          label="Published on"
          error={state.fieldErrors?.publishedOn}
        >
          {(control) => (
            <Input
              {...control}
              type="date"
              defaultValue={
                state.values?.publishedOn ??
                post?.publishedOn ??
                defaultPublishedOn
              }
            />
          )}
        </FormField>

        <FormField name="author" label="Author" error={state.fieldErrors?.author}>
          {(control) => (
            <Input
              {...control}
              defaultValue={state.values?.author ?? post?.author ?? ""}
            />
          )}
        </FormField>

        {isAdvisory ? (
          <>
            <FormField
              name="signatoryName"
              label="Signatory name"
              error={state.fieldErrors?.signatoryName}
            >
              {(control) => (
                <Input
                  {...control}
                  defaultValue={
                    state.values?.signatoryName ?? post?.signatoryName ?? ""
                  }
                />
              )}
            </FormField>

            <FormField
              name="signatoryRole"
              label="Signatory role"
              hint="Advisories carry a signatory; other categories do not."
              error={state.fieldErrors?.signatoryRole}
            >
              {(control) => (
                <Select
                  {...control}
                  defaultValue={
                    state.values?.signatoryRole ?? post?.signatoryRole ?? ""
                  }
                >
                  <option value="">—</option>
                  {signatoryRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </Select>
              )}
            </FormField>
          </>
        ) : null}

        <div className="flex flex-col gap-xs">
          {post ? (
            <div className="flex flex-wrap items-center gap-xs">
              <Badge variant={published ? "primary" : "outline"}>
                {published ? "Published" : "Draft"}
              </Badge>
              <span className="text-body-sm text-muted-foreground">
                {published
                  ? "Live on the public site."
                  : "Not visible on the public site."}
              </span>
            </div>
          ) : (
            <p className="text-body-sm text-muted-foreground">
              New posts stay drafts until you choose Publish.
            </p>
          )}
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
        </div>

        {state.status === "error" && state.message ? (
          <p role="alert" className="text-body-md text-error">
            {state.message}
          </p>
        ) : null}

        <div className="flex flex-col gap-sm">
          <div className="hidden flex-col gap-sm xl:flex">
            <Button
              type="submit"
              name="intent"
              value="save"
              disabled={pending}
              className="w-full"
              onClick={() => setSubmitting("save")}
            >
              {pending && submitting === "save" ? "Saving…" : primaryLabel}
            </Button>
            <Button
              type="submit"
              name="intent"
              value={publishIntent}
              variant="secondary"
              disabled={pending}
              className="w-full"
              onClick={() => setSubmitting(publishIntent)}
            >
              {pending && submitting === publishIntent
                ? "Saving…"
                : publishLabel}
            </Button>
            {post?.isPublished ? (
              <Button
                variant="outline"
                className="w-full"
                render={
                  <GuardedLink
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
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              render={<GuardedLink href="/admin/news" />}
            >
              Cancel
            </Button>
          </div>
        </div>
      </aside>

      <div className="sticky bottom-0 z-10 -mx-md flex flex-wrap items-center gap-sm border-t border-border bg-card/95 px-md py-sm backdrop-blur md:-mx-lg md:px-lg xl:hidden">
        <Button
          type="submit"
          name="intent"
          value="save"
          disabled={pending}
          className="min-w-0 flex-1"
          onClick={() => setSubmitting("save")}
        >
          {pending && submitting === "save" ? "Saving…" : primaryLabel}
        </Button>
        <Button
          type="submit"
          name="intent"
          value={publishIntent}
          variant="secondary"
          disabled={pending}
          onClick={() => setSubmitting(publishIntent)}
        >
          {pending && submitting === publishIntent ? "Saving…" : publishLabel}
        </Button>
        <Button
          type="button"
          variant="ghost"
          render={<GuardedLink href="/admin/news" />}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export { NewsForm }
