import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

const transition = [
  {
    year: "SY 2026–2027",
    title: "Grade 11 starts the strengthened curriculum",
    body: "Incoming Grade 11 learners enrol under the Academic Track with five core subjects and elective clusters. There is no strand to choose at enrolment.",
  },
  {
    year: "SY 2026–2027",
    title: "Grade 12 finishes the old curriculum",
    body: "Learners already in Grade 12 stay on the strand they began under — STEM, ABM, or HUMSS — and graduate under it. Their subject load does not change.",
  },
  {
    year: "SY 2027–2028",
    title: "Both year levels on one curriculum",
    body: "The last strand cohort has graduated and Grades 11 and 12 both run the strengthened curriculum end to end.",
  },
]

/** Explains the DepEd change, because families arrive expecting strands. */
function CurriculumShift() {
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
