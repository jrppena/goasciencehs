import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { STAGGER_SECONDS } from "@/lib/motion"

const highlights = [
  "Special science curriculum with added research and laboratory hours",
  "Advanced mathematics track beginning in Grade 7",
  "Yearly investigatory project defended before a faculty panel",
  "Clubs in robotics, journalism, and environmental science",
]

function JuniorHigh() {
  return (
    <section className="page-gutter grid items-center gap-lg py-xl md:grid-cols-2">
      <Reveal className="relative aspect-[4/3] overflow-hidden rounded-container border border-border">
        <Image
          src="/gshs-jhs.jpg"
          alt="Junior high students in uniform assembled on the Goa Science High School grounds"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </Reveal>
      <Reveal delay={STAGGER_SECONDS} className="flex flex-col gap-md">
        <div className="flex flex-col gap-xs">
          <span className="font-mono text-label-md uppercase text-primary">
            Grades 7 to 10
          </span>
          <h2 className="text-headline-lg-mobile uppercase md:text-headline-lg">
            Junior High School
          </h2>
        </div>
        <p className="max-w-prose text-body-lg text-muted-foreground">
          Junior high is where the habits form. Students carry a full science
          and mathematics load alongside the core subjects, and spend their
          afternoons in the laboratory rather than reading about it.
        </p>
        <ul className="flex flex-col gap-sm">
          {highlights.map((highlight) => (
            <li
              key={highlight}
              className="team-stripe-l pl-sm text-body-md text-foreground"
            >
              {highlight}
            </li>
          ))}
        </ul>
        <Button
          variant="secondary"
          className="w-fit"
          render={<Link href="/academics/junior-high-school" />}
        >
          Learn More
          <ArrowRightIcon />
        </Button>
      </Reveal>
    </section>
  )
}

export { JuniorHigh }
