import { getLearningAreas } from "@/lib/db/content"
import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

/** The eight national learning areas, before the school's add-ons. */
async function LearningAreas() {
  const learningAreas = await getLearningAreas()
  if (learningAreas.length === 0) return null

  return (
    <Section
      eyebrow="Taken by everyone"
      title="Eight learning areas"
      description="Junior high under MATATAG runs on eight learning areas. Three national programs sit across them — the National Reading Program, the National Music Program, and Homeroom Guidance."
      className="bg-surface-container-low"
    >
      <RevealGroup as="ul" className="grid gap-md md:grid-cols-2 lg:grid-cols-4">
        {learningAreas.map((area) => (
          <RevealItem
            as="li"
            key={area.name}
            className="team-stripe-l flex flex-col gap-xs pl-md"
          >
            <h3 className="text-headline-md">{area.name}</h3>
            <p className="text-body-md text-muted-foreground">{area.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

export { LearningAreas }
