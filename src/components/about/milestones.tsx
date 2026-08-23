import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

const milestones = [
  {
    year: "2015",
    title: "The school is established",
    body: "Local stakeholders open GSHS so learners who miss the Philippine Science High School cut-off can still take a science curriculum without leaving Goa. Classes begin in a temporary campus at the ABC Building along Belen Street.",
  },
  {
    year: "2017",
    title: "Relocation to the permanent campus",
    body: "The school moves to its own grounds in Tagongtong, Goa — room at last for dedicated laboratories and a full six year levels.",
  },
  {
    year: "2026",
    title: "Six year levels on one campus",
    body: "Junior high and senior high now run at Tagongtong, from Grade 7 through Grade 12.",
  },
]

function Milestones() {
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
