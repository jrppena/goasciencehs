import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"

const pillars = [
  {
    title: "Learn",
    body: "Small sections, laboratory-first instruction, and teachers who stay after the bell. Coursework is graded on reasoning, not recall.",
  },
  {
    title: "Live",
    body: "Homerooms, student government, and a campus small enough that every learner is known by name. Values formation runs through all six year levels.",
  },
  {
    title: "Experience",
    body: "Regional science fairs, provincial athletic meets, and barangay outreach that puts classroom work in front of the community it serves.",
  },
]

function GshsWay() {
  return (
    <Section
      eyebrow="Campus Life"
      title="The GSHS way"
      description="What six years here actually looks like."
    >
      <RevealGroup className="grid gap-md lg:grid-cols-3">
        {pillars.map((pillar) => (
          <RevealItem as="article" key={pillar.title} className="flex flex-col gap-sm">
            <MediaPlaceholder className="aspect-[3/2]" />
            <h3 className="text-headline-md">{pillar.title}</h3>
            <p className="text-body-md text-muted-foreground">{pillar.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

export { GshsWay }
