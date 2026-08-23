import { Badge } from "@/components/ui/badge"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

/** Page header for the news index. Mirrors the About hero's rhythm. */
function NewsHero() {
  return (
    <section className="relative overflow-hidden bg-primary text-on-primary">
      <div
        aria-hidden="true"
        className="speed-lines-bold speed-lines-drift-bold absolute inset-0 opacity-10"
      />
      <RevealGroup className="page-gutter relative flex max-w-3xl flex-col gap-md py-xl">
        <RevealItem>
          <Badge variant="active" className="w-fit">
            News and Announcements
          </Badge>
        </RevealItem>
        <RevealItem>
          <h1 className="text-headline-lg-mobile uppercase md:text-headline-lg xl:text-display-lg">
            What is happening on campus
          </h1>
        </RevealItem>
        <RevealItem>
          <p className="text-body-lg text-primary-fixed">
            Campus bulletins, admission advisories, and student features from Goa
            Science High School. Official notices are also posted at the school
            gate and on the school&apos;s Facebook page.
          </p>
        </RevealItem>
      </RevealGroup>
    </section>
  )
}

export { NewsHero }
