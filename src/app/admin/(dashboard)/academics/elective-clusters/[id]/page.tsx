import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getAdminElectiveClusterById } from "@/lib/db/admin"
import { AcademicsListForm } from "../../list-form"
import { electiveClusterFields } from "../../field-config"
import { updateElectiveClusterAction } from "../actions"

export const metadata: Metadata = {
  title: "Edit elective cluster",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function EditElectiveClusterPage({
  params,
}: PageProps<"/admin/academics/elective-clusters/[id]">) {
  const cluster = await getAdminElectiveClusterById((await params).id)
  if (!cluster) notFound()

  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        Edit elective cluster
      </h1>
      <AcademicsListForm
        action={updateElectiveClusterAction}
        fields={electiveClusterFields}
        submitLabel="Save changes"
        cancelHref="/admin/academics/elective-clusters"
        hiddenId={cluster._id}
        values={{
          name: cluster.name,
          summary: cluster.summary,
          subjects: cluster.subjects,
          pathways: cluster.pathways,
          tone: cluster.tone,
          order: String(cluster.order),
        }}
      />
    </div>
  )
}
