import Link from "next/link"

import { Section } from "@/components/home/section"
import { Button } from "@/components/ui/button"

/** Entry requirements for junior high intake, which opens at Grade 7. */
function Admission() {
  return (
    <Section
      id="admission"
      eyebrow="Getting In"
      title="Entry at Grade 7"
      description="Admission criteria and requirements for the coming school year are awaiting confirmation from the school. Check with the registrar or the latest Admissions news before assuming a detail carried over from a prior year."
      className="scroll-mt-20 bg-surface-container-low"
    >
      <div className="flex flex-wrap gap-sm">
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
