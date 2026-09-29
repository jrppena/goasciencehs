"use client"

import { useActionState } from "react"
import Link from "next/link"

import {
  facultyKindLabels,
  type FacultyKind,
  type FacultyMember,
} from "@/lib/faculty"
import { FormField, Select } from "@/components/admin/form-field"
import { ImageUpload } from "@/components/admin/image-upload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
          <FormField
            name="honorific"
            label="Honorific"
            error={state.fieldErrors?.honorific}
          >
            {(control) => (
              <Select
                {...control}
                defaultValue={
                  state.values?.honorific ?? member?.honorific ?? "Ma'am"
                }
              >
                {HONORIFICS.map((honorific) => (
                  <option key={honorific} value={honorific}>
                    {honorific}
                  </option>
                ))}
              </Select>
            )}
          </FormField>

          <FormField name="name" label="Name" error={state.fieldErrors?.name}>
            {(control) => (
              <Input
                {...control}
                defaultValue={state.values?.name ?? member?.name ?? ""}
              />
            )}
          </FormField>
        </div>

        <FormField
          name="position"
          label="Position"
          hint="Blank renders the “To be announced” placeholder on the public site."
          error={state.fieldErrors?.position}
        >
          {(control) => (
            <Input
              {...control}
              defaultValue={state.values?.position ?? member?.position ?? ""}
            />
          )}
        </FormField>

        <div className="grid gap-md sm:grid-cols-2">
          <FormField name="email" label="Email" error={state.fieldErrors?.email}>
            {(control) => (
              <Input
                {...control}
                type="email"
                defaultValue={state.values?.email ?? member?.email ?? ""}
              />
            )}
          </FormField>

          <FormField name="room" label="Room" error={state.fieldErrors?.room}>
            {(control) => (
              <Input
                {...control}
                defaultValue={state.values?.room ?? member?.room ?? ""}
              />
            )}
          </FormField>
        </div>

        <FormField
          name="subjects"
          label="Subjects"
          hint="One subject per line. Blank renders the “To be announced” placeholder."
          error={state.fieldErrors?.subjects}
        >
          {(control) => (
            <Textarea
              {...control}
              rows={6}
              defaultValue={
                state.values?.subjects ?? member?.subjects?.join("\n") ?? ""
              }
            />
          )}
        </FormField>

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

        <FormField name="kind" label="Group" error={state.fieldErrors?.kind}>
          {(control) => (
            <Select
              {...control}
              defaultValue={state.values?.kind ?? member?.kind ?? "teaching"}
            >
              {KINDS.map((kind) => (
                <option key={kind} value={kind}>
                  {facultyKindLabels[kind]}
                </option>
              ))}
            </Select>
          )}
        </FormField>

        <FormField
          name="order"
          label="Order"
          hint="Lower numbers appear first within the group."
          error={state.fieldErrors?.order}
        >
          {(control) => (
            <Input
              {...control}
              type="number"
              defaultValue={state.values?.order ?? String(member?.order ?? 0)}
            />
          )}
        </FormField>

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

export { FacultyForm }
