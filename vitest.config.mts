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
    // Integration suites share the gshs-test database and drop it per file.
    fileParallelism: false,
    env: {
      MONGODB_ENV: "development",
      MONGODB_URI_DEVELOPMENT:
        process.env.TEST_MONGODB_URI ??
        "mongodb://127.0.0.1:27017/gshs-test?serverSelectionTimeoutMS=1500",
    },
  },
})
