import type { Metadata } from "next"
import Link from "next/link"

import { getAdminLearningAreas } from "@/lib/db/admin"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AcademicsDeleteButton } from "../delete-button"
import { deleteLearningAreaAction } from "./actions"

export const metadata: Metadata = {
  title: "Learning areas",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function AdminLearningAreasPage() {
  const areas = await getAdminLearningAreas()

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
            Learning areas
          </h1>
        </div>
        <Button render={<Link href="/admin/academics/learning-areas/new" />}>
          New learning area
        </Button>
      </header>

      {areas.length === 0 ? (
        <Card className="px-md">
          <p className="text-body-md text-muted-foreground">
            No learning areas yet.
          </p>
        </Card>
      ) : (
        <ul className="flex flex-col gap-sm">
          {areas.map((area) => (
            <li key={area._id}>
              <Card className="px-md">
                <div className="flex flex-wrap items-center justify-between gap-md">
                  <div className="flex min-w-0 flex-col gap-xs">
                    <Link
                      href={`/admin/academics/learning-areas/${area._id}`}
                      className="font-display text-body-lg text-primary hover:underline"
                    >
                      {area.name}
                    </Link>
                    <p className="max-w-[48rem] truncate text-body-md text-muted-foreground">
                      {area.body}
                    </p>
                    <span className="font-mono text-label-md text-muted-foreground">
                      order {area.order}
                    </span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <Button
                      variant="outline"
                      size="sm"
                      render={
                        <Link href={`/admin/academics/learning-areas/${area._id}`} />
                      }
                    >
                      Edit
                    </Button>
                    <AcademicsDeleteButton
                      id={area._id}
                      label={area.name}
                      action={deleteLearningAreaAction}
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
