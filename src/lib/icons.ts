import {
  Compass,
  Eye,
  FlaskConical,
  HeartHandshake,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react"

/**
 * React components cannot live in MongoDB, so icon fields store a name and the
 * components resolve it through this whitelist.
 */
export const iconMap = {
  FlaskConical,
  ShieldCheck,
  HeartHandshake,
  Compass,
  Target,
  Eye,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof iconMap

/** The icons the admin may pick for core values and mission/vision. */
export const valueIconNames = [
  "FlaskConical",
  "ShieldCheck",
  "HeartHandshake",
  "Compass",
] as const satisfies readonly IconName[]

export const statementIconNames = ["Target", "Eye"] as const satisfies readonly IconName[]

/** Falls back to the given icon for unknown or empty stored names. */
export function resolveIcon(name: string | null | undefined, fallback: IconName) {
  if (name && name in iconMap) {
    return iconMap[name as IconName]
  }
  return iconMap[fallback]
}

/** Narrows a submitted icon to the whitelist, defaulting when unknown. */
export function pickIcon(
  value: string,
  allowed: readonly IconName[],
  fallback: IconName
): IconName {
  return (allowed as readonly string[]).includes(value)
    ? (value as IconName)
    : fallback
}
