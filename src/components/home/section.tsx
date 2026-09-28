import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"

/** Shared rhythm for every landing-page section: eyebrow, headline, content. */
function Section({
  eyebrow,
  title,
  description,
  centered = false,
  className,
  id,
  children,
}: {
  eyebrow: string
  title: string
  description?: string
  /** Centres the header block; the section's content is laid out by the caller. */
  centered?: boolean
  className?: string
  /** Anchor target, e.g. for a CTA link elsewhere on the site. */
  id?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn("page-gutter flex flex-col gap-md py-xl", className)}>
      {/* Only the header reveals here. Content reveals are owned by the caller
          so that a grid can stagger its own cells — nesting a reveal inside a
          reveal would just fade the same pixels twice. */}
      <Reveal
        className={cn(
          "flex max-w-3xl flex-col gap-xs",
          centered && "mx-auto items-center text-center"
        )}
      >
        <span className="font-mono text-label-md uppercase text-primary">
          {eyebrow}
        </span>
        <h2 className="text-headline-lg-mobile uppercase md:text-headline-lg">
          {title}
        </h2>
        {description ? (
          <p className="max-w-prose text-body-lg text-muted-foreground">
            {description}
          </p>
        ) : null}
      </Reveal>
      {children}
    </section>
  )
}

export { Section }
