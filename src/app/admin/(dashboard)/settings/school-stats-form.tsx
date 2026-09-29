"use client"

import { useActionState, useState } from "react"

import type { SchoolStats } from "@/lib/db/models/school-stats"
import { FormField } from "@/components/admin/form-field"
import { useUnsavedChanges } from "@/components/admin/navigation-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { updateSchoolStatsAction } from "./actions"
import { initialStatsFormState } from "./form-state"

function SchoolStatsForm({ stats }: { stats: SchoolStats }) {
  const [state, formAction, pending] = useActionState(
    updateSchoolStatsAction,
    initialStatsFormState
  )
  const [dirty, setDirty] = useState(false)

  useUnsavedChanges(dirty)

  return (
    <form
      action={formAction}
      onChange={() => setDirty(true)}
      className="flex flex-col gap-md"
    >
      <Card>
        <CardHeader>
          <CardTitle>
            <h2>School stats</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-md md:grid-cols-2">
            <FormField
              name="learnersEnrolled"
              label="Learners enrolled"
              error={state.fieldErrors?.learnersEnrolled}
            >
              {(control) => (
                <Input
                  {...control}
                  defaultValue={
                    state.values?.learnersEnrolled ?? stats.learnersEnrolled
                  }
                />
              )}
            </FormField>

            <FormField
              name="yearEstablished"
              label="Year established"
              error={state.fieldErrors?.yearEstablished}
            >
              {(control) => (
                <Input
                  {...control}
                  defaultValue={
                    state.values?.yearEstablished ?? stats.yearEstablished
                  }
                />
              )}
            </FormField>

            <FormField
              name="collegeProgressionRate"
              label="Move on to college"
              error={state.fieldErrors?.collegeProgressionRate}
            >
              {(control) => (
                <Input
                  {...control}
                  defaultValue={
                    state.values?.collegeProgressionRate ??
                    stats.collegeProgressionRate
                  }
                />
              )}
            </FormField>

            <FormField
              name="facultyAndStaff"
              label="Faculty and staff"
              hint="Computed from the visible faculty list — manage it under Faculty."
            >
              {(control) => (
                <Input
                  {...control}
                  value={stats.facultyAndStaff}
                  disabled
                  readOnly
                />
              )}
            </FormField>
          </div>
        </CardContent>
      </Card>

      {state.status === "error" && state.message ? (
        <p role="alert" className="text-body-md text-error">
          {state.message}
        </p>
      ) : null}

      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save school stats"}
        </Button>
      </div>
    </form>
  )
}

export { SchoolStatsForm }
