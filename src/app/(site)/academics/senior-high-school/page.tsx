import type { Metadata } from "next"

import { CtaBand } from "@/components/home/cta-band"
import { CoreSubjects } from "@/components/senior-high/core-subjects"
import { CurriculumShift } from "@/components/senior-high/curriculum-shift"
import { ElectiveClusters } from "@/components/senior-high/elective-clusters"
import { ShsHero } from "@/components/senior-high/shs-hero"
import { PageTransition } from "@/components/motion/page-transition"

export const metadata: Metadata = {
  title: "Senior High School",
  description:
    "The Academic Track at Goa Science High School: five core subjects and the STEM, Business and Entrepreneurship, and Field Experience clusters of the Strengthened Senior High School curriculum.",
}

export default function SeniorHighSchoolPage() {
  return (
    <PageTransition>
      <ShsHero />
      <CurriculumShift />
      <CoreSubjects />
      <ElectiveClusters />
      <CtaBand />
    </PageTransition>
  )
}
