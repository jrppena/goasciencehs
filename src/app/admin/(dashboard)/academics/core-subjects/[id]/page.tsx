import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getAdminCoreSubjectById } from "@/lib/db/admin"
import { AcademicsListForm } from "../../list-form"
import { coreSubjectFields } from "../../field-config"
import { updateCoreSubjectAction } from "../actions"

export const metadata: Metadata = {
  title: "Edit core subject",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function EditCoreSubjectPage({
  params,
}: PageProps<"/admin/academics/core-subjects/[id]">) {
  const subject = await getAdminCoreSubjectById((await params).id)
  if (!subject) notFound()

  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        Edit core subject
      </h1>
      <AcademicsListForm
        action={updateCoreSubjectAction}
        fields={coreSubjectFields}
        submitLabel="Save changes"
        cancelHref="/admin/academics/core-subjects"
        hiddenId={subject._id}
        values={{
          name: subject.name,
          body: subject.body,
          order: String(subject.order),
        }}
      />
    </div>
  )
}
