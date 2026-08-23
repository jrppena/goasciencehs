import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

const CORE_SUBJECT_HOURS = 160

const coreSubjects = [
  {
    name: "Effective Communication and Mabisang Komunikasyon",
    body: "Reading, writing, and speaking for academic and workplace purposes, carried in both English and Filipino.",
  },
  {
    name: "General Mathematics",
    body: "The mathematics every pathway needs before its own advanced electives.",
  },
  {
    name: "General Science",
    body: "Integrated physical and life science, taught with laboratory hours attached.",
  },
  {
    name: "Life and Career Skills",
    body: "Financial literacy, digital citizenship, and the groundwork for a career plan.",
  },
  {
    name: "Pag-aaral ng Kasaysayan at Lipunang Pilipino",
    body: "Philippine history and society, read through primary sources.",
  },
]

/** The five learning areas that replaced fifteen core subjects. */
function CoreSubjects() {
  return (
    <Section
      eyebrow="Taken by everyone"
      title="Core subjects"
      description={`Fifteen core subjects were cut to five learning areas, each carrying ${CORE_SUBJECT_HOURS} hours in Grade 11. Fewer subjects, more time in each.`}
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
              {CORE_SUBJECT_HOURS} hours
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
