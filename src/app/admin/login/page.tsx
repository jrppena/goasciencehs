import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LoginForm } from "./login-form"

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  const session = await auth()

  if (session?.user) {
    redirect("/admin")
  }

  return (
    <div className="page-gutter flex min-h-[70svh] items-center justify-center py-xl">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Admin sign in</CardTitle>
          <CardDescription>
            Goa Science High School staff only.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}
