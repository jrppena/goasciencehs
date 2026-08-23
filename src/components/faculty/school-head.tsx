import Image from "next/image"

import { schoolHead } from "@/lib/faculty"
import { Section } from "@/components/home/section"
import { Reveal } from "@/components/motion/reveal"

/** The principal, given his own block ahead of the teaching grid. */
function SchoolHead() {
  const fullName = `${schoolHead.honorific} ${schoolHead.name}`

  return (
    <Section eyebrow="Office of the Principal" title="The school head" centered>
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-md text-center">
        <Image
          src={schoolHead.photo}
          alt={`Portrait of ${fullName}`}
          width={480}
          height={640}
          sizes="(min-width: 640px) 20rem, 100vw"
          className="h-auto w-full max-w-[20rem] rounded-container border border-border object-cover"
          priority
        />
        <div className="flex flex-col gap-xs">
          <h3 className="text-headline-lg-mobile uppercase md:text-headline-lg">
            {fullName}
          </h3>
          <span className="font-mono text-label-md uppercase text-primary">
            {schoolHead.position}
          </span>
        </div>
        <p className="text-body-lg text-muted-foreground">
          The principal leads the teaching personnel, signs off on the
          school&rsquo;s programmes, and keeps the special science curriculum
          running across Grades 7 to 12. His office handles enrolment appeals,
          learner records, and requests to visit the campus.
        </p>
      </Reveal>
    </Section>
  )
}

export { SchoolHead }
