import type { Metadata } from "next"
import Link from "next/link"

import { getAdminCoreSubjects } from "@/lib/db/admin"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AcademicsDeleteButton } from "../delete-button"
import { deleteCoreSubjectAction } from "./actions"

export const metadata: Metadata = {
  title: "Core subjects",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function AdminCoreSubjectsPage() {
  const subjects = await getAdminCoreSubjects()

  return (
    <div className="flex flex-col gap-lg">
      <header className="flex flex-wrap items-end justify-between gap-md">
        <div className="flex flex-col gap-xs">
          <Link
            href="/admin/academics"
            className="font-mono text-label-md uppercase text-muted-foreground hover:text-primary"
          >
            ← Academics content
          </Link>
          <h1 className="font-display text-headline-lg uppercase text-primary">
            Core subjects
          </h1>
        </div>
        <Button render={<Link href="/admin/academics/core-subjects/new" />}>
          New core subject
        </Button>
      </header>

      {subjects.length === 0 ? (
        <Card className="px-md">
          <p className="text-body-md text-muted-foreground">
            No core subjects yet.
          </p>
        </Card>
      ) : (
        <ul className="flex flex-col gap-sm">
          {subjects.map((subject) => (
            <li key={subject._id}>
              <Card className="px-md">
                <div className="flex flex-wrap items-center justify-between gap-md">
                  <div className="flex min-w-0 flex-col gap-xs">
                    <Link
                      href={`/admin/academics/core-subjects/${subject._id}`}
                      className="font-display text-body-lg text-primary hover:underline"
                    >
                      {subject.name}
                    </Link>
                    <p className="max-w-[48rem] truncate text-body-md text-muted-foreground">
                      {subject.body}
                    </p>
                    <span className="font-mono text-label-md text-muted-foreground">
                      order {subject.order}
                    </span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <Button
                      variant="outline"
                      size="sm"
                      render={
                        <Link href={`/admin/academics/core-subjects/${subject._id}`} />
                      }
                    >
                      Edit
                    </Button>
                    <AcademicsDeleteButton
                      id={subject._id}
                      label={subject.name}
                      action={deleteCoreSubjectAction}
                    />
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
