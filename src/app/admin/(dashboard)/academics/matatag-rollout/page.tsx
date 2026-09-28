import type { Metadata } from "next"
import Link from "next/link"

import { getAdminMatatagSteps } from "@/lib/db/admin"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AcademicsDeleteButton } from "../delete-button"
import { deleteMatatagStepAction } from "./actions"

export const metadata: Metadata = {
  title: "MATATAG rollout",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function AdminMatatagRolloutPage() {
  const steps = await getAdminMatatagSteps()

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
            MATATAG rollout
          </h1>
        </div>
        <Button render={<Link href="/admin/academics/matatag-rollout/new" />}>
          New MATATAG step
        </Button>
      </header>

      {steps.length === 0 ? (
        <Card className="px-md">
          <p className="text-body-md text-muted-foreground">
            No MATATAG steps yet.
          </p>
        </Card>
      ) : (
        <ul className="flex flex-col gap-sm">
          {steps.map((step) => (
            <li key={step._id}>
              <Card className="px-md">
                <div className="flex flex-wrap items-center justify-between gap-md">
                  <div className="flex min-w-0 flex-col gap-xs">
                    <Link
                      href={`/admin/academics/matatag-rollout/${step._id}`}
                      className="font-display text-body-lg text-primary hover:underline"
                    >
                      {step.title}
                    </Link>
                    <p className="max-w-[48rem] truncate text-body-md text-muted-foreground">
                      {step.body}
                    </p>
                    <span className="font-mono text-label-md text-muted-foreground">
                      {step.year} · order {step.order}
                    </span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <Button
                      variant="outline"
                      size="sm"
                      render={
                        <Link href={`/admin/academics/matatag-rollout/${step._id}`} />
                      }
                    >
                      Edit
                    </Button>
                    <AcademicsDeleteButton
                      id={step._id}
                      label={step.title}
                      action={deleteMatatagStepAction}
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
