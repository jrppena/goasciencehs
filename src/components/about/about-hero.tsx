import { site } from "@/lib/site"
import { Badge } from "@/components/ui/badge"

/** Compact page header. Orients the reader before the long-form sections. */
function AboutHero() {
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
            About GSHS
          </Badge>
        </div>
        <div>
          <h1 className="text-headline-lg-mobile uppercase md:text-headline-lg xl:text-display-lg">
            A young science school built for Bicolano learners
          </h1>
        </div>
        <div>
          <p className="text-body-lg text-primary-fixed">
            {site.name} is a public secondary school in Goa, Camarines Sur,
            offering a special science curriculum for Grades 7 to 12.
            Established in 2015 and on its own campus since 2017, it is a young
            school with a plain purpose: keep a rigorous science education
            within reach of the learners of Goa and its neighbouring towns.
          </p>
        </div>
      </div>
    </section>
  )
}

export { AboutHero }
