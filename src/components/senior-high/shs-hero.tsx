import { Badge } from "@/components/ui/badge"

/** Page header for Grades 11 and 12. Names the track before any detail. */
function ShsHero() {
  return (
    <section className="relative overflow-hidden bg-primary text-on-primary">
      <div
        aria-hidden="true"
        className="speed-lines-bold speed-lines-drift-bold absolute inset-0 opacity-10"
      />
      {/* Above the fold: no reveal wrappers, so there's no server-rendered
          opacity:0 blocking the header before JS hydrates. */}
      <div className="page-gutter relative flex max-w-3xl flex-col gap-md py-xl">
        <div>
          <Badge variant="active" className="w-fit">
            Grades 11 and 12
          </Badge>
        </div>
        <div>
          <h1 className="text-headline-lg-mobile uppercase md:text-headline-lg xl:text-display-lg">
            Senior High School
          </h1>
        </div>
        <div>
          <p className="text-body-lg text-primary-fixed">
            Goa Science High School offers the Academic Track of the Strengthened
            Senior High School curriculum. Every learner carries the same five
            core subjects, then builds an elective load from the three clusters
            the school runs — STEM, Business and Entrepreneurship, and Field
            Experience.
          </p>
        </div>
      </div>
    </section>
  )
}

export { ShsHero }
