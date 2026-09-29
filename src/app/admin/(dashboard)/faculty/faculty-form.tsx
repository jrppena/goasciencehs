"use client"

import { useActionState } from "react"
import Link from "next/link"

import { facultyKindLabels, type FacultyKind, type FacultyMember } from "@/lib/faculty"
import { describedBy } from "@/lib/utils"
import { ImageUpload } from "@/components/admin/image-upload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createFacultyAction, updateFacultyAction } from "./actions"
import { initialFacultyFormState } from "./form-state"

const HONORIFICS = ["Ma'am", "Sir"] as const

const KINDS = Object.keys(facultyKindLabels) as FacultyKind[]

type FacultyFormProps = {
  member?: FacultyMember & { _id: string }
}

function FacultyForm({ member }: FacultyFormProps) {
  const [state, formAction, pending] = useActionState(
    member ? updateFacultyAction : createFacultyAction,
    initialFacultyFormState
  )

  return (
    <form
      action={formAction}
      className="grid items-start gap-lg xl:grid-cols-[minmax(0,1fr)_22rem]"
    >
      {member ? <input type="hidden" name="id" value={member._id} /> : null}

      <div className="flex flex-col gap-md">
        <div className="grid gap-md sm:grid-cols-[10rem_minmax(0,1fr)]">
          <div className="flex flex-col gap-xs">
            <Label htmlFor="honorific">Honorific</Label>
            <select
              id="honorific"
              name="honorific"
              defaultValue={state.values?.honorific ?? member?.honorific ?? "Ma'am"}
              aria-invalid={state.fieldErrors?.honorific ? true : undefined}
              aria-describedby={describedBy(
                state.fieldErrors?.honorific && "honorific-error"
              )}
              className="h-10 w-full rounded-control border border-input bg-card px-sm text-body-md text-foreground transition-colors outline-none focus-visible:border-2 focus-visible:border-ring aria-invalid:border-2 aria-invalid:border-on-primary-fixed-variant"
            >
              {HONORIFICS.map((honorific) => (
                <option key={honorific} value={honorific}>
                  {honorific}
                </option>
              ))}
            </select>
            <FieldError id="honorific-error" message={state.fieldErrors?.honorific} />
          </div>

          <div className="flex flex-col gap-xs">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={state.values?.name ?? member?.name ?? ""}
              aria-invalid={state.fieldErrors?.name ? true : undefined}
              aria-describedby={describedBy(
                state.fieldErrors?.name && "name-error"
              )}
            />
            <FieldError id="name-error" message={state.fieldErrors?.name} />
          </div>
        </div>

        <div className="flex flex-col gap-xs">
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            name="position"
            defaultValue={state.values?.position ?? member?.position ?? ""}
            aria-invalid={state.fieldErrors?.position ? true : undefined}
            aria-describedby={describedBy(
              "position-hint",
              state.fieldErrors?.position && "position-error"
            )}
          />
          <p id="position-hint" className="text-body-sm text-muted-foreground">
            Blank renders the “To be announced” placeholder on the public site.
          </p>
          <FieldError id="position-error" message={state.fieldErrors?.position} />
        </div>

        <div className="grid gap-md sm:grid-cols-2">
          <div className="flex flex-col gap-xs">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={state.values?.email ?? member?.email ?? ""}
              aria-invalid={state.fieldErrors?.email ? true : undefined}
              aria-describedby={describedBy(
                state.fieldErrors?.email && "email-error"
              )}
            />
            <FieldError id="email-error" message={state.fieldErrors?.email} />
          </div>

          <div className="flex flex-col gap-xs">
            <Label htmlFor="room">Room</Label>
            <Input
              id="room"
              name="room"
              defaultValue={state.values?.room ?? member?.room ?? ""}
              aria-invalid={state.fieldErrors?.room ? true : undefined}
              aria-describedby={describedBy(
                state.fieldErrors?.room && "room-error"
              )}
            />
            <FieldError id="room-error" message={state.fieldErrors?.room} />
          </div>
        </div>

        <div className="flex flex-col gap-xs">
          <Label htmlFor="subjects">Subjects</Label>
          <Textarea
            id="subjects"
            name="subjects"
            rows={6}
            defaultValue={
              state.values?.subjects ?? member?.subjects?.join("\n") ?? ""
            }
            aria-invalid={state.fieldErrors?.subjects ? true : undefined}
            aria-describedby={describedBy(
              "subjects-hint",
              state.fieldErrors?.subjects && "subjects-error"
            )}
          />
          <p id="subjects-hint" className="text-body-sm text-muted-foreground">
            One subject per line. Blank renders the “To be announced”
            placeholder.
          </p>
          <FieldError id="subjects-error" message={state.fieldErrors?.subjects} />
        </div>

        <ImageUpload
          name="photo"
          label="Photo"
          defaultValue={state.values?.photo ?? member?.photo ?? ""}
          hint="Path under public/ or a Cloudinary upload. Blank uses the placeholder."
        />
      </div>

      <aside className="flex flex-col gap-md rounded-container border border-border bg-card p-md">
        <span className="font-mono text-label-md uppercase text-muted-foreground">
          Group &amp; visibility
        </span>

        <div className="flex flex-col gap-xs">
          <Label htmlFor="kind">Group</Label>
          <select
            id="kind"
            name="kind"
            defaultValue={state.values?.kind ?? member?.kind ?? "teaching"}
            aria-invalid={state.fieldErrors?.kind ? true : undefined}
            aria-describedby={describedBy(
              state.fieldErrors?.kind && "kind-error"
            )}
            className="h-10 w-full rounded-control border border-input bg-card px-sm text-body-md text-foreground transition-colors outline-none focus-visible:border-2 focus-visible:border-ring aria-invalid:border-2 aria-invalid:border-on-primary-fixed-variant"
          >
            {KINDS.map((kind) => (
              <option key={kind} value={kind}>
                {facultyKindLabels[kind]}
              </option>
            ))}
          </select>
          <FieldError id="kind-error" message={state.fieldErrors?.kind} />
        </div>

        <div className="flex flex-col gap-xs">
          <Label htmlFor="order">Order</Label>
          <Input
            id="order"
            name="order"
            type="number"
            defaultValue={state.values?.order ?? String(member?.order ?? 0)}
            aria-invalid={state.fieldErrors?.order ? true : undefined}
            aria-describedby={describedBy(
              "order-hint",
              state.fieldErrors?.order && "order-error"
            )}
          />
          <p id="order-hint" className="text-body-sm text-muted-foreground">
            Lower numbers appear first within the group.
          </p>
          <FieldError id="order-error" message={state.fieldErrors?.order} />
        </div>

        <label className="flex items-center gap-xs text-body-md">
          <input
            type="checkbox"
            name="isVisible"
            defaultChecked={state.values?.isVisible ?? member?.isVisible ?? true}
            className="size-4 accent-primary"
          />
          Visible on the public site
        </label>

        {state.status === "error" && state.message ? (
          <p role="alert" className="text-body-md text-error">
            {state.message}
          </p>
        ) : null}

        <div className="flex flex-col gap-sm">
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Saving…" : member ? "Save changes" : "Add member"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            render={<Link href="/admin/faculty" />}
          >
            Cancel
          </Button>
        </div>
      </aside>
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

export { FacultyForm }
