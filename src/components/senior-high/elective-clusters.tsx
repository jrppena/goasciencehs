import { getElectiveClusters } from "@/lib/db/content"
import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

/** The three Academic Track clusters GSHS offers, in detail. */
async function ElectiveClusters() {
  const clusters = await getElectiveClusters()
  if (clusters.length === 0) return null

  return (
    <Section
      eyebrow="Academic Track"
      title="Elective clusters"
      description="GSHS runs three of the five Academic Track clusters. Learners may also take electives outside their own cluster — the curriculum's doorway option — where the timetable allows it."
    >
      <RevealGroup className="grid gap-md lg:grid-cols-3">
        {clusters.map((cluster) => (
          <RevealItem key={cluster.name}>
            <Card tone={cluster.tone} className="h-full">
            <CardHeader>
              <span className="font-mono text-label-md uppercase text-muted-foreground">
                Cluster
              </span>
              <CardTitle>{cluster.name}</CardTitle>
              <CardDescription>{cluster.summary}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-sm">
              <ul className="flex flex-col gap-xs">
                {cluster.subjects.map((subject) => (
                  <li
                    key={subject}
                    className="team-stripe-l pl-sm text-body-md text-foreground"
                  >
                    {subject}
                  </li>
                ))}
              </ul>
              <p className="text-body-md text-muted-foreground">
                <span className="font-mono text-label-md uppercase text-muted-foreground">
                  Leads to
                </span>
                <br />
                {cluster.pathways}
              </p>
            </CardContent>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

export { ElectiveClusters }
