import type { Metadata } from "next"
import Link from "next/link"

import { getAdminScienceProgramLevels } from "@/lib/db/admin"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AcademicsDeleteButton } from "../delete-button"
import { deleteScienceProgramLevelAction } from "./actions"

export const metadata: Metadata = {
  title: "Science program",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function AdminScienceProgramPage() {
  const levels = await getAdminScienceProgramLevels()

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
            Science program
          </h1>
        </div>
        <Button render={<Link href="/admin/academics/science-program/new" />}>
          New science program level
        </Button>
      </header>

      {levels.length === 0 ? (
        <Card className="px-md">
          <p className="text-body-md text-muted-foreground">
            No science program levels yet.
          </p>
        </Card>
      ) : (
        <ul className="flex flex-col gap-sm">
          {levels.map((level) => (
            <li key={level._id}>
              <Card className="px-md">
                <div className="flex flex-wrap items-center justify-between gap-md">
                  <div className="flex min-w-0 flex-col gap-xs">
                    <Link
                      href={`/admin/academics/science-program/${level._id}`}
                      className="font-display text-body-lg text-primary hover:underline"
                    >
                      {level.grade} · {level.specialisation}
                    </Link>
                    <p className="max-w-[48rem] truncate text-body-md text-muted-foreground">
                      {level.summary}
                    </p>
                    <span className="font-mono text-label-md text-muted-foreground">
                      {level.tone} · order {level.order}
                    </span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <Button
                      variant="outline"
                      size="sm"
                      render={
                        <Link href={`/admin/academics/science-program/${level._id}`} />
                      }
                    >
                      Edit
                    </Button>
                    <AcademicsDeleteButton
                      id={level._id}
                      label={`${level.grade} · ${level.specialisation}`}
                      action={deleteScienceProgramLevelAction}
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
