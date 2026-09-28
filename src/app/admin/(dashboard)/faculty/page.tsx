import type { Metadata } from "next"
import Link from "next/link"

import { getAdminFaculty } from "@/lib/db/admin"
import { FACULTY_PENDING, facultyKindLabels } from "@/lib/faculty"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DeleteFacultyButton } from "./delete-faculty-button"
import { setFacultyVisibleAction } from "./actions"

export const metadata: Metadata = {
  title: "Faculty and Staff",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function AdminFacultyPage() {
  const members = await getAdminFaculty()
  const kinds = Object.keys(facultyKindLabels) as Array<
    keyof typeof facultyKindLabels
  >

  return (
    <div className="flex flex-col gap-lg">
      <header className="flex flex-wrap items-end justify-between gap-md">
        <div className="flex flex-col gap-xs">
          <h1 className="font-display text-headline-lg uppercase text-primary">
            Faculty and Staff
          </h1>
          <p className="text-body-md text-muted-foreground">
            The school head, teaching personnel, and the front office. Hidden
            members stay off the public site.
          </p>
        </div>
        <Button render={<Link href="/admin/faculty/new" />}>New member</Button>
      </header>

      {kinds.map((kind) => {
        const group = members.filter((member) => member.kind === kind)

        return (
          <section key={kind} className="flex flex-col gap-sm">
            <h2 className="font-display text-headline-md uppercase text-primary">
              {facultyKindLabels[kind]}
            </h2>

            {group.length === 0 ? (
              <Card className="px-md">
                <p className="text-body-md text-muted-foreground">
                  No members in this group yet.
                </p>
              </Card>
            ) : (
              <ul className="flex flex-col gap-sm">
                {group.map((member) => (
                  <li key={member._id}>
                    <Card className="px-md">
                      <div className="flex flex-wrap items-center justify-between gap-md">
                        <div className="flex min-w-0 flex-col gap-xs">
                          <Link
                            href={`/admin/faculty/${member._id}`}
                            className="truncate font-display text-body-lg text-primary hover:underline"
                          >
                            {member.honorific} {member.name}
                          </Link>
                          <div className="flex flex-wrap items-center gap-xs">
                            <Badge
                              variant={member.isVisible ? "primary" : "outline"}
                            >
                              {member.isVisible ? "Visible" : "Hidden"}
                            </Badge>
                            <span className="font-mono text-label-md text-muted-foreground">
                              {member.position ?? FACULTY_PENDING} · order{" "}
                              {member.order}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-xs">
                          <form
                            action={setFacultyVisibleAction.bind(
                              null,
                              member._id,
                              !member.isVisible
                            )}
                          >
                            <Button type="submit" variant="ghost" size="sm">
                              {member.isVisible ? "Hide" : "Show"}
                            </Button>
                          </form>
                          <Button
                            variant="outline"
                            size="sm"
                            render={<Link href={`/admin/faculty/${member._id}`} />}
                          >
                            Edit
                          </Button>
                          <DeleteFacultyButton
                            id={member._id}
                            name={`${member.honorific} ${member.name}`}
                          />
                        </div>
                      </div>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )
      })}
    </div>
  )
}
