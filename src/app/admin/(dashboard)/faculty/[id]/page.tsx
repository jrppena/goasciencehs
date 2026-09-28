import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getAdminFacultyById } from "@/lib/db/admin"
import { FacultyForm } from "../faculty-form"

export const metadata: Metadata = {
  title: "Edit member",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function EditFacultyPage({
  params,
}: PageProps<"/admin/faculty/[id]">) {
  const member = await getAdminFacultyById((await params).id)
  if (!member) notFound()

  return (
    <div className="flex flex-col gap-lg">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        Edit member
      </h1>
      <FacultyForm member={member} />
    </div>
  )
}
