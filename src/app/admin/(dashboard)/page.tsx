import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { getAdminCounts } from "@/lib/db/admin"
import { formatNewsDate } from "@/lib/news"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const counts = await getAdminCounts()
  const { latestAdvisory } = counts.news

  const summaries = [
    {
      title: "News",
      href: "/admin/news",
      detail: `${counts.news.published} published · ${counts.news.drafts} ${
        counts.news.drafts === 1 ? "draft" : "drafts"
      }`,
    },
    {
      title: "Faculty",
      href: "/admin/faculty",
      detail: `${counts.faculty.visible} visible of ${counts.faculty.total}`,
    },
    {
      title: "Testimonials",
      href: "/admin/testimonials",
      detail: `${counts.testimonials.visible} visible of ${counts.testimonials.total}`,
    },
    {
      title: "About content",
      href: "/admin/about",
      detail: `${counts.about.entries} entries${
        counts.about.story ? "" : " · story missing"
      }`,
    },
    {
      title: "Academics",
      href: "/admin/academics",
      detail: `${counts.academics.entries} entries across 6 lists`,
    },
    {
      title: "Site settings",
      href: "/admin/settings",
      detail: counts.settings.stored ? "Saved" : "Not seeded yet",
    },
  ]

  return (
    <div className="flex flex-col gap-lg">
      <header className="flex flex-col gap-xs">
        <h1 className="font-display text-headline-lg uppercase text-primary">
          Dashboard
        </h1>
        <p className="text-body-md text-muted-foreground">
          Manage what the public site shows.
        </p>
      </header>

      {latestAdvisory ? (
        <section className="flex flex-col gap-sm">
          <h2 className="font-display text-headline-md uppercase text-primary">
            Latest advisory
          </h2>
          <Card stripe="top">
            <CardHeader>
              <CardTitle>
                <Link
                  href={`/admin/news/${latestAdvisory.id}`}
                  className="hover:underline"
                >
                  {latestAdvisory.title}
                </Link>
              </CardTitle>
              <CardDescription className="flex flex-wrap items-center gap-xs">
                <span>{formatNewsDate(latestAdvisory.publishedOn)}</span>
                <Badge
                  variant={latestAdvisory.isPublished ? "primary" : "default"}
                >
                  {latestAdvisory.isPublished ? "Published" : "Draft"}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                size="sm"
                render={<Link href={`/admin/news/${latestAdvisory.id}`} />}
              >
                Open advisory
                <ArrowRightIcon />
              </Button>
            </CardContent>
          </Card>
        </section>
      ) : null}

      <div className="grid gap-md sm:grid-cols-2 lg:grid-cols-3">
        {summaries.map((summary) => (
          <Card key={summary.href}>
            <CardHeader>
              <CardTitle>{summary.title}</CardTitle>
              <CardDescription>{summary.detail}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                size="sm"
                render={<Link href={summary.href} />}
              >
                Manage {summary.title.toLowerCase()}
                <ArrowRightIcon />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
