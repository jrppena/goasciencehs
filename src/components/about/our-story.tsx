import Image from "next/image"

import { StatGrid } from "@/components/ui/stat-grid"
import { Reveal } from "@/components/motion/reveal"
import { STAGGER_SECONDS } from "@/lib/motion"
import { schoolStats } from "@/lib/school-stats"

const stats = [
  { value: schoolStats.yearEstablished, label: "Year established" },
  { value: schoolStats.learnersEnrolled, label: "Learners enrolled" },
  { value: schoolStats.facultyAndStaff, label: "Faculty and staff" },
  { value: schoolStats.collegeProgressionRate, label: "Move on to college" },
]

function OurStory() {
  return (
    <section className="page-gutter flex flex-col gap-lg py-xl">
      <div className="grid items-center gap-lg md:grid-cols-2">
        <Reveal className="flex flex-col gap-md">
          <div className="flex flex-col gap-xs">
            <span className="font-mono text-label-md uppercase text-primary">
              Our Story
            </span>
            <h2 className="text-headline-lg-mobile uppercase md:text-headline-lg">
              From Belen Street to Tagongtong
            </h2>
          </div>
          <p className="text-body-lg text-muted-foreground">
            Every year, learners from Goa sat the Philippine Science High
            School entrance examination, and every year most of them did not
            make it — leaving a science curriculum out of reach unless the
            family could send a child away from Goa entirely. In 2015 local
            stakeholders decided the town should stop exporting that problem
            and build the school here instead.
          </p>
          <p className="text-body-md text-muted-foreground">
            GSHS opened in a temporary campus, the ABC Building along Belen
            Street, and moved to its own grounds in Tagongtong in 2017. The
            curriculum was special from the first intake: extra laboratory
            hours, an advanced mathematics track, and a research project every
            learner defends out loud — near enough to home that no family has
            to choose between the two.
          </p>
        </Reveal>
        <Reveal
          delay={STAGGER_SECONDS}
          className="relative aspect-[4/3] overflow-hidden rounded-container border border-border"
        >
          <Image
            src="/gshs-landing.jpg"
            alt="The Goa Science High School campus grounds in Tagongtong, Goa"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
      </div>

      <StatGrid stats={stats} />
    </section>
  )
}

export { OurStory }
