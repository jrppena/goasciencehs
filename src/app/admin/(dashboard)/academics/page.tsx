import type { Metadata } from "next"
import Link from "next/link"

import {
  getAdminCoreSubjects,
  getAdminCurriculumShiftSteps,
  getAdminElectiveClusters,
  getAdminLearningAreas,
  getAdminMatatagSteps,
  getAdminScienceProgramLevels,
} from "@/lib/db/admin"
import { getAcademicsSettings } from "@/lib/db/content"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CoreSubjectHoursForm } from "./core-subject-hours-form"

export const metadata: Metadata = {
  title: "Academics content",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function AdminAcademicsPage() {
  const [
    learningAreas,
    scienceProgramLevels,
    matatagSteps,
    coreSubjects,
    electiveClusters,
    curriculumShiftSteps,
    settings,
  ] = await Promise.all([
    getAdminLearningAreas(),
    getAdminScienceProgramLevels(),
    getAdminMatatagSteps(),
    getAdminCoreSubjects(),
    getAdminElectiveClusters(),
    getAdminCurriculumShiftSteps(),
    getAcademicsSettings(),
  ])

  const groups = [
    {
      heading: "Junior High School",
      sections: [
        {
          title: "Learning areas",
          href: "/admin/academics/learning-areas",
          detail: `${learningAreas.length} entries`,
        },
        {
          title: "Science program",
          href: "/admin/academics/science-program",
          detail: `${scienceProgramLevels.length} entries`,
        },
        {
          title: "MATATAG rollout",
          href: "/admin/academics/matatag-rollout",
          detail: `${matatagSteps.length} entries`,
        },
      ],
    },
    {
      heading: "Senior High School",
      sections: [
        {
          title: "Core subjects",
          href: "/admin/academics/core-subjects",
          detail: `${coreSubjects.length} entries`,
        },
        {
          title: "Elective clusters",
          href: "/admin/academics/elective-clusters",
          detail: `${electiveClusters.length} entries`,
        },
        {
          title: "Curriculum shift",
          href: "/admin/academics/curriculum-shift",
          detail: `${curriculumShiftSteps.length} entries`,
        },
      ],
    },
  ]

  return (
    <div className="flex flex-col gap-lg">
      <header className="flex flex-col gap-xs">
        <h1 className="font-display text-headline-lg uppercase text-primary">
          Academics content
        </h1>
        <p className="text-body-md text-muted-foreground">
          The curriculum lists and shared settings behind the Academics pages.
        </p>
      </header>

      {groups.map((group) => (
        <section key={group.heading} className="flex flex-col gap-sm">
          <h2 className="font-display text-headline-md uppercase text-primary">
            {group.heading}
          </h2>
          <div className="grid gap-md sm:grid-cols-2 lg:grid-cols-3">
            {group.sections.map((section) => (
              <Card key={section.href}>
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.detail}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    size="sm"
                    render={<Link href={section.href} />}
                  >
                    Manage
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}

      <section className="flex flex-col gap-sm">
        <h2 className="font-display text-headline-md uppercase text-primary">
          Shared settings
        </h2>
        <CoreSubjectHoursForm settings={settings} />
      </section>
    </div>
  )
}
