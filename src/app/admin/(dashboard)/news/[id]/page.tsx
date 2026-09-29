import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getAdminNewsById } from "@/lib/db/admin"
import { GuardedLink } from "@/components/admin/navigation-guard"
import { NewsForm } from "../news-form"

export const metadata: Metadata = {
  title: "Edit post",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function EditNewsPage({
  params,
}: PageProps<"/admin/news/[id]">) {
  const post = await getAdminNewsById((await params).id)
  if (!post) notFound()

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
          Edit post
        </h1>
        <p className="font-display text-body-lg">{post.title}</p>
      </header>
      <NewsForm post={post} defaultPublishedOn={post.publishedOn} />
    </div>
  )
}
