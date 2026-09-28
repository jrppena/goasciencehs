import Image from "next/image"
import Link from "next/link"

import { requireAdmin } from "@/lib/auth/require-admin"
import { AdminNav } from "@/components/admin/admin-nav"
import { Button } from "@/components/ui/button"
import { signOutAction } from "@/app/admin/actions"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await requireAdmin()

  return (
    <div className="flex min-h-svh flex-col bg-surface-container-low">
      <header className="border-b bg-card">
        <div className="flex h-16 items-center justify-between gap-md px-md">
          <Link href="/admin" className="flex items-center gap-sm">
            <Image
              src="/gshs-logo-transparent.png"
              alt=""
              width={447}
              height={447}
              className="size-9 shrink-0"
            />
            <span className="font-display text-body-lg whitespace-nowrap uppercase text-primary">
              GSHS Admin
            </span>
          </Link>

          <div className="flex items-center gap-xs">
            <span className="hidden font-mono text-label-md uppercase text-muted-foreground lg:block">
              {admin.email}
            </span>
            <Button
              variant="ghost"
              size="sm"
              render={<Link href="/" target="_blank" rel="noreferrer" />}
            >
              View site
            </Button>
            <form action={signOutAction}>
              <Button type="submit" variant="outline" size="sm">
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="border-b bg-card md:w-56 md:shrink-0 md:border-r md:border-b-0">
          <AdminNav />
        </aside>
        <main id="main" className="flex-1 px-md py-lg md:px-lg">
          {children}
        </main>
      </div>
    </div>
  )
}
