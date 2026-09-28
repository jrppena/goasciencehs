import type { Metadata } from "next"

import { AboutHero } from "@/components/about/about-hero"
import { CoreValues } from "@/components/about/core-values"
import { Milestones } from "@/components/about/milestones"
import { MissionVision } from "@/components/about/mission-vision"
import { OurStory } from "@/components/about/our-story"
import { PrincipalsMessage } from "@/components/about/principals-message"
import { CtaBand } from "@/components/home/cta-band"
import { PageTransition } from "@/components/motion/page-transition"

export const metadata: Metadata = {
  title: "About GSHS",
  description:
    "The history, mission, vision, and core values of Goa Science High School in Goa, Camarines Sur.",
}

export default function AboutPage() {
  return (
    <PageTransition>
      <AboutHero />
      <OurStory />
      <MissionVision />
      <CoreValues />
      <Milestones />
      <PrincipalsMessage />
      <CtaBand />
    </PageTransition>
  )
}
