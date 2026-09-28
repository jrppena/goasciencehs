import type { Metadata } from "next"

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
      <h1 className="font-display text-headline-lg uppercase text-primary">
        New member
      </h1>
      <FacultyForm />
    </div>
  )
}
