import { getVisibleFaculty } from "@/lib/db/content"
import { FacultyCard } from "@/components/faculty/faculty-card"
import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

/** Staff without a teaching load — records, admissions, and the front office. */
async function NonTeachingPersonnel() {
  const nonTeachingPersonnel = await getVisibleFaculty("non-teaching")

  return (
    <Section
      id="front-office"
      eyebrow="Non-Teaching Personnel"
      title="The front office"
      description="Records, enrolment, and transfer requests are handled here rather than by a class adviser."
      className="scroll-mt-20 bg-surface-container-low"
    >
      <RevealGroup as="ul" className="grid gap-md sm:grid-cols-2 lg:grid-cols-3">
        {nonTeachingPersonnel.map((member) => (
          <RevealItem as="li" key={member.name}>
            <FacultyCard member={member} withSubjects={false} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

export { NonTeachingPersonnel }
