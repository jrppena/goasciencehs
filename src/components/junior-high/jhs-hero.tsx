import { Badge } from "@/components/ui/badge"

/** Page header for Grades 7 to 10. Names the program before any detail. */
function JhsHero() {
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
            Grades 7 to 10
          </Badge>
        </div>
        <div>
          <h1 className="text-headline-lg-mobile uppercase md:text-headline-lg xl:text-display-lg">
            Junior High School
          </h1>
        </div>
        <div>
          <p className="text-body-lg text-primary-fixed">
            Four years of the Department of Education&apos;s MATATAG curriculum,
            carried on a special science load. Learners take the eight national
            learning areas, then add enriched science and mathematics and a
            Research subject that runs from Grade 7 to Grade 10.
          </p>
        </div>
      </div>
    </section>
  )
}

export { JhsHero }
