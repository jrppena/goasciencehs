import { getMilestones } from "@/lib/db/content"
import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

async function Milestones() {
  const milestones = await getMilestones()
  if (milestones.length === 0) return null

  return (
    <Section
      eyebrow="History"
      title="Milestones"
      description="How the school got from a rented building on Belen Street to six year levels of its own."
      className="bg-surface-container-low"
    >
      <RevealGroup as="ol" className="flex flex-col">
        {milestones.map((milestone) => (
          <RevealItem
            as="li"
            key={milestone.year}
            className="grid gap-xs border-l-4 border-primary py-md pl-md md:grid-cols-[8rem_1fr] md:gap-md"
          >
            <span className="font-mono text-label-md uppercase text-primary">
              {milestone.year}
            </span>
            <div className="flex flex-col gap-xs">
              <h3 className="text-headline-md">{milestone.title}</h3>
              <p className="text-body-md text-muted-foreground">
                {milestone.body}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

export { Milestones }
