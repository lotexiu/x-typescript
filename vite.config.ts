import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";
import fs from "fs";

function getAllTSFiles(dir: string): string[] {
  const files = fs.readdirSync(dir);
  let tsFiles: string[] = [];

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      tsFiles = tsFiles.concat(getAllTSFiles(fullPath));
    } else if (file.endsWith(".ts")) {
      tsFiles.push(fullPath);
    }
  }

  return tsFiles;
}

function extractTsconfigAliases() {
  const tsconfigPath = path.resolve(__dirname, "tsconfig.json");
  if (!fs.existsSync(tsconfigPath)) return {};

  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf8"));
  const paths = tsconfig.compilerOptions?.paths || {};
  const baseUrl = tsconfig.compilerOptions?.baseUrl || ".";

  const aliases: Record<string, string> = {};
  for (const [alias, targets] of Object.entries(paths)) {
    const key = alias.replace(/\/\*$/, "");
    const value = (targets as string[])[0].replace(/\/\*$/, "");
    aliases[key] = path.resolve(__dirname, baseUrl, value);
  }

  return aliases;
}

const aliases = extractTsconfigAliases();

export default defineConfig({
  plugins: [
    dts({
      include: ["src"], // gera d.ts apenas dessa pasta
      outDir: "dist",
      insertTypesEntry: false, // não cria um index.d.ts global
    }),
  ],
  resolve: { alias: aliases },
  build: {
    minify: false,
    outDir: "dist",
    rollupOptions: {
      preserveEntrySignatures: "allow-extension",
      input: getAllTSFiles(path.resolve(__dirname, "src")),
      treeshake: false,
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        dir: "dist",
        entryFileNames: "[name].js",
      },
    },
  },
});
