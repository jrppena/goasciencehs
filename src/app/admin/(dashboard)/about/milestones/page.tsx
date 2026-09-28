import type { Metadata } from "next"
import Link from "next/link"

import { getAdminMilestones } from "@/lib/db/admin"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AboutDeleteButton } from "../delete-button"
import { deleteMilestoneAction } from "./actions"

export const metadata: Metadata = {
  title: "Milestones",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function AdminMilestonesPage() {
  const milestones = await getAdminMilestones()

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
            Milestones
          </h1>
        </div>
        <Button render={<Link href="/admin/about/milestones/new" />}>
          New milestone
        </Button>
      </header>

      {milestones.length === 0 ? (
        <Card className="px-md">
          <p className="text-body-md text-muted-foreground">
            No milestones yet.
          </p>
        </Card>
      ) : (
        <ul className="flex flex-col gap-sm">
          {milestones.map((milestone) => (
            <li key={milestone._id}>
              <Card className="px-md">
                <div className="flex flex-wrap items-center justify-between gap-md">
                  <div className="flex min-w-0 flex-col gap-xs">
                    <Link
                      href={`/admin/about/milestones/${milestone._id}`}
                      className="font-display text-body-lg text-primary hover:underline"
                    >
                      {milestone.year} — {milestone.title}
                    </Link>
                    <p className="max-w-[48rem] truncate text-body-md text-muted-foreground">
                      {milestone.body}
                    </p>
                    <span className="font-mono text-label-md text-muted-foreground">
                      order {milestone.order}
                    </span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <Button
                      variant="outline"
                      size="sm"
                      render={<Link href={`/admin/about/milestones/${milestone._id}`} />}
                    >
                      Edit
                    </Button>
                    <AboutDeleteButton
                      id={milestone._id}
                      label={`${milestone.year} ${milestone.title}`}
                      action={deleteMilestoneAction}
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
