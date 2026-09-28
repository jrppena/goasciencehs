import { getScienceProgramLevels } from "@/lib/db/content"
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

/** The special science add-ons, which are what separate GSHS from a general JHS. */
async function ScienceProgram() {
  const gradeLevels = await getScienceProgramLevels()
  if (gradeLevels.length === 0) return null

  return (
    <Section
      eyebrow="The Science Load"
      title="One specialisation each year"
      description="In the special science program the Technology and Livelihood Education slot is given to Research, and Science and Mathematics are enriched beyond the national competencies. Each year level carries its own specialised science subject."
    >
      <RevealGroup className="grid gap-md md:grid-cols-2 xl:grid-cols-4">
        {gradeLevels.map((level) => (
          <RevealItem key={level.grade}>
            <Card className="h-full">
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
