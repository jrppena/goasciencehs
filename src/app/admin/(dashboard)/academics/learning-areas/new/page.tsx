import type { Metadata } from "next"

import { AcademicsListForm } from "../../list-form"
import { learningAreaFields } from "../../field-config"
import { createLearningAreaAction } from "../actions"

export const metadata: Metadata = {
  title: "New learning area",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default function NewLearningAreaPage() {
  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        New learning area
      </h1>
      <AcademicsListForm
        action={createLearningAreaAction}
        fields={learningAreaFields}
        submitLabel="Add learning area"
        cancelHref="/admin/academics/learning-areas"
      />
    </div>
  )
}
