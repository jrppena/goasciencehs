import type { Metadata } from "next"
import Link from "next/link"

import { getAdminElectiveClusters } from "@/lib/db/admin"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AcademicsDeleteButton } from "../delete-button"
import { deleteElectiveClusterAction } from "./actions"

export const metadata: Metadata = {
  title: "Elective clusters",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function AdminElectiveClustersPage() {
  const clusters = await getAdminElectiveClusters()

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
            Elective clusters
          </h1>
        </div>
        <Button render={<Link href="/admin/academics/elective-clusters/new" />}>
          New elective cluster
        </Button>
      </header>

      {clusters.length === 0 ? (
        <Card className="px-md">
          <p className="text-body-md text-muted-foreground">
            No elective clusters yet.
          </p>
        </Card>
      ) : (
        <ul className="flex flex-col gap-sm">
          {clusters.map((cluster) => (
            <li key={cluster._id}>
              <Card className="px-md">
                <div className="flex flex-wrap items-center justify-between gap-md">
                  <div className="flex min-w-0 flex-col gap-xs">
                    <Link
                      href={`/admin/academics/elective-clusters/${cluster._id}`}
                      className="font-display text-body-lg text-primary hover:underline"
                    >
                      {cluster.name}
                    </Link>
                    <p className="max-w-[48rem] truncate text-body-md text-muted-foreground">
                      {cluster.summary}
                    </p>
                    <span className="font-mono text-label-md text-muted-foreground">
                      {cluster.tone} · order {cluster.order}
                    </span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <Button
                      variant="outline"
                      size="sm"
                      render={
                        <Link
                          href={`/admin/academics/elective-clusters/${cluster._id}`}
                        />
                      }
                    >
                      Edit
                    </Button>
                    <AcademicsDeleteButton
                      id={cluster._id}
                      label={cluster.name}
                      action={deleteElectiveClusterAction}
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
