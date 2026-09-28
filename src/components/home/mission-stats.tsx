import { Section } from "@/components/home/section"
import { getSchoolStats } from "@/lib/db/content"
import { StatGrid } from "@/components/ui/stat-grid"

async function MissionStats() {
  const schoolStats = await getSchoolStats()
  const stats = [
    { value: schoolStats.learnersEnrolled, label: "Learners enrolled" },
    { value: schoolStats.facultyAndStaff, label: "Faculty and staff" },
    { value: schoolStats.yearEstablished, label: "Established" },
    { value: schoolStats.collegeProgressionRate, label: "Move on to college" },
  ]

  return (
    <Section
      eyebrow="Our Mission"
      title="We teach students to ask better questions"
      description="Goa Science High School exists to give Bicolano learners a rigorous science and mathematics education without asking them to leave home for it. Every classroom, laboratory, and club here is built around inquiry, evidence, and service to the community."
    >
      <StatGrid stats={stats} />
    </Section>
  )
}

export { MissionStats }
