import { PageHero } from "@/components/layout/page-hero"

/** Page header for the news index. Mirrors the About hero's rhythm. */
function NewsHero() {
  return (
    <PageHero
      badge="News and Announcements"
      title="What is happening on campus"
      lead="Campus bulletins, admission advisories, and student features from Goa Science High School. Official notices are also posted at the school gate and on the school's Facebook page."
    />
  )
}

export { NewsHero }
