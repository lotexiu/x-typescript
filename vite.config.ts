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
// ...existing code...
const pkgs = [...Object.keys(peerDependencies), ...Object.keys(dependencies)];

// external pode ser um array que contenha strings e regex, ou uma função.
// Aqui usamos uma função para cobrir subpaths como "react/jsx-runtime".
const external = (id: string) => {
  // externaliza qualquer import que seja exatamente um pacote ou comece com "pacote/"
  if (pkgs.some(pkg => id === pkg || id.startsWith(`${pkg}/`))) return true;
  // opcional: manter compatibilidade com outros casos
  return false;
};

export default defineConfig({
  // NOTE: We purposely avoid forcing esbuild to "preserve" JSX here because
  // Rollup (the downstream parser) will error when it encounters raw JSX in
  // modules. If you want true JSX-preserved output (real .jsx with JSX syntax)
  // we need a different approach (e.g. keep `esbuild.jsx: 'preserve'` AND add
  // a Rollup plugin that supports parsing JSX, or emit files with .jsx *but*
  // keep code compiled by esbuild). See comments later.
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
        // Emit .jsx for entries that come from .tsx/.jsx sources, otherwise .js.
        // Use any typing to avoid strict TS complaints in this config file.
        entryFileNames: (chunkInfo: any) => {
          const id = chunkInfo.facadeModuleId || "";
          if (id.endsWith(".tsx") || id.endsWith(".jsx")) return "[name].jsx";
          return "[name].js";
        },
        // Keep chunk files as .js by default. If you want to detect .tsx inside
        // a chunk and output .jsx, we can extend this logic (more complex).
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
        preserveModules: true,
        preserveModulesRoot: "src",
        dir: "dist",
      },
    },
  },
});