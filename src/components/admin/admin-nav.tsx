"use client"

import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { GuardedLink } from "@/components/admin/navigation-guard"

const items = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/faculty", label: "Faculty" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/about", label: "About content" },
  { href: "/admin/academics", label: "Academics" },
  { href: "/admin/settings", label: "Site settings" },
]

function AdminNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Admin sections"
      className="flex gap-xs overflow-x-auto p-sm md:flex-col"
    >
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/admin" && pathname.startsWith(`${item.href}/`))

        return (
          <GuardedLink
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-control px-sm py-xs font-display text-button whitespace-nowrap uppercase transition-colors",
              active
                ? "bg-primary text-on-primary"
                : "text-muted-foreground hover:bg-surface-container hover:text-foreground"
            )}
          >
            {item.label}
          </GuardedLink>
        )
      })}
    </nav>
  )
}

export { AdminNav }
