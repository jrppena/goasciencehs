import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const coreSubjects = [
  "Effective Communication and Mabisang Komunikasyon",
  "General Mathematics",
  "General Science",
  "Life and Career Skills",
  "Pag-aaral ng Kasaysayan at Lipunang Pilipino",
]

const electiveClusters = [
  {
    name: "Science, Technology, Engineering and Mathematics",
    description:
      "Advanced mathematics, specialised sciences, and data analytics for learners headed into engineering, medicine, and research.",
    tone: "primary",
  },
  {
    name: "Business and Entrepreneurship",
    description:
      "Accounting, marketing, and organisational management, built around a student-run enterprise project.",
    tone: "secondary",
  },
  {
    name: "Field Experience",
    description:
      "Optional apprenticeship and research placements taken alongside any cluster, arranged with partner institutions.",
    tone: "primary",
  },
] as const

function SeniorHigh() {
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
      <RevealGroup className="grid gap-md md:grid-cols-2 lg:grid-cols-3">
        {electiveClusters.map((cluster) => (
          <RevealItem key={cluster.name}>
            <Card tone={cluster.tone} interactive className="h-full justify-between">
            <CardHeader>
              <span className="font-mono text-label-md uppercase text-muted-foreground">
                Elective cluster
              </span>
              <CardTitle>{cluster.name}</CardTitle>
              <CardDescription>{cluster.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="ghost"
                size="sm"
                render={<Link href="/academics/senior-high-school" />}
              >
                See the cluster
                <ArrowRightIcon />
              </Button>
            </CardContent>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

export { SeniorHigh }
