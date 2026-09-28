"use server"

import { AuthError } from "next-auth"

import { signIn } from "@/lib/auth"

export async function login(_state: string | undefined, formData: FormData) {
  const email = formData.get("email")
  const password = formData.get("password")

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
  ) {
    return "Enter your email and password."
  }

  try {
    await signIn("credentials", { email, password, redirectTo: "/admin" })
  } catch (error) {
    // A successful sign-in throws Next's redirect, which must bubble up.
    if (error instanceof AuthError) {
      return "Invalid email or password."
    }
    throw error
  }
}
