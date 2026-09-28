import { getVisibleFaculty } from "@/lib/db/content"
import { Badge } from "@/components/ui/badge"

/** Compact page header, matching the About page's. */
async function FacultyHero() {
  const teacherCount = (await getVisibleFaculty("teaching")).length

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
            Faculty and Staff
          </Badge>
        </div>
        <div>
          <h1 className="text-headline-lg-mobile uppercase md:text-headline-lg xl:text-display-lg">
            The people who run the school day
          </h1>
        </div>
        <div>
          <p className="text-body-lg text-primary-fixed">
            {teacherCount} teachers carry the special science curriculum
            across Grades 7 to 12 — advisory classes, laboratory work, and the
            research programme that ends each learner&rsquo;s stay here.
          </p>
        </div>
      </div>
    </section>
  )
}

export { FacultyHero }
