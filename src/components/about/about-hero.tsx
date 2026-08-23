import { site } from "@/lib/site"
import { Badge } from "@/components/ui/badge"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

/** Compact page header. Orients the reader before the long-form sections. */
function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-primary text-on-primary">
      <div
        aria-hidden="true"
        className="speed-lines-bold speed-lines-drift-bold absolute inset-0 opacity-10"
      />
      <RevealGroup className="page-gutter relative flex max-w-3xl flex-col gap-md py-xl">
        <RevealItem>
          <Badge variant="active" className="w-fit">
            About GSHS
          </Badge>
        </RevealItem>
        <RevealItem>
          <h1 className="text-headline-lg-mobile uppercase md:text-headline-lg xl:text-display-lg">
            A young science school built for Bicolano learners
          </h1>
        </RevealItem>
        <RevealItem>
          <p className="text-body-lg text-primary-fixed">
            {site.name} is a public secondary school in Goa, Camarines Sur,
            offering a special science curriculum for Grades 7 to 12.
            Established in 2015 and on its own campus since 2017, it is a young
            school with a plain purpose: keep a rigorous science education
            within reach of the learners of Goa and its neighbouring towns.
          </p>
        </RevealItem>
      </RevealGroup>
    </section>
  )
}

export { AboutHero }
