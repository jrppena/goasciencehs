import { getCurriculumShiftSteps } from "@/lib/db/content"
import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

/** Explains the DepEd change, because families arrive expecting strands. */
async function CurriculumShift() {
  const transition = await getCurriculumShiftSteps()
  if (transition.length === 0) return null

  return (
    <Section
      eyebrow="What Changed"
      title="Strands are gone"
      description="The Department of Education replaced the four senior high tracks with two — Academic and Technical-Professional — and dropped strands in favour of elective clusters. GSHS offers the Academic Track. The change reaches each year level on its own schedule."
    >
      <RevealGroup as="ol" className="flex flex-col">
        {transition.map((step) => (
          <RevealItem
            as="li"
            key={step.title}
            className="grid gap-xs border-l-4 border-primary py-md pl-md md:grid-cols-[10rem_1fr] md:gap-md"
          >
            <span className="font-mono text-label-md uppercase text-primary">
              {step.year}
            </span>
            <div className="flex flex-col gap-xs">
              <h3 className="text-headline-md">{step.title}</h3>
              <p className="text-body-md text-muted-foreground">{step.body}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

export { CurriculumShift }
