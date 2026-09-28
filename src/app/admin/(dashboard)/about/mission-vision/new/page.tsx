import type { Metadata } from "next"

import { AboutListForm } from "../../list-form"
import { missionVisionFields } from "../../field-config"
import { createMissionVisionAction } from "../actions"

export const metadata: Metadata = {
  title: "New statement",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default function NewMissionVisionPage() {
  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        New statement
      </h1>
      <AboutListForm
        action={createMissionVisionAction}
        fields={missionVisionFields}
        submitLabel="Add statement"
        cancelHref="/admin/about/mission-vision"
      />
    </div>
  )
}
