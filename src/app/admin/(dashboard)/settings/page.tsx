import type { Metadata } from "next"

import { getSchoolStats, getSiteSettings } from "@/lib/db/content"
import { SchoolStatsForm } from "./school-stats-form"
import { SiteSettingsForm } from "./site-settings-form"

export const metadata: Metadata = {
  title: "Site settings",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function AdminSettingsPage() {
  const [settings, stats] = await Promise.all([
    getSiteSettings(),
    getSchoolStats(),
  ])

  return (
    <div className="flex flex-col gap-lg">
      <header className="flex flex-col gap-xs">
        <h1 className="font-display text-headline-lg uppercase text-primary">
          Site settings
        </h1>
        <p className="text-body-md text-muted-foreground">
          School identity, contact details, and the headline figures.
        </p>
      </header>

      <SiteSettingsForm settings={settings} />

      <SchoolStatsForm stats={stats} />
    </div>
  )
}
