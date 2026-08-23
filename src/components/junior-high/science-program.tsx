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

const gradeLevels = [
  {
    grade: "Grade 7",
    specialisation: "Environmental Science",
    summary:
      "Ecosystems, water and soil quality, and waste — studied on the campus grounds and along the Goa river system before anything is written up.",
    work: [
      "Field sampling and data collection",
      "Research 1: the nature of scientific investigation",
      "First investigatory project, in pairs",
    ],
    tone: "primary",
  },
  {
    grade: "Grade 8",
    specialisation: "Biotechnology",
    summary:
      "Fermentation, tissue culture, and applied microbiology, with the laboratory work that the topics need rather than a reading list about them.",
    work: [
      "Culture and sterile technique",
      "Research 2: formulating a hypothesis and designing an experiment",
      "Investigatory project with a controlled variable set",
    ],
    tone: "secondary",
  },
  {
    grade: "Grade 9",
    specialisation: "Consumer Chemistry",
    summary:
      "The chemistry of what households buy and use — food, cleaning agents, cosmetics, and fuels — tested for what the label claims.",
    work: [
      "Quantitative analysis and titration",
      "Research 3: data handling and statistical treatment",
      "Product-testing investigatory project",
    ],
    tone: "primary",
  },
  {
    grade: "Grade 10",
    specialisation: "Electronics and Robotics",
    summary:
      "Circuits, microcontrollers, and control systems, ending in a built and working device rather than a diagram of one.",
    work: [
      "Circuit design and microcontroller programming",
      "Research 4: writing and defending the research report",
      "Capstone project, defended before a faculty panel",
    ],
    tone: "secondary",
  },
] as const

/** The special science add-ons, which are what separate GSHS from a general JHS. */
function ScienceProgram() {
  return (
    <Section
      eyebrow="The Science Load"
      title="One specialisation each year"
      description="In the special science program the Technology and Livelihood Education slot is given to Research, and Science and Mathematics are enriched beyond the national competencies. Each year level carries its own specialised science subject."
    >
      <RevealGroup className="grid gap-md md:grid-cols-2 xl:grid-cols-4">
        {gradeLevels.map((level) => (
          <RevealItem key={level.grade}>
            <Card tone={level.tone} className="h-full">
            <CardHeader>
              <span className="font-mono text-label-md uppercase text-muted-foreground">
                {level.grade}
              </span>
              <CardTitle>{level.specialisation}</CardTitle>
              <CardDescription>{level.summary}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-xs">
                {level.work.map((item) => (
                  <li
                    key={item}
                    className="team-stripe-l pl-sm text-body-md text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

export { ScienceProgram }
