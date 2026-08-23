import { cn } from "@/lib/utils"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

type Stat = {
  value: string
  label: string
}

/** Figure row used wherever the school quotes its numbers. */
function StatGrid({
  stats,
  className,
}: {
  stats: readonly Stat[]
  className?: string
}) {
  return (
    <RevealGroup
      as="dl"
      className={cn(
        "grid grid-cols-2 gap-md border-t border-border pt-md lg:grid-cols-4",
        className
      )}
    >
      {stats.map((stat) => (
        <RevealItem key={stat.label} className="flex flex-col gap-xs">
          <dt className="font-mono text-label-md uppercase text-muted-foreground">
            {stat.label}
          </dt>
          <dd className="font-display text-headline-lg-mobile text-primary md:text-headline-lg">
            {stat.value}
          </dd>
        </RevealItem>
      ))}
    </RevealGroup>
  )
}

export { StatGrid }
export type { Stat }
