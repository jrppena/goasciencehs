import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getAdminCoreValueById } from "@/lib/db/admin"
import { AboutListForm } from "../../list-form"
import { coreValueFields } from "../../field-config"
import { updateCoreValueAction } from "../actions"

export const metadata: Metadata = {
  title: "Edit core value",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function EditCoreValuePage({
  params,
}: PageProps<"/admin/about/core-values/[id]">) {
  const value = await getAdminCoreValueById((await params).id)
  if (!value) notFound()

  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        Edit core value
      </h1>
      <AboutListForm
        action={updateCoreValueAction}
        fields={coreValueFields}
        submitLabel="Save changes"
        cancelHref="/admin/about/core-values"
        hiddenId={value._id}
        values={{
          icon: value.icon ?? "",
          title: value.title,
          body: value.body,
          order: String(value.order),
        }}
      />
    </div>
  )
}
