import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

import { compilerOptions } from "./tsconfig.json";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"],
  },
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: Object.fromEntries(
      Object.entries(compilerOptions.paths).map(([alias, [path]]) => [
        alias,
        resolve(path),
      ])
    ),
  },
});
