import Link from "next/link"

import { Section } from "@/components/home/section"
import { Button } from "@/components/ui/button"

/** Entry requirements for Grade 7, which is the only open intake year. */
function Admission() {
  return (
    <Section
      eyebrow="Getting In"
      title="Entry at Grade 7"
      description="Admission criteria and requirements for the coming school year are awaiting confirmation from the school. Check with the registrar or the latest Admissions news before assuming a detail carried over from a prior year."
      className="bg-surface-container-low"
    >
      <div className="flex flex-wrap gap-sm">
        <Button render={<Link href="/faculty-and-staff#front-office" />}>
          Talk to the Registrar
        </Button>
        <Button
          variant="outline"
          render={
            <Link href="/about/news-and-announcements?category=Admissions" />
          }
        >
          Admissions News
        </Button>
      </div>
    </Section>
  )
}

export { Admission }
