import { Badge } from "@/components/ui/badge"

/**
 * Compact page header shared by every section landing page: ruled-paper
 * backdrop, a badge, an h1, and an optional lead.
 */
function PageHero({
  badge,
  title,
  lead,
}: {
  badge: string
  title: string
  lead?: string
}) {
  return (
    <section className="relative overflow-hidden bg-primary text-on-primary">
      <div
        aria-hidden="true"
        className="ruled-paper absolute inset-0 text-on-primary opacity-10"
      />
      {/* Above the fold: no reveal wrappers, so there's no server-rendered
          opacity:0 blocking the header before JS hydrates. */}
      <div className="page-gutter relative flex max-w-3xl flex-col gap-md py-xl">
        <div>
          <Badge variant="active" className="w-fit">
            {badge}
          </Badge>
        </div>
        <div>
          <h1 className="text-headline-lg-mobile uppercase md:text-headline-lg xl:text-display-lg">
            {title}
          </h1>
        </div>
        {lead ? (
          <div>
            <p className="max-w-prose text-body-lg text-primary-fixed">{lead}</p>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export { PageHero }
