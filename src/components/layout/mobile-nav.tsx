"use client"

import Link from "next/link"
import { MenuIcon, XIcon } from "lucide-react"

import { navigation } from "@/lib/navigation"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

/**
 * Sections are laid out flat rather than behind collapsibles — the whole tree
 * is seven links, so hiding any of it would only add taps.
 */
function MobileNav({ shortName }: { shortName: string }) {
  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger
        render={
          <Button variant="ghost" size="icon-lg" aria-label="Open menu">
            <MenuIcon />
          </Button>
        }
      />
      <DrawerContent>
        <DrawerHeader className="flex-row items-center justify-between">
          <DrawerTitle>{shortName}</DrawerTitle>
          <DrawerClose
            render={
              <Button variant="ghost" size="icon-lg" aria-label="Close menu">
                <XIcon />
              </Button>
            }
          />
        </DrawerHeader>

        <nav className="flex flex-col gap-md overflow-y-auto p-md">
          {navigation.map((section) => (
            <div key={section.label} className="flex flex-col gap-xs">
              {section.children ? (
                <>
                  <span className="font-mono text-label-md uppercase text-muted-foreground">
                    {section.label}
                  </span>
                  {section.children.map((link) => (
                    <DrawerClose
                      key={link.href}
                      className="rounded-control py-base font-display text-button uppercase transition-colors hover:text-primary"
                      render={<Link href={link.href} />}
                    >
                      {link.label}
                    </DrawerClose>
                  ))}
                </>
              ) : (
                <DrawerClose
                  className="rounded-control py-base font-display text-button uppercase transition-colors hover:text-primary"
                  render={<Link href={section.href} />}
                >
                  {section.label}
                </DrawerClose>
              )}
            </div>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  )
}

export { MobileNav }
