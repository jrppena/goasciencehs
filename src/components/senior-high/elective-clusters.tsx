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

const clusters = [
  {
    name: "Science, Technology, Engineering and Mathematics",
    summary:
      "The cluster the school was built around. Advanced mathematics, specialised sciences, and data analytics, with laboratory hours attached to every science elective.",
    subjects: [
      "Pre-calculus and calculus",
      "Specialised chemistry, physics, and biology",
      "Data analytics and computational thinking",
      "Capstone research, defended before a faculty panel",
    ],
    pathways: "Engineering, medicine, allied health, and the natural sciences",
    tone: "primary",
  },
  {
    name: "Business and Entrepreneurship",
    summary:
      "Accounting, marketing, and organisational management, taught around a student-run enterprise that has to open, trade, and close its books within Grade 12.",
    subjects: [
      "Fundamentals of accountancy",
      "Applied economics and business mathematics",
      "Marketing and organisational management",
      "Enterprise project, from business plan to final audit",
    ],
    pathways: "Accountancy, business administration, economics, and management",
    tone: "secondary",
  },
  {
    name: "Field Experience",
    summary:
      "Optional in the Academic Track, and taken alongside a learner's main cluster rather than instead of it. Placements are arranged with partner institutions in and around Goa.",
    subjects: [
      "Apprenticeship with a partner laboratory, clinic, or firm",
      "Extended research placement under a faculty adviser",
      "Supervised community and outreach work",
      "Portfolio and reflection, assessed at the end of the term",
    ],
    pathways: "Any cluster — it deepens the pathway a learner already chose",
    tone: "primary",
  },
] as const

/** The three Academic Track clusters GSHS offers, in detail. */
function ElectiveClusters() {
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
