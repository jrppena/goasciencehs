import Link from "next/link"

import { getElectiveClusters } from "@/lib/db/content"
import { slugify } from "@/lib/news"
import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const coreSubjects = [
  "Effective Communication and Mabisang Komunikasyon",
  "General Mathematics",
  "General Science",
  "Life and Career Skills",
  "Pag-aaral ng Kasaysayan at Lipunang Pilipino",
]

async function SeniorHigh() {
  const clusters = await getElectiveClusters()

  return (
    <Section
      eyebrow="Grades 11 and 12"
      title="Senior High School"
      description="Goa Science High School offers the Academic Track of the Strengthened Senior High School curriculum. Strands are gone: every learner takes the same core subjects, then builds an elective load from the three clusters GSHS offers."
      className="bg-surface-container-low"
    >
      <div className="flex flex-col gap-xs">
        <span className="font-mono text-label-md uppercase text-muted-foreground">
          Core subjects, taken by everyone
        </span>
        <p className="text-body-md text-foreground">
          {coreSubjects.join(" · ")}
        </p>
      </div>
      {clusters.length > 0 ? (
        <RevealGroup className="grid gap-md md:grid-cols-2 lg:grid-cols-3">
          {clusters.map((cluster) => (
            <RevealItem key={cluster.name}>
              <Card tone={cluster.tone} interactive className="relative h-full justify-between">
                <CardHeader>
                  <span className="font-mono text-label-md uppercase text-muted-foreground">
                    Elective cluster
                  </span>
                  <CardTitle>
                    <Link
                      href={`/academics/senior-high-school#${slugify(cluster.name)}`}
                      className="after:absolute after:inset-0 transition-colors hover:text-primary focus-visible:outline-none"
                    >
                      {cluster.name}
                    </Link>
                  </CardTitle>
                  <CardDescription>{cluster.summary}</CardDescription>
                </CardHeader>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      ) : null}
    </Section>
  )
}

export { SeniorHigh }
