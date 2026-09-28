import Image from "next/image"
import Link from "next/link"

import { getSiteSettings } from "@/lib/db/content"
import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { StickyHeaderShell } from "@/components/layout/sticky-header-shell"

async function SiteHeader() {
  const site = await getSiteSettings()

  return (
    <StickyHeaderShell>
      <a
        href="#main"
        className="sr-only rounded-control bg-primary px-md py-base font-display text-button uppercase text-on-primary focus:not-sr-only focus:absolute focus:top-base focus:left-base focus:z-50"
      >
        Skip to content
      </a>

      <div className="page-gutter flex h-20 items-center justify-between gap-md">
        <Link href="/" className="flex items-center gap-sm">
          <Image
            src="/gshs-logo-transparent.png"
            alt=""
            width={447}
            height={447}
            preload
            className="size-14 shrink-0"
          />
          <span className="flex flex-col gap-xs">
            <span className="font-display text-headline-md uppercase text-primary">
              {site.shortName}
            </span>
            <span className="hidden font-mono text-label-md uppercase text-muted-foreground md:block">
              {site.name}
            </span>
          </span>
        </Link>

        <div className="hidden md:block">
          <MainNav />
        </div>

        <div className="md:hidden">
          <MobileNav shortName={site.shortName} />
        </div>
      </div>
    </StickyHeaderShell>
  )
}

export { SiteHeader }
