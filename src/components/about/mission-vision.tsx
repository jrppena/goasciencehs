import { EyeIcon, TargetIcon } from "lucide-react"

import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const statements = [
  {
    icon: TargetIcon,
    label: "Mission",
    title: "Teach learners to ask better questions",
    body: "To deliver a rigorous science and mathematics education to the learners of Goa and its neighbouring towns, grounded in inquiry, evidence, and service — without asking any child to leave home for it.",
    tone: "primary",
  },
  {
    icon: EyeIcon,
    label: "Vision",
    title: "The science school Bicol sends its children to",
    body: "A campus where every graduate leaves able to design an experiment, defend a conclusion, and carry both back into the community that raised them.",
    tone: "secondary",
  },
] as const

function MissionVision() {
  return (
    <Section
      eyebrow="What We Stand For"
      title="Mission and vision"
      className="bg-surface-container-low"
    >
      <RevealGroup className="grid gap-md md:grid-cols-2">
        {statements.map((statement) => (
          <RevealItem key={statement.label}>
            <Card tone={statement.tone} className="h-full">
            <CardHeader>
              <span className="flex items-center gap-base font-mono text-label-md uppercase text-muted-foreground">
                <statement.icon className="size-4 text-primary" aria-hidden="true" />
                {statement.label}
              </span>
              <CardTitle>{statement.title}</CardTitle>
              <CardDescription className="text-body-lg">
                {statement.body}
              </CardDescription>
            </CardHeader>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

export { MissionVision }
