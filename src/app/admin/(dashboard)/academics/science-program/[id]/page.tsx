import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getAdminScienceProgramLevelById } from "@/lib/db/admin"
import { AcademicsListForm } from "../../list-form"
import { scienceProgramLevelFields } from "../../field-config"
import { updateScienceProgramLevelAction } from "../actions"

export const metadata: Metadata = {
  title: "Edit science program level",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function EditScienceProgramLevelPage({
  params,
}: PageProps<"/admin/academics/science-program/[id]">) {
  const level = await getAdminScienceProgramLevelById((await params).id)
  if (!level) notFound()

  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        Edit science program level
      </h1>
      <AcademicsListForm
        action={updateScienceProgramLevelAction}
        fields={scienceProgramLevelFields}
        submitLabel="Save changes"
        cancelHref="/admin/academics/science-program"
        hiddenId={level._id}
        values={{
          grade: level.grade,
          specialisation: level.specialisation,
          tone: level.tone,
          order: String(level.order),
          summary: level.summary,
          work: level.work,
        }}
      />
    </div>
  )
}
