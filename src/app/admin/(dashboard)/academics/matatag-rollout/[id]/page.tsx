import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getAdminMatatagStepById } from "@/lib/db/admin"
import { AcademicsListForm } from "../../list-form"
import { matatagStepFields } from "../../field-config"
import { updateMatatagStepAction } from "../actions"

export const metadata: Metadata = {
  title: "Edit MATATAG step",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function EditMatatagStepPage({
  params,
}: PageProps<"/admin/academics/matatag-rollout/[id]">) {
  const step = await getAdminMatatagStepById((await params).id)
  if (!step) notFound()

  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        Edit MATATAG step
      </h1>
      <AcademicsListForm
        action={updateMatatagStepAction}
        fields={matatagStepFields}
        submitLabel="Save changes"
        cancelHref="/admin/academics/matatag-rollout"
        hiddenId={step._id}
        values={{
          year: step.year,
          title: step.title,
          order: String(step.order),
          body: step.body,
        }}
      />
    </div>
  )
}
