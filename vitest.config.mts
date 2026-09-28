import { fileURLToPath } from "node:url"

import { defineConfig } from "vitest/config"

const resolveFromRoot = (path: string) =>
  fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      "@": resolveFromRoot("./src"),
      // Models import "server-only"; tests run outside a React server.
      "server-only": resolveFromRoot("./test/server-only-stub.ts"),
    },
  },
  test: {
    include: ["src/**/*.test.ts"],
  },
})
