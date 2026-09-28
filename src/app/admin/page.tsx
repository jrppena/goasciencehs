import type { Metadata } from "next"

import { requireAdmin } from "@/lib/auth/require-admin"
import { Button } from "@/components/ui/button"
import { signOutAction } from "./actions"

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  const admin = await requireAdmin()

  return (
    <div className="page-gutter flex min-h-[70svh] flex-col items-start justify-center gap-md py-xl">
      <h1 className="font-display text-headline-lg text-primary">Admin</h1>
      <p className="text-body-md text-muted-foreground">
        Signed in as {admin.email}.
      </p>
      <form action={signOutAction}>
        <Button type="submit" variant="secondary">
          Sign out
        </Button>
      </form>
    </div>
  )
}
