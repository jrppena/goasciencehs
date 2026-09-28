import type { Metadata } from "next"

import { AcademicsListForm } from "../../list-form"
import { scienceProgramLevelFields } from "../../field-config"
import { createScienceProgramLevelAction } from "../actions"

export const metadata: Metadata = {
  title: "New science program level",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default function NewScienceProgramLevelPage() {
  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        New science program level
      </h1>
      <AcademicsListForm
        action={createScienceProgramLevelAction}
        fields={scienceProgramLevelFields}
        submitLabel="Add science program level"
        cancelHref="/admin/academics/science-program"
      />
    </div>
  )
}
