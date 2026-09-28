import type { Metadata } from "next"

import { FacultyGrid } from "@/components/faculty/faculty-grid"
import { FacultyHero } from "@/components/faculty/faculty-hero"
import { NonTeachingPersonnel } from "@/components/faculty/non-teaching-personnel"
import { SchoolHead } from "@/components/faculty/school-head"
import { CtaBand } from "@/components/home/cta-band"
import { PageTransition } from "@/components/motion/page-transition"

export const metadata: Metadata = {
  title: "Faculty and Staff",
  description:
    "The principal, teaching personnel, and non-teaching staff of Goa Science High School in Goa, Camarines Sur.",
}

export default function FacultyAndStaffPage() {
  return (
    <PageTransition>
      <FacultyHero />
      <SchoolHead />
      <FacultyGrid />
      <NonTeachingPersonnel />
      <CtaBand />
    </PageTransition>
  )
}
