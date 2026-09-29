"use client"

import { useActionState, useState } from "react"

import type { SiteSettings } from "@/lib/db/models/site-settings"
import { FormField } from "@/components/admin/form-field"
import { useUnsavedChanges } from "@/components/admin/navigation-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { updateSiteSettingsAction } from "./actions"
import { initialSettingsFormState } from "./form-state"

type SocialLink = { label: string; href: string }

function SiteSettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction, pending] = useActionState(
    updateSiteSettingsAction,
    initialSettingsFormState
  )
  const [socials, setSocials] = useState<SocialLink[]>(settings.socials)
  const [dirty, setDirty] = useState(false)

  useUnsavedChanges(dirty)

  function updateSocial(index: number, patch: Partial<SocialLink>) {
    setSocials((current) =>
      current.map((social, i) => (i === index ? { ...social, ...patch } : social))
    )
  }

  return (
    <form
      action={formAction}
      onChange={() => setDirty(true)}
      className="flex flex-col gap-md"
    >
      <Card>
        <CardHeader>
          <CardTitle>
            <h2>Identity</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-md md:grid-cols-2">
            <FormField
              name="name"
              label="School name"
              error={state.fieldErrors?.name}
            >
              {(control) => (
                <Input
                  {...control}
                  defaultValue={state.values?.name ?? settings.name}
                />
              )}
            </FormField>

            <FormField
              name="shortName"
              label="Short name"
              error={state.fieldErrors?.shortName}
            >
              {(control) => (
                <Input
                  {...control}
                  defaultValue={state.values?.shortName ?? settings.shortName}
                />
              )}
            </FormField>

            <FormField
              name="tagline"
              label="Tagline"
              error={state.fieldErrors?.tagline}
              className="md:col-span-2"
            >
              {(control) => (
                <Input
                  {...control}
                  defaultValue={state.values?.tagline ?? settings.tagline}
                />
              )}
            </FormField>

            <FormField
              name="description"
              label="Description"
              hint="Used for the site metadata description."
              error={state.fieldErrors?.description}
              className="md:col-span-2"
            >
              {(control) => (
                <Textarea
                  {...control}
                  rows={3}
                  defaultValue={
                    state.values?.description ?? settings.description
                  }
                />
              )}
            </FormField>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h2>Contact</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-md md:grid-cols-2">
            <FormField
              name="address"
              label="Address"
              error={state.fieldErrors?.address}
              className="md:col-span-2"
            >
              {(control) => (
                <Input
                  {...control}
                  defaultValue={state.values?.address ?? settings.address}
                />
              )}
            </FormField>

            <FormField
              name="phone"
              label="Phone"
              error={state.fieldErrors?.phone}
            >
              {(control) => (
                <Input
                  {...control}
                  defaultValue={state.values?.phone ?? settings.phone}
                />
              )}
            </FormField>

            <FormField
              name="email"
              label="Email"
              error={state.fieldErrors?.email}
            >
              {(control) => (
                <Input
                  {...control}
                  type="email"
                  defaultValue={state.values?.email ?? settings.email}
                />
              )}
            </FormField>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h2>Social links</h2>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-sm">
          {socials.map((social, index) => (
            <div
              key={index}
              className="flex flex-col gap-sm sm:flex-row sm:items-end"
            >
              <div className="flex flex-1 flex-col gap-xs">
                <Input
                  name="socialLabel"
                  value={social.label}
                  onChange={(event) =>
                    updateSocial(index, { label: event.target.value })
                  }
                  placeholder="Facebook"
                  aria-label={`Social link ${index + 1} label`}
                />
              </div>
              <div className="flex flex-[2] flex-col gap-xs">
                <Input
                  name="socialHref"
                  value={social.href}
                  onChange={(event) =>
                    updateSocial(index, { href: event.target.value })
                  }
                  placeholder="https://facebook.com"
                  aria-label={`Social link ${index + 1} URL`}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-fit"
                onClick={() =>
                  setSocials((current) => current.filter((_, i) => i !== index))
                }
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-fit"
            onClick={() =>
              setSocials((current) => [...current, { label: "", href: "" }])
            }
          >
            Add social link
          </Button>
        </CardContent>
      </Card>

      {state.status === "error" && state.message ? (
        <p role="alert" className="text-body-md text-error">
          {state.message}
        </p>
      ) : null}

      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save site settings"}
        </Button>
      </div>
    </form>
  )
}

export { SiteSettingsForm }
