import type { Metadata } from "next"

import { AcademicsHero } from "@/components/academics/academics-hero"
import { JuniorHigh } from "@/components/home/junior-high"
import { SeniorHigh } from "@/components/home/senior-high"
import { PageTransition } from "@/components/motion/page-transition"

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Junior High School and Senior High School at Goa Science High School, Grades 7 to 12.",
}

export default function AcademicsPage() {
  return (
    <PageTransition>
      <AcademicsHero />
      <JuniorHigh />
      <SeniorHigh />
    </PageTransition>
  )
}
