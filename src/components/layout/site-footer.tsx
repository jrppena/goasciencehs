import Link from "next/link"
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

import { navigation } from "@/lib/navigation"
import { getSiteSettings } from "@/lib/db/content"
import { telHref } from "@/lib/utils"

const contactItemClassName =
  "flex items-start gap-base text-body-md text-inverse-on-surface/80 transition-colors hover:text-inverse-on-surface"

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-label-md uppercase text-secondary-fixed-dim">
      {children}
    </h2>
  )
}

async function SiteFooter() {
  const site = await getSiteSettings()

  return (
    <footer className="border-t bg-inverse-surface text-inverse-on-surface">
      <div className="page-gutter grid gap-lg py-xl md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-sm">
          <span className="font-display text-headline-md uppercase">
            {site.shortName}
          </span>
          <p className="text-body-md text-inverse-on-surface/80">{site.name}</p>
          <p className="font-mono text-label-md uppercase text-inverse-on-surface/60">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>

        <nav className="flex flex-col gap-sm">
          <FooterHeading>Quick Links</FooterHeading>
          {navigation.flatMap((section) =>
            (section.children ?? [section]).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body-md text-inverse-on-surface/80 transition-colors hover:text-secondary-fixed-dim"
              >
                {link.label}
              </Link>
            ))
          )}
        </nav>

        <address className="flex flex-col gap-sm not-italic">
          <FooterHeading>Contact</FooterHeading>
          <p className={contactItemClassName}>
            <MapPinIcon className="mt-1 size-4 shrink-0" aria-hidden="true" />
            {site.address}
          </p>
          <a href={telHref(site.phone)} className={contactItemClassName}>
            <PhoneIcon className="mt-1 size-4 shrink-0" aria-hidden="true" />
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className={contactItemClassName}>
            <MailIcon className="mt-1 size-4 shrink-0" aria-hidden="true" />
            {site.email}
          </a>
        </address>

        <div className="flex flex-col gap-sm">
          <FooterHeading>Follow</FooterHeading>
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-body-md text-inverse-on-surface/80 transition-colors hover:text-secondary-fixed-dim"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export { SiteFooter }
