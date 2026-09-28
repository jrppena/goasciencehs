import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getAdminCurriculumShiftStepById } from "@/lib/db/admin"
import { AcademicsListForm } from "../../list-form"
import { curriculumShiftStepFields } from "../../field-config"
import { updateCurriculumShiftStepAction } from "../actions"

export const metadata: Metadata = {
  title: "Edit curriculum shift step",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function EditCurriculumShiftStepPage({
  params,
}: PageProps<"/admin/academics/curriculum-shift/[id]">) {
  const step = await getAdminCurriculumShiftStepById((await params).id)
  if (!step) notFound()

  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        Edit curriculum shift step
      </h1>
      <AcademicsListForm
        action={updateCurriculumShiftStepAction}
        fields={curriculumShiftStepFields}
        submitLabel="Save changes"
        cancelHref="/admin/academics/curriculum-shift"
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
