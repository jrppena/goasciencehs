import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

const rollout = [
  {
    year: "SY 2024–2025",
    title: "Grade 7 moves first",
    body: "The MATATAG curriculum reached junior high with Grade 7, alongside Kindergarten and Grades 1 and 4. Fewer learning competencies per subject, more time on each.",
  },
  {
    year: "SY 2025–2026",
    title: "Grade 8 follows",
    body: "The Grade 7 cohort carries the new curriculum upward while Grade 8 shifts onto it, together with Grades 2, 3, and 5.",
  },
  {
    year: "SY 2026–2027",
    title: "Grades 9 and 10 complete the phase",
    body: "The last two junior high year levels move over with Grade 6. From this year, all of Grades 7 to 10 run one curriculum end to end.",
  },
]

/** Explains the DepEd phase-in, because families ask which one their child is on. */
function MatatagRollout() {
  return (
    <Section
      eyebrow="What Changed"
      title="The MATATAG phase-in"
      description="The Department of Education rewrote the K to 10 curriculum and released it one set of year levels at a time. Junior high reached the end of that schedule in School Year 2026–2027."
    >
      <RevealGroup as="ol" className="flex flex-col">
        {rollout.map((step) => (
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

export { MatatagRollout }
