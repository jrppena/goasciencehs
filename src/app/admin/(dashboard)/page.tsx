import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { getAdminCounts } from "@/lib/db/admin"
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

export default async function AdminPage() {
  const counts = await getAdminCounts()

  const summaries = [
    {
      title: "News",
      href: "/admin/news",
      detail: `${counts.news.published} published of ${counts.news.total}`,
    },
    {
      title: "Faculty",
      href: "/admin/faculty",
      detail: `${counts.faculty.visible} visible of ${counts.faculty.total}`,
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
