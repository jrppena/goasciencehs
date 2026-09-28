import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"

function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-primary-container text-on-primary">
      <div
        aria-hidden="true"
        className="speed-lines-bold speed-lines-drift-bold absolute inset-0 opacity-15"
      />
      <Reveal className="page-gutter relative flex flex-col items-start justify-between gap-md py-xl lg:flex-row lg:items-center">
        <div className="flex max-w-2xl flex-col gap-xs">
          <h2 className="text-headline-lg-mobile uppercase md:text-headline-lg">
            Ready to begin?
          </h2>
          <p className="text-body-lg text-primary-fixed">
            Talk to the registrar about admission for incoming Grade 7 and
            Grade 11, including requirements and schedules.
          </p>
        </div>
        <Button
          size="lg"
          variant="accent"
          render={<Link href="/faculty-and-staff#front-office" />}
        >
          Contact the Registrar
        </Button>
      </Reveal>
    </section>
  )
}

export { CtaBand }
