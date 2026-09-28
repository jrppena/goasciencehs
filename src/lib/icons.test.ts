import { describe, expect, it } from "vitest"

import {
  pickIcon,
  resolveIcon,
  statementIconNames,
  valueIconNames,
} from "@/lib/icons"

describe("icon whitelist", () => {
  it("allows only whitelisted value icons and defaults otherwise", () => {
    expect(pickIcon("ShieldCheck", valueIconNames, "FlaskConical")).toBe(
      "ShieldCheck"
    )
    expect(pickIcon("Bogus", valueIconNames, "FlaskConical")).toBe(
      "FlaskConical"
    )
    expect(pickIcon("", valueIconNames, "FlaskConical")).toBe("FlaskConical")
  })

  it("keeps statement icons out of the value whitelist", () => {
    expect(statementIconNames).toEqual(["Target", "Eye"])
    expect(pickIcon("Eye", valueIconNames, "FlaskConical")).toBe(
      "FlaskConical"
    )
    expect(pickIcon("Compass", statementIconNames, "Target")).toBe("Target")
  })

  it("resolves unknown stored names to the fallback icon", () => {
    expect(resolveIcon("NotAnIcon", "Target")).toBe(resolveIcon("Target", "Target"))
    expect(resolveIcon(null, "FlaskConical")).toBe(
      resolveIcon("FlaskConical", "FlaskConical")
    )
  })
})
