import { Badge } from "@/components/ui/badge"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

/** Page header for Grades 7 to 10. Names the program before any detail. */
function JhsHero() {
  return (
    <section className="relative overflow-hidden bg-primary text-on-primary">
      <div
        aria-hidden="true"
        className="speed-lines-bold speed-lines-drift-bold absolute inset-0 opacity-10"
      />
      <RevealGroup className="page-gutter relative flex max-w-3xl flex-col gap-md py-xl">
        <RevealItem>
          <Badge variant="active" className="w-fit">
            Grades 7 to 10
          </Badge>
        </RevealItem>
        <RevealItem>
          <h1 className="text-headline-lg-mobile uppercase md:text-headline-lg xl:text-display-lg">
            Junior High School
          </h1>
        </RevealItem>
        <RevealItem>
          <p className="text-body-lg text-primary-fixed">
            Four years of the Department of Education&apos;s MATATAG curriculum,
            carried on a special science load. Learners take the eight national
            learning areas, then add enriched science and mathematics and a
            Research subject that runs from Grade 7 to Grade 10.
          </p>
        </RevealItem>
      </RevealGroup>
    </section>
  )
}

export { JhsHero }
