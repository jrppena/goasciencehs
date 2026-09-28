import { stdin, stdout } from "node:process"

import { loadEnvConfig } from "@next/env"
import mongoose from "mongoose"

import { hashPassword } from "@/lib/auth/password"
import { connect } from "@/lib/db/connect"
import { UserModel } from "@/lib/db/models/user"

loadEnvConfig(process.cwd())

const MIN_PASSWORD_LENGTH = 12

async function main() {
  const email =
    process.env.ADMIN_EMAIL?.trim().toLowerCase() ||
    (await promptInput("Admin email: "))
  const password =
    process.env.ADMIN_PASSWORD || (await promptInput("Admin password: ", true))

  if (!email.includes("@")) {
    throw new Error("That does not look like an email address.")
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Use at least ${MIN_PASSWORD_LENGTH} characters for the password.`)
  }

  await connect()
  await UserModel.findOneAndUpdate(
    { email },
    { $set: { passwordHash: await hashPassword(password) } },
    { upsert: true, runValidators: true }
  )

  console.log(`Admin account ready: ${email}`)
}

function promptInput(question: string, hidden = false): Promise<string> {
  if (!stdin.isTTY) {
    return Promise.reject(
      new Error("No terminal to prompt in. Set ADMIN_EMAIL and ADMIN_PASSWORD instead.")
    )
  }

  return new Promise((resolve) => {
    stdout.write(question)
    stdin.setRawMode(true)
    stdin.resume()
    stdin.setEncoding("utf8")

    let value = ""

    const finish = () => {
      stdin.setRawMode(false)
      stdin.pause()
      stdin.off("data", onData)
      stdout.write("\n")
      resolve(value)
    }

    const onData = (chunk: string) => {
      for (const char of chunk) {
        if (char === "\r" || char === "\n") {
          finish()
          return
        }
        if (char === "\u0003") {
          process.exit(130)
        }
        if (char === "\u007f" || char === "\b") {
          if (value) {
            value = value.slice(0, -1)
            if (!hidden) stdout.write("\b \b")
          }
          continue
        }
        if (char >= " ") {
          value += char
          if (!hidden) stdout.write(char)
        }
      }
    }

    stdin.on("data", onData)
  })
}

main()
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
  .finally(() => mongoose.disconnect())
