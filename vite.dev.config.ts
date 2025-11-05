import { defineConfig } from "vite";
import path from "path";
import { extractTsconfigAliases } from "./vite/utils";

export default defineConfig({
  root: path.resolve(__dirname, "test/react/app"),
  resolve: {
    alias: extractTsconfigAliases(),
  },
  server: {
    port: 3000,
    open: true,
  },
});
