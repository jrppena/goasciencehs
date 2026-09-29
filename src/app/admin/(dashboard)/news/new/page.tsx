import type { Metadata } from "next"

import { GuardedLink } from "@/components/admin/navigation-guard"
import { NewsForm } from "../news-form"

export const metadata: Metadata = {
  title: "New post",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default function NewNewsPage() {
  return (
    <div className="flex flex-col gap-lg">
      <header className="flex flex-col gap-xs">
        <GuardedLink
          href="/admin/news"
          className="font-mono text-label-md uppercase text-muted-foreground hover:text-primary"
        >
          ← News
        </GuardedLink>
        <h1 className="font-display text-headline-lg uppercase text-primary">
          New post
        </h1>
      </header>
      <NewsForm defaultPublishedOn={new Date().toISOString().slice(0, 10)} />
    </div>
  )
}
