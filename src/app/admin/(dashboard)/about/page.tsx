import type { Metadata } from "next"
import Link from "next/link"

import {
  getAdminCoreValues,
  getAdminMilestones,
  getAdminMissionVision,
} from "@/lib/db/admin"
import { getAboutStory } from "@/lib/db/content"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About content",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function AdminAboutPage() {
  const [values, milestones, statements, story] = await Promise.all([
    getAdminCoreValues(),
    getAdminMilestones(),
    getAdminMissionVision(),
    getAboutStory(),
  ])

  const sections = [
    {
      title: "Core values",
      href: "/admin/about/core-values",
      detail: `${values.length} entries`,
    },
    {
      title: "Milestones",
      href: "/admin/about/milestones",
      detail: `${milestones.length} entries`,
    },
    {
      title: "Mission and vision",
      href: "/admin/about/mission-vision",
      detail: `${statements.length} statements`,
    },
    {
      title: "Our Story",
      href: "/admin/about/story",
      detail: story.heading,
    },
  ]

  return (
    <div className="flex flex-col gap-lg">
      <header className="flex flex-col gap-xs">
        <h1 className="font-display text-headline-lg uppercase text-primary">
          About content
        </h1>
        <p className="text-body-md text-muted-foreground">
          The lists and prose that make up the About page.
        </p>
      </header>

      <div className="grid gap-md sm:grid-cols-2 lg:grid-cols-4">
        {sections.map((section) => (
          <Card key={section.href}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.detail}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                size="sm"
                render={<Link href={section.href} />}
              >
                Manage
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
