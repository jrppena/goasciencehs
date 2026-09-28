import { getVisibleFaculty } from "@/lib/db/content"
import { FacultyCard } from "@/components/faculty/faculty-card"
import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

async function FacultyGrid() {
  const facultyMembers = await getVisibleFaculty("teaching")

  return (
    <Section
      eyebrow="Teaching Personnel"
      title="Meet the teachers"
      description="Portraits, subject loads, and contact details are being collected and will be published as the school confirms them."
    >
      <RevealGroup as="ul" className="grid gap-md sm:grid-cols-2 lg:grid-cols-3">
        {facultyMembers.map((member) => (
          <RevealItem as="li" key={member.name}>
            <FacultyCard member={member} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

export { FacultyGrid }
