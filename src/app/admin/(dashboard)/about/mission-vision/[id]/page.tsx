import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getAdminMissionVisionById } from "@/lib/db/admin"
import { AboutListForm } from "../../list-form"
import { missionVisionFields } from "../../field-config"
import { updateMissionVisionAction } from "../actions"

export const metadata: Metadata = {
  title: "Edit statement",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function EditMissionVisionPage({
  params,
}: PageProps<"/admin/about/mission-vision/[id]">) {
  const statement = await getAdminMissionVisionById((await params).id)
  if (!statement) notFound()

  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        Edit statement
      </h1>
      <AboutListForm
        action={updateMissionVisionAction}
        fields={missionVisionFields}
        submitLabel="Save changes"
        cancelHref="/admin/about/mission-vision"
        hiddenId={statement._id}
        values={{
          icon: statement.icon ?? "",
          tone: statement.tone,
          label: statement.label,
          title: statement.title,
          body: statement.body,
          order: String(statement.order),
        }}
      />
    </div>
  )
}
