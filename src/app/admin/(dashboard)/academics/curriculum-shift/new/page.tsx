import type { Metadata } from "next"

import { AcademicsListForm } from "../../list-form"
import { curriculumShiftStepFields } from "../../field-config"
import { createCurriculumShiftStepAction } from "../actions"

export const metadata: Metadata = {
  title: "New curriculum shift step",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default function NewCurriculumShiftStepPage() {
  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        New curriculum shift step
      </h1>
      <AcademicsListForm
        action={createCurriculumShiftStepAction}
        fields={curriculumShiftStepFields}
        submitLabel="Add curriculum shift step"
        cancelHref="/admin/academics/curriculum-shift"
      />
    </div>
  )
}
