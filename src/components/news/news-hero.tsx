import { Badge } from "@/components/ui/badge"

/** Page header for the news index. Mirrors the About hero's rhythm. */
function NewsHero() {
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
            News and Announcements
          </Badge>
        </div>
        <div>
          <h1 className="text-headline-lg-mobile uppercase md:text-headline-lg xl:text-display-lg">
            What is happening on campus
          </h1>
        </div>
        <div>
          <p className="text-body-lg text-primary-fixed">
            Campus bulletins, admission advisories, and student features from Goa
            Science High School. Official notices are also posted at the school
            gate and on the school&apos;s Facebook page.
          </p>
        </div>
      </div>
    </section>
  )
}

export { NewsHero }
