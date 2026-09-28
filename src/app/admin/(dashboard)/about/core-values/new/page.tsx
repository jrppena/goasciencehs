import type { Metadata } from "next"

import { AboutListForm } from "../../list-form"
import { coreValueFields } from "../../field-config"
import { createCoreValueAction } from "../actions"

export const metadata: Metadata = {
  title: "New core value",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default function NewCoreValuePage() {
  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        New core value
      </h1>
      <AboutListForm
        action={createCoreValueAction}
        fields={coreValueFields}
        submitLabel="Add core value"
        cancelHref="/admin/about/core-values"
      />
    </div>
  )
}
