import type { NextAuthConfig } from "next-auth"

/**
 * Shared across the full server config and the proxy (src/proxy.ts), which
 * must stay free of database imports.
 */
export const authConfig = {
  providers: [],
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  trustHost: true,
  callbacks: {
    authorized({ auth, request }) {
      // The login page itself must stay reachable while logged out.
      return request.nextUrl.pathname === "/admin/login" || !!auth
    },
  },
} satisfies NextAuthConfig
