import type { Metadata } from "next"

import { AcademicsListForm } from "../../list-form"
import { matatagStepFields } from "../../field-config"
import { createMatatagStepAction } from "../actions"

export const metadata: Metadata = {
  title: "New MATATAG step",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default function NewMatatagStepPage() {
  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        New MATATAG step
      </h1>
      <AcademicsListForm
        action={createMatatagStepAction}
        fields={matatagStepFields}
        submitLabel="Add MATATAG step"
        cancelHref="/admin/academics/matatag-rollout"
      />
    </div>
  )
}
