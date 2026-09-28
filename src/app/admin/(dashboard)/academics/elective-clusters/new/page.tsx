import type { Metadata } from "next"

import { AcademicsListForm } from "../../list-form"
import { electiveClusterFields } from "../../field-config"
import { createElectiveClusterAction } from "../actions"

export const metadata: Metadata = {
  title: "New elective cluster",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default function NewElectiveClusterPage() {
  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        New elective cluster
      </h1>
      <AcademicsListForm
        action={createElectiveClusterAction}
        fields={electiveClusterFields}
        submitLabel="Add elective cluster"
        cancelHref="/admin/academics/elective-clusters"
      />
    </div>
  )
}
