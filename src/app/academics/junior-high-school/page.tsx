import type { Metadata } from "next"

import { CtaBand } from "@/components/home/cta-band"
import { Admission } from "@/components/junior-high/admission"
import { JhsHero } from "@/components/junior-high/jhs-hero"
import { LearningAreas } from "@/components/junior-high/learning-areas"
import { MatatagRollout } from "@/components/junior-high/matatag-rollout"
import { ScienceProgram } from "@/components/junior-high/science-program"
import { PageTransition } from "@/components/motion/page-transition"

export const metadata: Metadata = {
  title: "Junior High School",
  description:
    "Grades 7 to 10 at Goa Science High School: the eight MATATAG learning areas, a Research subject in place of TLE, and a specialised science subject for every year level.",
}

export default function JuniorHighSchoolPage() {
  return (
    <PageTransition>
      <JhsHero />
      <MatatagRollout />
      <LearningAreas />
      <ScienceProgram />
      <Admission />
      <CtaBand />
    </PageTransition>
  )
}
