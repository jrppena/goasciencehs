import { getMatatagSteps } from "@/lib/db/content"
import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

/** Explains the DepEd phase-in, because families ask which one their child is on. */
async function MatatagRollout() {
  const rollout = await getMatatagSteps()
  if (rollout.length === 0) return null

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
