import { getMissionVision } from "@/lib/db/content"
import { resolveIcon } from "@/lib/icons"
import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

async function MissionVision() {
  const statements = await getMissionVision()
  if (statements.length === 0) return null

  return (
    <Section
      eyebrow="What We Stand For"
      title="Mission and vision"
      className="bg-surface-container-low"
    >
      <RevealGroup className="grid gap-md md:grid-cols-2">
        {statements.map((statement) => {
          const Icon = resolveIcon(statement.icon, "Target")

          return (
            <RevealItem key={statement.label}>
              <Card className="h-full">
                <CardHeader>
                  <span className="flex items-center gap-base font-mono text-label-md uppercase text-muted-foreground">
                    <Icon className="size-4 text-primary" aria-hidden="true" />
                    {statement.label}
                  </span>
                  <CardTitle>{statement.title}</CardTitle>
                  <CardDescription className="text-body-lg">
                    {statement.body}
                  </CardDescription>
                </CardHeader>
              </Card>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </Section>
  )
}

export { MissionVision }
