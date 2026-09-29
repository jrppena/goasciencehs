import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getAdminFacultyById } from "@/lib/db/admin"
import { GuardedLink } from "@/components/admin/navigation-guard"
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
      <header className="flex flex-col gap-xs">
        <GuardedLink
          href="/admin/faculty"
          className="font-mono text-label-md uppercase text-muted-foreground hover:text-primary"
        >
          ← Faculty and Staff
        </GuardedLink>
        <h1 className="font-display text-headline-lg uppercase text-primary">
          Edit member
        </h1>
        <p className="font-display text-body-lg">
          {member.honorific} {member.name}
        </p>
      </header>
      <FacultyForm member={member} />
    </div>
  )
}
