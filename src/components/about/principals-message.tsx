import Image from "next/image"
import { QuoteIcon } from "lucide-react"

import { schoolHead } from "@/lib/faculty"
import { Reveal } from "@/components/motion/reveal"
import { STAGGER_SECONDS } from "@/lib/motion"

function PrincipalsMessage() {
  return (
    <section className="page-gutter grid items-center gap-lg py-xl md:grid-cols-[1fr_2fr]">
      <Reveal className="relative aspect-[3/4] overflow-hidden rounded-container border border-border">
        <Image
          src={schoolHead.photo}
          alt={`Portrait of Goa Science High School principal ${schoolHead.name}`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
      </Reveal>
      <Reveal
        as="figure"
        delay={STAGGER_SECONDS}
        className="flex flex-col gap-md"
      >
        <QuoteIcon className="size-8 text-primary" aria-hidden="true" />
        <blockquote className="text-headline-lg-mobile uppercase md:text-headline-lg">
          We do not promise an easy six years. We promise that no learner walks
          them alone.
        </blockquote>
        <p className="text-body-lg text-muted-foreground">
          Every year a parent asks whether their child can keep up here. The
          answer is the same one the school was founded on: with small
          sections, teachers who stay after the bell, and work that is checked
          rather than assumed, they can. Come and see the campus for yourself.
        </p>
        <figcaption className="flex flex-col gap-xs">
          <span className="font-display text-headline-md uppercase">
            {schoolHead.name}
          </span>
          <span className="font-mono text-label-md uppercase text-muted-foreground">
            {schoolHead.position}
          </span>
        </figcaption>
      </Reveal>
    </section>
  )
}

export { PrincipalsMessage }
