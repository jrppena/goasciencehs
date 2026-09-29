"use client"

import { useActionState, useState } from "react"

import type { SiteSettings } from "@/lib/db/models/site-settings"
import { describedBy } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

  function updateSocial(index: number, patch: Partial<SocialLink>) {
    setSocials((current) =>
      current.map((social, i) => (i === index ? { ...social, ...patch } : social))
    )
  }

  return (
    <form action={formAction} className="grid gap-md md:grid-cols-2">
      <div className="flex flex-col gap-xs">
        <Label htmlFor="name">School name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={state.values?.name ?? settings.name}
          aria-invalid={state.fieldErrors?.name ? true : undefined}
          aria-describedby={describedBy(
            state.fieldErrors?.name && "name-error"
          )}
        />
        <FieldError id="name-error" message={state.fieldErrors?.name} />
      </div>

      <div className="flex flex-col gap-xs">
        <Label htmlFor="shortName">Short name</Label>
        <Input
          id="shortName"
          name="shortName"
          defaultValue={state.values?.shortName ?? settings.shortName}
          aria-invalid={state.fieldErrors?.shortName ? true : undefined}
          aria-describedby={describedBy(
            state.fieldErrors?.shortName && "shortName-error"
          )}
        />
        <FieldError id="shortName-error" message={state.fieldErrors?.shortName} />
      </div>

      <div className="flex flex-col gap-xs md:col-span-2">
        <Label htmlFor="tagline">Tagline</Label>
        <Input
          id="tagline"
          name="tagline"
          defaultValue={state.values?.tagline ?? settings.tagline}
          aria-invalid={state.fieldErrors?.tagline ? true : undefined}
          aria-describedby={describedBy(
            state.fieldErrors?.tagline && "tagline-error"
          )}
        />
        <FieldError id="tagline-error" message={state.fieldErrors?.tagline} />
      </div>

      <div className="flex flex-col gap-xs md:col-span-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={state.values?.description ?? settings.description}
          aria-invalid={state.fieldErrors?.description ? true : undefined}
          aria-describedby={describedBy(
            "description-hint",
            state.fieldErrors?.description && "description-error"
          )}
        />
        <p id="description-hint" className="text-body-sm text-muted-foreground">
          Used for the site metadata description.
        </p>
        <FieldError
          id="description-error"
          message={state.fieldErrors?.description}
        />
      </div>

      <div className="flex flex-col gap-xs md:col-span-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          defaultValue={state.values?.address ?? settings.address}
          aria-invalid={state.fieldErrors?.address ? true : undefined}
          aria-describedby={describedBy(
            state.fieldErrors?.address && "address-error"
          )}
        />
        <FieldError id="address-error" message={state.fieldErrors?.address} />
      </div>

      <div className="flex flex-col gap-xs">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          defaultValue={state.values?.phone ?? settings.phone}
          aria-invalid={state.fieldErrors?.phone ? true : undefined}
          aria-describedby={describedBy(
            state.fieldErrors?.phone && "phone-error"
          )}
        />
        <FieldError id="phone-error" message={state.fieldErrors?.phone} />
      </div>

      <div className="flex flex-col gap-xs">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={state.values?.email ?? settings.email}
          aria-invalid={state.fieldErrors?.email ? true : undefined}
          aria-describedby={describedBy(
            state.fieldErrors?.email && "email-error"
          )}
        />
        <FieldError id="email-error" message={state.fieldErrors?.email} />
      </div>

      <div className="flex flex-col gap-sm md:col-span-2">
        <Label>Social links</Label>
        {socials.map((social, index) => (
          <div key={index} className="flex items-end gap-sm">
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
              onClick={() =>
                setSocials((current) =>
                  current.filter((_, i) => i !== index)
                )
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
          onClick={() => setSocials((current) => [...current, { label: "", href: "" }])}
        >
          Add social link
        </Button>
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="text-body-md text-error md:col-span-2">
          {state.message}
        </p>
      ) : null}

      <div className="md:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save site settings"}
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

export { SiteSettingsForm }
