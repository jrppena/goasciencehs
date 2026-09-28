import { AdvisoryStrip } from "@/components/layout/advisory-strip"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { MotionProvider } from "@/components/motion/motion-provider"

/** Public chrome shared by every site page and the global 404. */
function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <AdvisoryStrip />
      <main id="main" className="flex-1">
        <MotionProvider>{children}</MotionProvider>
      </main>
      <SiteFooter />
    </>
  )
}

export { PublicShell }
