import { getCoreValues } from "@/lib/db/content"
import { resolveIcon } from "@/lib/icons"
import { Section } from "@/components/home/section"
import { RevealGroup } from "@/components/motion/reveal-group"
import { RevealItem } from "@/components/motion/reveal-item"

async function CoreValues() {
  const values = await getCoreValues()
  if (values.length === 0) return null

  return (
    <Section
      eyebrow="Guiding Principles"
      title="Core values"
      description="Four commitments the school is willing to be measured against."
    >
      <RevealGroup as="ul" className="grid gap-md md:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => {
          const Icon = resolveIcon(value.icon, "FlaskConical")

          return (
            <RevealItem
              as="li"
              key={value.title}
              className="team-stripe-l flex flex-col gap-sm pl-md"
            >
              <Icon className="size-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="text-headline-md uppercase">{value.title}</h3>
              <p className="text-body-md text-muted-foreground">{value.body}</p>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </Section>
  )
}

export { CoreValues }
