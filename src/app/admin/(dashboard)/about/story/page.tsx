import type { Metadata } from "next"
import Link from "next/link"

import { getAboutStory } from "@/lib/db/content"
import { AboutListForm } from "../list-form"
import { storyFields } from "../field-config"
import { updateAboutStoryAction } from "./actions"

export const metadata: Metadata = {
  title: "Our Story",
  robots: { index: false, follow: false },
}

// Admin data must always be fresh.
export const dynamic = "force-dynamic"

export default async function AdminAboutStoryPage() {
  const story = await getAboutStory()

  return (
    <div className="flex flex-col gap-lg">
      <header className="flex flex-col gap-xs">
        <Link
          href="/admin/about"
          className="font-mono text-label-md uppercase text-muted-foreground hover:text-primary"
        >
          ← About content
        </Link>
        <h1 className="font-display text-headline-lg uppercase text-primary">
          Our Story
        </h1>
        <p className="text-body-md text-muted-foreground">
          The prose beside the campus photo. The image itself stays in code.
        </p>
      </header>

      <AboutListForm
        action={updateAboutStoryAction}
        fields={storyFields}
        submitLabel="Save story"
        cancelHref="/admin/about"
        values={{
          heading: story.heading,
          paragraphs: story.paragraphs.join("\n\n"),
        }}
      />
    </div>
  )
}
