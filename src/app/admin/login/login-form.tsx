"use client"

import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "./actions"

export function LoginForm() {
  const [error, formAction, pending] = useActionState(login, undefined)
  const invalid = error ? true : undefined

  return (
    <form action={formAction} className="flex flex-col gap-md">
      <div className="flex flex-col gap-xs">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={invalid}
        />
      </div>

      <div className="flex flex-col gap-xs">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={invalid}
        />
      </div>

      {error ? (
        <p role="alert" className="text-body-md text-error">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  )
}
