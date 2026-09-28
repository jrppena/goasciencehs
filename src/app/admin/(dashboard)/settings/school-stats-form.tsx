"use client"

import { useActionState } from "react"

import type { SchoolStats } from "@/lib/db/models/school-stats"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateSchoolStatsAction } from "./actions"
import { initialStatsFormState } from "./form-state"

function SchoolStatsForm({ stats }: { stats: SchoolStats }) {
  const [state, formAction, pending] = useActionState(
    updateSchoolStatsAction,
    initialStatsFormState
  )

  return (
    <form action={formAction} className="grid gap-md md:grid-cols-2">
      <div className="flex flex-col gap-xs">
        <Label htmlFor="learnersEnrolled">Learners enrolled</Label>
        <Input
          id="learnersEnrolled"
          name="learnersEnrolled"
          defaultValue={state.values?.learnersEnrolled ?? stats.learnersEnrolled}
          aria-invalid={state.fieldErrors?.learnersEnrolled ? true : undefined}
        />
        <FieldError message={state.fieldErrors?.learnersEnrolled} />
      </div>

      <div className="flex flex-col gap-xs">
        <Label htmlFor="yearEstablished">Year established</Label>
        <Input
          id="yearEstablished"
          name="yearEstablished"
          defaultValue={state.values?.yearEstablished ?? stats.yearEstablished}
          aria-invalid={state.fieldErrors?.yearEstablished ? true : undefined}
        />
        <FieldError message={state.fieldErrors?.yearEstablished} />
      </div>

      <div className="flex flex-col gap-xs">
        <Label htmlFor="collegeProgressionRate">Move on to college</Label>
        <Input
          id="collegeProgressionRate"
          name="collegeProgressionRate"
          defaultValue={
            state.values?.collegeProgressionRate ?? stats.collegeProgressionRate
          }
          aria-invalid={
            state.fieldErrors?.collegeProgressionRate ? true : undefined
          }
        />
        <FieldError message={state.fieldErrors?.collegeProgressionRate} />
      </div>

      <div className="flex flex-col gap-xs">
        <Label htmlFor="facultyAndStaff">Faculty and staff</Label>
        <Input
          id="facultyAndStaff"
          value={stats.facultyAndStaff}
          disabled
          readOnly
        />
        <p className="text-body-sm text-muted-foreground">
          Computed from the visible faculty list — manage it under Faculty.
        </p>
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="text-body-md text-error md:col-span-2">
          {state.message}
        </p>
      ) : null}

      <div className="md:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save school stats"}
        </Button>
      </div>
    </form>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null

  return <p className="text-body-sm text-error">{message}</p>
}

export { SchoolStatsForm }
