import type { Metadata } from "next"
import Link from "next/link"

import { getAdminMissionVision } from "@/lib/db/admin"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AboutDeleteButton } from "../delete-button"
import { deleteMissionVisionAction } from "./actions"

export const metadata: Metadata = {
  title: "Mission and vision",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function AdminMissionVisionPage() {
  const statements = await getAdminMissionVision()

  return (
    <div className="flex flex-col gap-lg">
      <header className="flex flex-wrap items-end justify-between gap-md">
        <div className="flex flex-col gap-xs">
          <Link
            href="/admin/about"
            className="font-mono text-label-md uppercase text-muted-foreground hover:text-primary"
          >
            ← About content
          </Link>
          <h1 className="font-display text-headline-lg uppercase text-primary">
            Mission and vision
          </h1>
        </div>
        <Button render={<Link href="/admin/about/mission-vision/new" />}>
          New statement
        </Button>
      </header>

      {statements.length === 0 ? (
        <Card className="px-md">
          <p className="text-body-md text-muted-foreground">
            No statements yet.
          </p>
        </Card>
      ) : (
        <ul className="flex flex-col gap-sm">
          {statements.map((statement) => (
            <li key={statement._id}>
              <Card className="px-md">
                <div className="flex flex-wrap items-center justify-between gap-md">
                  <div className="flex min-w-0 flex-col gap-xs">
                    <Link
                      href={`/admin/about/mission-vision/${statement._id}`}
                      className="font-display text-body-lg text-primary hover:underline"
                    >
                      {statement.label} — {statement.title}
                    </Link>
                    <p className="max-w-[48rem] truncate text-body-md text-muted-foreground">
                      {statement.body}
                    </p>
                    <span className="font-mono text-label-md text-muted-foreground">
                      {statement.icon} · {statement.tone} · order{" "}
                      {statement.order}
                    </span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <Button
                      variant="outline"
                      size="sm"
                      render={
                        <Link href={`/admin/about/mission-vision/${statement._id}`} />
                      }
                    >
                      Edit
                    </Button>
                    <AboutDeleteButton
                      id={statement._id}
                      label={statement.label}
                      action={deleteMissionVisionAction}
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
