import "server-only"

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { authConfig } from "@/lib/auth/config"
import { verifyPassword } from "@/lib/auth/password"
import { connect } from "@/lib/db/connect"
import { UserModel } from "@/lib/db/models/user"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email =
          typeof credentials.email === "string"
            ? credentials.email.trim().toLowerCase()
            : ""
        const password =
          typeof credentials.password === "string" ? credentials.password : ""

        if (!email || !password) {
          return null
        }

        await connect()
        const user = await UserModel.findOne({ email }).select("+passwordHash")

        if (!user?.passwordHash) {
          return null
        }

        if (!(await verifyPassword(password, user.passwordHash))) {
          return null
        }

        return { id: user._id.toString(), email: user.email }
      },
    }),
  ],
})
