import {
  CompassIcon,
  FlaskConicalIcon,
  HeartHandshakeIcon,
  ShieldCheckIcon,
} from "lucide-react"

import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

const values = [
  {
    icon: FlaskConicalIcon,
    title: "Inquiry",
    body: "Questions before answers. Coursework is graded on reasoning, and no claim survives here without evidence behind it.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Integrity",
    body: "Honest data, honest work. A result that did not happen is worth nothing, in the laboratory and outside it.",
  },
  {
    icon: HeartHandshakeIcon,
    title: "Service",
    body: "The community funds this school. Outreach, clean-ups, and barangay science demos put that back where it came from.",
  },
  {
    icon: CompassIcon,
    title: "Discipline",
    body: "Show up, prepare, follow through. The habits formed across six year levels outlast any single subject.",
  },
]

function CoreValues() {
  return (
    <Section
      eyebrow="Guiding Principles"
      title="Core values"
      description="Four commitments the school is willing to be measured against."
    >
      <RevealGroup as="ul" className="grid gap-md md:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => (
          <RevealItem as="li" key={value.title} className="team-stripe-l flex flex-col gap-sm pl-md">
            <value.icon className="size-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="text-headline-md uppercase">{value.title}</h3>
            <p className="text-body-md text-muted-foreground">{value.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

export { CoreValues }
