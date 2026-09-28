import type { Metadata } from "next"

import { AcademicsListForm } from "../../list-form"
import { coreSubjectFields } from "../../field-config"
import { createCoreSubjectAction } from "../actions"

export const metadata: Metadata = {
  title: "New core subject",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default function NewCoreSubjectPage() {
  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        New core subject
      </h1>
      <AcademicsListForm
        action={createCoreSubjectAction}
        fields={coreSubjectFields}
        submitLabel="Add core subject"
        cancelHref="/admin/academics/core-subjects"
      />
    </div>
  )
}
