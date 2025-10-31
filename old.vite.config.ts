import { defineConfig, PluginOption } from "vite";
import dts from "vite-plugin-dts";
import path from "path";
import fs from "fs";
import { CopyAllSASSPlugin, CopyAndModifyPackageJsonPlugin, ExcludeSASSPProcessPlugin, extractTsconfigAliases, getAllTSFiles } from "./plugins/vite";

export default defineConfig({
  plugins: [
    dts({
      include: ["src"],
      outDir: "dist",
      insertTypesEntry: false,
    }),
    ExcludeSASSPProcessPlugin(path.resolve(__dirname, "src")),
    CopyAllSASSPlugin(path.resolve(__dirname, "src")),
    CopyAndModifyPackageJsonPlugin(),
  ],
  resolve: { alias: extractTsconfigAliases() },
  build: {
    minify: false,
    outDir: "dist",
    rollupOptions: {
      preserveEntrySignatures: "allow-extension",
      input: getAllTSFiles(path.resolve(__dirname, "src")),
      treeshake: false,
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
        preserveModules: true,
        preserveModulesRoot: "src",
        dir: "dist",
      },
    },
  },
});