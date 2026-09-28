import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/motion/page-transition"
import { PublicShell } from "@/components/layout/public-shell"

const destinations = [
  { label: "Home", href: "/" },
  { label: "Junior High School", href: "/academics/junior-high-school" },
  { label: "Senior High School", href: "/academics/senior-high-school" },
  {
    label: "News and Announcements",
    href: "/about/news-and-announcements",
  },
  { label: "Front Office", href: "/faculty-and-staff#front-office" },
]

export default function NotFound() {
  return (
    <PublicShell>
      <PageTransition>
        <section className="page-gutter flex flex-col gap-md py-xl">
          <div className="flex flex-col gap-xs">
            <span className="font-mono text-label-md uppercase text-primary">
              Error 404
            </span>
            <h1 className="text-headline-lg-mobile uppercase md:text-headline-lg">
              We couldn&apos;t find that page
            </h1>
            <p className="max-w-2xl text-body-lg text-muted-foreground">
              The page you were looking for doesn&apos;t exist, may have moved,
              or the link may be out of date. Try one of these instead.
            </p>
          </div>
          <ul className="flex flex-col gap-sm">
            {destinations.map((destination) => (
              <li key={destination.href}>
                <Button
                  variant="outline"
                  className="w-fit"
                  render={<Link href={destination.href} />}
                >
                  {destination.label}
                  <ArrowRightIcon />
                </Button>
              </li>
            ))}
          </ul>
        </section>
      </PageTransition>
    </PublicShell>
  )
}
