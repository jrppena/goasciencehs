import { getAcademicsSettings, getCoreSubjects } from "@/lib/db/content"
import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

/** The five learning areas that replaced fifteen core subjects. */
async function CoreSubjects() {
  const [coreSubjects, settings] = await Promise.all([
    getCoreSubjects(),
    getAcademicsSettings(),
  ])
  if (coreSubjects.length === 0) return null

  return (
    <Section
      eyebrow="Taken by everyone"
      title="Core subjects"
      description={`Fifteen core subjects were cut to five learning areas, each carrying ${settings.coreSubjectHours} hours in Grade 11. Fewer subjects, more time in each.`}
      className="bg-surface-container-low"
    >
      <RevealGroup as="ul" className="grid gap-md md:grid-cols-2 lg:grid-cols-3">
        {coreSubjects.map((subject) => (
          <RevealItem
            as="li"
            key={subject.name}
            className="team-stripe-l flex flex-col gap-xs pl-md"
          >
            <span className="font-mono text-label-md uppercase text-muted-foreground">
              {settings.coreSubjectHours} hours
            </span>
            <h3 className="text-headline-md">{subject.name}</h3>
            <p className="text-body-md text-muted-foreground">{subject.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

export { CoreSubjects }
