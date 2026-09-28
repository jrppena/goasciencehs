import type { Metadata } from "next"
import Link from "next/link"

import { getAdminCoreValues } from "@/lib/db/admin"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AboutDeleteButton } from "../delete-button"
import { deleteCoreValueAction } from "./actions"

export const metadata: Metadata = {
  title: "Core values",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function AdminCoreValuesPage() {
  const values = await getAdminCoreValues()

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
            Core values
          </h1>
        </div>
        <Button render={<Link href="/admin/about/core-values/new" />}>
          New core value
        </Button>
      </header>

      {values.length === 0 ? (
        <Card className="px-md">
          <p className="text-body-md text-muted-foreground">
            No core values yet.
          </p>
        </Card>
      ) : (
        <ul className="flex flex-col gap-sm">
          {values.map((value) => (
            <li key={value._id}>
              <Card className="px-md">
                <div className="flex flex-wrap items-center justify-between gap-md">
                  <div className="flex min-w-0 flex-col gap-xs">
                    <Link
                      href={`/admin/about/core-values/${value._id}`}
                      className="font-display text-body-lg text-primary hover:underline"
                    >
                      {value.title}
                    </Link>
                    <p className="max-w-[48rem] truncate text-body-md text-muted-foreground">
                      {value.body}
                    </p>
                    <span className="font-mono text-label-md text-muted-foreground">
                      {value.icon} · order {value.order}
                    </span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <Button
                      variant="outline"
                      size="sm"
                      render={<Link href={`/admin/about/core-values/${value._id}`} />}
                    >
                      Edit
                    </Button>
                    <AboutDeleteButton
                      id={value._id}
                      label={value.title}
                      action={deleteCoreValueAction}
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
