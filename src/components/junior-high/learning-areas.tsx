import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

const learningAreas = [
  {
    name: "Language",
    body: "English reading, writing, and oral communication, taught as a foundational literacy area under MATATAG.",
  },
  {
    name: "Filipino",
    body: "Pagbasa, pagsulat, at panitikan — carried across all four year levels.",
  },
  {
    name: "Mathematics",
    body: "Algebra, geometry, statistics, and probability, enriched for the school's science load.",
  },
  {
    name: "Science",
    body: "The spiral progression of earth, life, physical, and chemical science, taught with laboratory hours attached.",
  },
  {
    name: "Araling Panlipunan",
    body: "Asian and Philippine history, geography, economics, and contemporary issues.",
  },
  {
    name: "Technology and Livelihood Education",
    body: "Replaced by Research in the special science program, with computer education folded into the Research class.",
  },
  {
    name: "MAPEH",
    body: "Music, Arts, Physical Education, and Health, taken as one learning area.",
  },
  {
    name: "Values Education",
    body: "Character formation, carried alongside the Homeroom Guidance Program.",
  },
]

/** The eight national learning areas, before the school's add-ons. */
function LearningAreas() {
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
