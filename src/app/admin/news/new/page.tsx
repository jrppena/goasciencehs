import type { Metadata } from "next"

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
      <h1 className="font-display text-headline-lg uppercase text-primary">
        New post
      </h1>
      <NewsForm defaultPublishedOn={new Date().toISOString().slice(0, 10)} />
    </div>
  )
}
