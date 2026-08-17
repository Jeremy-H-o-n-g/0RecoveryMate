import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["test/**/*.{test,spec}.ts", "tests/**/*.{test,spec}.{ts,tsx}"],
    // Browser suites run under Playwright instead (S23): npm run test:e2e /
    // test:a11y. Keep them out of the vitest glob.
    exclude: ["node_modules/**", "tests/browser/**"],
  },
});
