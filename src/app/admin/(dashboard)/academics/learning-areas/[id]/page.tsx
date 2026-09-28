import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getAdminLearningAreaById } from "@/lib/db/admin"
import { AcademicsListForm } from "../../list-form"
import { learningAreaFields } from "../../field-config"
import { updateLearningAreaAction } from "../actions"

export const metadata: Metadata = {
  title: "Edit learning area",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function EditLearningAreaPage({
  params,
}: PageProps<"/admin/academics/learning-areas/[id]">) {
  const area = await getAdminLearningAreaById((await params).id)
  if (!area) notFound()

  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        Edit learning area
      </h1>
      <AcademicsListForm
        action={updateLearningAreaAction}
        fields={learningAreaFields}
        submitLabel="Save changes"
        cancelHref="/admin/academics/learning-areas"
        hiddenId={area._id}
        values={{
          name: area.name,
          body: area.body,
          order: String(area.order),
        }}
      />
    </div>
  )
}
