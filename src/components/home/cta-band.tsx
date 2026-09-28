import { MailIcon, PhoneIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { getSiteSettings } from "@/lib/db/content"
import { telHref } from "@/lib/utils"

async function CtaBand() {
  const site = await getSiteSettings()

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
            Call or email the school office to reach the registrar about
            admission for incoming Grade 7 and Grade 11, including
            requirements and schedules.
          </p>
        </div>
        <div className="flex flex-wrap gap-sm">
          <Button size="lg" variant="accent" render={<a href={telHref(site.phone)} />}>
            <PhoneIcon />
            Call the Office
          </Button>
          <Button size="lg" variant="outline" render={<a href={`mailto:${site.email}`} />}>
            <MailIcon />
            Email the Office
          </Button>
        </div>
      </Reveal>
    </section>
  )
}

export { CtaBand }
