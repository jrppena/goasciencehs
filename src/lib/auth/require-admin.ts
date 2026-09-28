import "server-only"

import { auth } from "@/lib/auth"

/** Returns the signed-in admin or throws, so an action can never mutate without one. */
export async function requireAdmin() {
  const session = await auth()

  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  return session.user
}
