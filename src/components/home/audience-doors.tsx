import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const doors = [
  {
    title: "Admissions",
    href: "/academics/junior-high-school#admission",
    description: "Entry at Grade 7 and Grade 11, and how to reach the registrar.",
  },
  {
    title: "Advisories",
    href: "/about/news-and-announcements?category=Advisory",
    description: "Official, signed notices from the school.",
  },
  {
    title: "News",
    href: "/about/news-and-announcements",
    description: "Campus news, achievements, and announcements.",
  },
  {
    title: "Academics",
    href: "/academics",
    description: "Junior High, Grades 7 to 10, and Senior High, Grades 11 and 12.",
  },
]

/** Four entry points into the site, above the fold, for a visitor who already
 * knows what they came for. */
function AudienceDoors() {
  return (
    <nav aria-label="Start here" className="page-gutter py-lg">
      <ul className="grid gap-sm sm:grid-cols-2 lg:grid-cols-4">
        {doors.map((door) => (
          <li key={door.title}>
            <Card size="sm" stripe="none" interactive className="relative h-full">
              <CardHeader>
                <CardTitle>
                  <Link
                    href={door.href}
                    className="after:absolute after:inset-0 transition-colors hover:text-primary focus-visible:outline-none"
                  >
                    {door.title}
                  </Link>
                </CardTitle>
                <CardDescription className="flex items-center justify-between gap-xs">
                  {door.description}
                  <ArrowRightIcon aria-hidden="true" className="shrink-0" />
                </CardDescription>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export { AudienceDoors }
