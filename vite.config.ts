import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";
import { extractTsconfigAliases, getAllTSFiles, loadRootPackage } from "./vite/utils";
import { MultiPackageJsonPlugin } from "./vite/plugins/MultiPackageJson";
import { ExcludeSASSPProcessPlugin } from "./vite/plugins/ExcludeSASSPProcess";
import { CopyAllSASSPlugin } from "./vite/plugins/CopyAllSASS";
import { FixImportsPlugin } from "./vite/plugins/FixImport";

// Marcar peerDependencies (e dependências, se houver) como externas evita que o Rollup
// resolva para paths dentro de node_modules e mantém os imports "bare" no output.
const { peerDependencies = {}, dependencies = {} } = loadRootPackage();
const external = [
  ...Object.keys(peerDependencies),
  ...Object.keys(dependencies),
];

export default defineConfig({
  plugins: [
    dts({
      include: ["src"],
      outDir: "dist",
      insertTypesEntry: false,
    }),
    ExcludeSASSPProcessPlugin(path.resolve(__dirname, "src")),
    CopyAllSASSPlugin(path.resolve(__dirname, "src")),
    MultiPackageJsonPlugin(),
    FixImportsPlugin(),
  ],
  resolve: { alias: extractTsconfigAliases() },
  build: {
    minify: false,
    outDir: "dist",
    rollupOptions: {
      external,
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