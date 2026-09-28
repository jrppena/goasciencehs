import Image from "next/image"

import { StatGrid } from "@/components/ui/stat-grid"
import { Reveal } from "@/components/motion/reveal"
import { STAGGER_SECONDS } from "@/lib/motion"
import { getAboutStory, getSchoolStats } from "@/lib/db/content"

async function OurStory() {
  const [schoolStats, story] = await Promise.all([
    getSchoolStats(),
    getAboutStory(),
  ])

  const stats = [
    { value: schoolStats.yearEstablished, label: "Year established" },
    { value: schoolStats.learnersEnrolled, label: "Learners enrolled" },
    { value: schoolStats.facultyAndStaff, label: "Faculty and staff" },
    { value: schoolStats.collegeProgressionRate, label: "Move on to college" },
  ]

  return (
    <section className="page-gutter flex flex-col gap-lg py-xl">
      <div className="grid items-center gap-lg md:grid-cols-2">
        <Reveal className="flex flex-col gap-md">
          <div className="flex flex-col gap-xs">
            <span className="font-mono text-label-md uppercase text-primary">
              Our Story
            </span>
            <h2 className="text-headline-lg-mobile uppercase md:text-headline-lg">
              {story.heading}
            </h2>
          </div>
          {story.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? "max-w-prose text-body-lg text-muted-foreground"
                  : "text-body-md text-muted-foreground"
              }
            >
              {paragraph}
            </p>
          ))}
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
