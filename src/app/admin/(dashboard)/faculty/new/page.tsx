import type { Metadata } from "next"

import { GuardedLink } from "@/components/admin/navigation-guard"
import { FacultyForm } from "../faculty-form"

export const metadata: Metadata = {
  title: "New member",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default function NewFacultyPage() {
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
          New member
        </h1>
      </header>
      <FacultyForm />
    </div>
  )
}
