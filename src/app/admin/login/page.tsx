import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
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
    <main className="page-gutter flex min-h-svh flex-col items-center justify-center gap-md py-xl">
      <Card className="w-full max-w-[24rem]">
        <CardHeader>
          <Image
            src="/gshs-logo-transparent.png"
            alt=""
            width={447}
            height={447}
            className="size-10"
          />
          <CardTitle>Admin sign in</CardTitle>
          <CardDescription>
            Goa Science High School staff only.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>

      <Link
        href="/"
        className="font-mono text-label-md uppercase text-muted-foreground hover:text-primary"
      >
        ← Public site
      </Link>
    </main>
  )
}
