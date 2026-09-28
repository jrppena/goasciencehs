import { getVisibleFaculty } from "@/lib/db/content"
import { PageHero } from "@/components/layout/page-hero"

/** Compact page header, matching the About page's. */
async function FacultyHero() {
  const teacherCount = (await getVisibleFaculty("teaching")).length

  return (
    <PageHero
      badge="Faculty and Staff"
      title="The people who run the school day"
      lead={`${teacherCount} teachers carry the special science curriculum across Grades 7 to 12 — advisory classes, laboratory work, and the research programme that ends each learner’s stay here.`}
    />
  )
}

export { FacultyHero }
