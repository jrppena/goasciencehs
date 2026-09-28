import Image from "next/image"

import { FACULTY_PENDING, type FacultyMember } from "@/lib/faculty"
import { Card } from "@/components/ui/card"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"

/**
 * One person in the grid: portrait, name and position, a two-cell contact
 * strip, then the subjects they teach. Details the school has not confirmed
 * are drawn as `FACULTY_PENDING` rather than hidden, so the card keeps the
 * same shape across the whole grid. Non-teaching personnel drop the subjects
 * block with `withSubjects={false}`.
 */
function FacultyCard({
  member,
  withSubjects = true,
}: {
  member: FacultyMember
  withSubjects?: boolean
}) {
  const fullName = `${member.honorific} ${member.name}`

  return (
    <Card stripe="top" interactive className="h-full gap-0 py-0 text-center">
      {member.photo ? (
        <div className="relative aspect-square border-b border-border">
          <Image
            src={member.photo}
            alt={`Portrait of ${fullName}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <MediaPlaceholder className="aspect-square rounded-none border-0 border-b" />
      )}

      <div className="flex flex-col gap-xs px-md py-md">
        <h3 className="font-display text-headline-md text-primary transition-colors group-hover/card:text-primary-container">
          {fullName}
        </h3>
        <p className="text-body-md text-muted-foreground">
          {member.position ?? FACULTY_PENDING}
        </p>
      </div>

      {member.email || member.room ? (
        <div className="grid grid-cols-1 divide-y divide-border border-y border-border bg-surface-container-low font-mono text-label-md text-on-surface-variant sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <p className="px-sm py-xs [overflow-wrap:anywhere]">
            {member.email ? (
              <a
                href={`mailto:${member.email}`}
                className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {member.email}
              </a>
            ) : (
              FACULTY_PENDING
            )}
          </p>
          <p className="px-sm py-xs uppercase [overflow-wrap:anywhere]">
            Room: {member.room ?? FACULTY_PENDING}
          </p>
        </div>
      ) : (
        <div className="border-y border-border bg-surface-container-low px-sm py-xs font-mono text-label-md text-on-surface-variant">
          {`Contact details: ${FACULTY_PENDING}`}
        </div>
      )}

      {withSubjects ? (
        <div className="flex flex-col gap-sm px-md py-md">
          <h4 className="font-display text-body-lg uppercase text-primary">
            Subjects taught
          </h4>
          {member.subjects ? (
            <ul className="flex flex-col gap-xs text-body-md text-muted-foreground">
              {member.subjects.map((subject) => (
                <li key={subject}>{subject}</li>
              ))}
            </ul>
          ) : (
            <p className="text-body-md text-muted-foreground">
              {FACULTY_PENDING}
            </p>
          )}
        </div>
      ) : null}
    </Card>
  )
}

export { FacultyCard }
