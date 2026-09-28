import type { Metadata } from "next"

import { AboutListForm } from "../../list-form"
import { milestoneFields } from "../../field-config"
import { createMilestoneAction } from "../actions"

export const metadata: Metadata = {
  title: "New milestone",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default function NewMilestonePage() {
  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        New milestone
      </h1>
      <AboutListForm
        action={createMilestoneAction}
        fields={milestoneFields}
        submitLabel="Add milestone"
        cancelHref="/admin/about/milestones"
      />
    </div>
  )
}
