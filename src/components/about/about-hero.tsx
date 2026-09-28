import { getSiteSettings } from "@/lib/db/content"
import { PageHero } from "@/components/layout/page-hero"

/** Compact page header. Orients the reader before the long-form sections. */
async function AboutHero() {
  const site = await getSiteSettings()

  return (
    <PageHero
      badge="About GSHS"
      title="A young science school built for Bicolano learners"
      lead={`${site.name} is a public secondary school in Goa, Camarines Sur, offering a special science curriculum for Grades 7 to 12. Established in 2015 and on its own campus since 2017, it is a young school with a plain purpose: keep a rigorous science education within reach of the learners of Goa and its neighbouring towns.`}
    />
  )
}

export { AboutHero }
