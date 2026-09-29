"use client"

import { useActionState, useState } from "react"

import type { AcademicsSettings } from "@/lib/db/models/academics-settings"
import { FormField } from "@/components/admin/form-field"
import { useUnsavedChanges } from "@/components/admin/navigation-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { initialAcademicsListFormState } from "./list-form-state"
import { updateAcademicsSettingsAction } from "./settings-actions"

function CoreSubjectHoursForm({ settings }: { settings: AcademicsSettings }) {
  const [state, formAction, pending] = useActionState(
    updateAcademicsSettingsAction,
    initialAcademicsListFormState
  )
  const [dirty, setDirty] = useState(false)
  const echoed = state.values?.coreSubjectHours
  const defaultValue =
    typeof echoed === "string" ? echoed : String(settings.coreSubjectHours)

  useUnsavedChanges(dirty)

  return (
    <form
      action={formAction}
      onChange={() => setDirty(true)}
      className="grid gap-md md:grid-cols-2"
    >
      <FormField
        name="coreSubjectHours"
        label="Core subject hours"
        hint="Drives the senior high core-subjects description and the hour labels on each subject."
        error={state.fieldErrors?.coreSubjectHours}
      >
        {(control) => (
          <Input {...control} type="number" defaultValue={defaultValue} />
        )}
      </FormField>

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
