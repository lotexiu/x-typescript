import { defineConfig, PluginOption } from "vite";


export default defineConfig({
  plugins: [
  ],
  resolve: {},
  build: {
    minify: false,
    outDir: "dist",
    rollupOptions: {
      preserveEntrySignatures: "allow-extension",
      input: [],
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