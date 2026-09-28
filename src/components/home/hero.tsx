import Image from "next/image"
import Link from "next/link"

import { getSiteSettings } from "@/lib/db/content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

async function Hero() {
  const site = await getSiteSettings()

  return (
    <section className="relative isolate overflow-hidden bg-primary text-on-primary">
      <Image
        src="/gshs-landing.jpg"
        alt="Coconut palms and classroom buildings across the Goa Science High School grounds"
        fill
        sizes="100vw"
        preload
        className="-z-20 object-cover"
      />

      {/* Brand scrim, only as heavy as the copy needs. Vertical on narrow
          screens where the text sits over the whole frame; horizontal once
          there is room for the photo beside it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-primary/90 from-35% via-primary/65 via-70% to-primary/25 lg:bg-linear-to-r lg:from-primary lg:from-15% lg:via-primary/70 lg:via-50% lg:to-primary/5"
      />

      {/* Above the fold: no reveal wrappers. Motion server-renders
          `initial` inline (opacity:0), so a RevealGroup/RevealItem here
          would leave the hero blank until JS hydrates. */}
      <div className="page-gutter relative flex min-h-[32rem] max-w-3xl flex-col justify-center gap-md py-xl">
        <div>
          <Badge variant="active" className="w-fit whitespace-normal">
            Admissions open for S.Y. 2026–2027
          </Badge>
        </div>
        <div>
          <h1 className="text-headline-lg-mobile uppercase md:text-headline-lg xl:text-display-lg">
            Science, discipline, and a place to belong
          </h1>
        </div>
        <div>
          <p className="text-body-lg text-primary-fixed">
            {site.tagline} {site.name} prepares Grades 7 to 12 learners of Goa,
            Camarines Sur for research, competition, and the university of their
            choice.
          </p>
        </div>
        <div className="flex flex-wrap gap-sm pt-base">
          <Button
            size="lg"
            variant="accent"
            render={<Link href="/academics/junior-high-school" />}
          >
            Explore Academics
          </Button>
          <Button
            size="lg"
            className="border-2 border-on-primary bg-transparent transition-colors hover:bg-on-primary hover:text-primary"
            render={<Link href="/about" />}
          >
            About GSHS
          </Button>
        </div>
      </div>
    </section>
  )
}

export { Hero }
