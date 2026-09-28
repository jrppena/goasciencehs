import NextAuth from "next-auth"

import { authConfig } from "@/lib/auth/config"

// Next 16 renamed the middleware convention to proxy; the auth config here has
// no database imports, so this bundle stays small.
const { auth } = NextAuth(authConfig)

export { auth as proxy }

export const config = {
  matcher: ["/admin/:path*"],
}
