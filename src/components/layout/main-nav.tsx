"use client"

import Link from "next/link"

import { navigation } from "@/lib/navigation"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

function MainNav() {
  return (
    <NavigationMenu align="center">
      <NavigationMenuList>
        {navigation.map((section) => (
          <NavigationMenuItem key={section.label}>
            {section.children ? (
              <>
                <NavigationMenuTrigger>{section.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex w-[22rem] flex-col gap-xs">
                    {section.children.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink render={<Link href={link.href} />}>
                          <span className="font-display text-button uppercase">
                            {link.label}
                          </span>
                          <span className="text-body-md text-muted-foreground">
                            {link.description}
                          </span>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} flex-row`}
                render={<Link href={section.href} />}
              >
                {section.label}
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export { MainNav }
