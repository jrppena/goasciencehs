import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getAdminMilestoneById } from "@/lib/db/admin"
import { AboutListForm } from "../../list-form"
import { milestoneFields } from "../../field-config"
import { updateMilestoneAction } from "../actions"

export const metadata: Metadata = {
  title: "Edit milestone",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function EditMilestonePage({
  params,
}: PageProps<"/admin/about/milestones/[id]">) {
  const milestone = await getAdminMilestoneById((await params).id)
  if (!milestone) notFound()

  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        Edit milestone
      </h1>
      <AboutListForm
        action={updateMilestoneAction}
        fields={milestoneFields}
        submitLabel="Save changes"
        cancelHref="/admin/about/milestones"
        hiddenId={milestone._id}
        values={{
          year: milestone.year,
          title: milestone.title,
          body: milestone.body,
          order: String(milestone.order),
        }}
      />
    </div>
  )
}
