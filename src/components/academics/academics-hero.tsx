import { Badge } from "@/components/ui/badge"

/** Page header for the academics overview. Names the page before the two programs below it. */
function AcademicsHero() {
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
            Grades 7 to 12
          </Badge>
        </div>
        <div>
          <h1 className="text-headline-lg-mobile uppercase md:text-headline-lg xl:text-display-lg">
            Academics
          </h1>
        </div>
        <div>
          <p className="text-body-lg text-primary-fixed">
            A special science curriculum runs across all six years, from
            Junior High School in Grades 7 to 10 through Senior High School in
            Grades 11 and 12.
          </p>
        </div>
      </div>
    </section>
  )
}

export { AcademicsHero }
