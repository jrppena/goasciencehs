"use client"

import { useActionState } from "react"

import type { AcademicsSettings } from "@/lib/db/models/academics-settings"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { initialAcademicsListFormState } from "./list-form-state"
import { updateAcademicsSettingsAction } from "./settings-actions"

function CoreSubjectHoursForm({ settings }: { settings: AcademicsSettings }) {
  const [state, formAction, pending] = useActionState(
    updateAcademicsSettingsAction,
    initialAcademicsListFormState
  )
  const echoed = state.values?.coreSubjectHours
  const defaultValue =
    typeof echoed === "string" ? echoed : String(settings.coreSubjectHours)

  return (
    <form action={formAction} className="grid gap-md md:grid-cols-2">
      <div className="flex flex-col gap-xs">
        <Label htmlFor="coreSubjectHours">Core subject hours</Label>
        <Input
          id="coreSubjectHours"
          name="coreSubjectHours"
          type="number"
          defaultValue={defaultValue}
          aria-invalid={state.fieldErrors?.coreSubjectHours ? true : undefined}
        />
        <p className="text-body-sm text-muted-foreground">
          Drives the senior high core-subjects description and the hour labels
          on each subject.
        </p>
        {state.fieldErrors?.coreSubjectHours ? (
          <p className="text-body-sm text-error">
            {state.fieldErrors.coreSubjectHours}
          </p>
        ) : null}
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="text-body-md text-error md:col-span-2">
          {state.message}
        </p>
      ) : null}

      <div className="md:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save settings"}
        </Button>
      </div>
    </form>
  )
}

export { CoreSubjectHoursForm }
