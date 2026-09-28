import type { Metadata } from "next"
import Link from "next/link"

import { getAdminNews } from "@/lib/db/admin"
import { formatNewsDate } from "@/lib/news"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DeleteNewsButton } from "./delete-news-button"
import { setFeaturedAction, setPublishedAction } from "./actions"

export const metadata: Metadata = {
  title: "News",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function AdminNewsPage() {
  const posts = await getAdminNews()

  return (
    <div className="flex flex-col gap-lg">
      <header className="flex flex-wrap items-end justify-between gap-md">
        <div className="flex flex-col gap-xs">
          <h1 className="font-display text-headline-lg uppercase text-primary">
            News
          </h1>
          <p className="text-body-md text-muted-foreground">
            Publish advisories and bulletins. Drafts stay hidden from the public
            site.
          </p>
        </div>
        <Button render={<Link href="/admin/news/new" />}>New post</Button>
      </header>

      {posts.length === 0 ? (
        <Card className="px-md">
          <p className="text-body-md text-muted-foreground">
            No posts yet. Create the first one.
          </p>
        </Card>
      ) : (
        <ul className="flex flex-col gap-sm">
          {posts.map((post) => (
            <li key={post._id}>
              <Card className="px-md">
                <div className="flex flex-wrap items-center justify-between gap-md">
                  <div className="flex min-w-0 flex-col gap-xs">
                    <Link
                      href={`/admin/news/${post._id}`}
                      className="truncate font-display text-body-lg text-primary hover:underline"
                    >
                      {post.title}
                    </Link>
                    <div className="flex flex-wrap items-center gap-xs">
                      <Badge variant={post.isPublished ? "primary" : "outline"}>
                        {post.isPublished ? "Published" : "Draft"}
                      </Badge>
                      {post.isFeatured ? (
                        <Badge variant="active">Featured</Badge>
                      ) : null}
                      <span className="font-mono text-label-md text-muted-foreground">
                        {post.category} · {formatNewsDate(post.publishedOn)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-xs">
                    <form
                      action={setPublishedAction.bind(
                        null,
                        post._id,
                        !post.isPublished
                      )}
                    >
                      <Button type="submit" variant="ghost" size="sm">
                        {post.isPublished ? "Unpublish" : "Publish"}
                      </Button>
                    </form>
                    <form
                      action={setFeaturedAction.bind(
                        null,
                        post._id,
                        !post.isFeatured
                      )}
                    >
                      <Button type="submit" variant="ghost" size="sm">
                        {post.isFeatured ? "Unfeature" : "Feature"}
                      </Button>
                    </form>
                    <Button
                      variant="outline"
                      size="sm"
                      render={<Link href={`/admin/news/${post._id}`} />}
                    >
                      Edit
                    </Button>
                    <DeleteNewsButton id={post._id} title={post.title} />
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
