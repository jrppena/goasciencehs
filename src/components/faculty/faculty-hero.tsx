import { facultyMembers } from "@/lib/faculty"
import { Badge } from "@/components/ui/badge"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

/** Compact page header, matching the About page's. */
function FacultyHero() {
  return (
    <section className="relative overflow-hidden bg-primary text-on-primary">
      <div
        aria-hidden="true"
        className="speed-lines-bold speed-lines-drift-bold absolute inset-0 opacity-10"
      />
      <RevealGroup className="page-gutter relative flex max-w-3xl flex-col gap-md py-xl">
        <RevealItem>
          <Badge variant="active" className="w-fit">
            Faculty and Staff
          </Badge>
        </RevealItem>
        <RevealItem>
          <h1 className="text-headline-lg-mobile uppercase md:text-headline-lg xl:text-display-lg">
            The people who run the school day
          </h1>
        </RevealItem>
        <RevealItem>
          <p className="text-body-lg text-primary-fixed">
            {facultyMembers.length} teachers carry the special science curriculum
            across Grades 7 to 12 — advisory classes, laboratory work, and the
            research programme that ends each learner&rsquo;s stay here.
          </p>
        </RevealItem>
      </RevealGroup>
    </section>
  )
}

export { FacultyHero }
