import { Section } from "@/components/home/section"
import { Reveal } from "@/components/motion/reveal"
import { StatGrid } from "@/components/ui/stat-grid"

const gradeRequirements = [
  {
    value: "85%",
    label: "English, Science, Math",
  },
  {
    value: "83%",
    label: "Every other subject",
  },
  {
    value: "90%",
    label: "Weight of grades",
  },
  {
    value: "10%",
    label: "Weight of interview",
  },
]

const requirements = [
  "Letter of application addressed to the school head",
  "Certified copy of the Grade 6 report card",
  "Certificate of good moral character",
  "Medical certificate from a government physician",
]

/** Entry requirements for Grade 7, which is the only open intake year. */
function Admission() {
  return (
    <Section
      eyebrow="Getting In"
      title="Entry at Grade 7"
      description="Admission follows the Department of Education's guidelines for the special science program. Grade 6 pupils are ranked on their grades and an interview; applicants keep the standard through the third grading period."
      className="bg-surface-container-low"
    >
      <StatGrid stats={gradeRequirements} />
      <Reveal className="flex flex-col gap-sm">
        <h3 className="text-headline-md">What to submit</h3>
        <ul className="grid gap-xs md:grid-cols-2">
          {requirements.map((requirement) => (
            <li
              key={requirement}
              className="team-stripe-l pl-sm text-body-md text-foreground"
            >
              {requirement}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}

export { Admission }
