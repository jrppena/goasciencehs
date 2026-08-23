import { Section } from "@/components/home/section"
import { StatGrid } from "@/components/ui/stat-grid"

const stats = [
  { value: "1,240", label: "Learners enrolled" },
  { value: "68", label: "Faculty and staff" },
  { value: "2015", label: "Established" },
  { value: "97%", label: "Move on to college" },
]

function MissionStats() {
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
