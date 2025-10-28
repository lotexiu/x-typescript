import { defineConfig, PluginOption } from "vite";
import dts from "vite-plugin-dts";
import path from "path";
import fs from "fs";


const patterns = /\.(scss|sass)$/;

export function excludeScssPreprocess(srcDir: string): PluginOption {
  const files: string[] = [];
  return {
    name: 'exclude-scss-preprocess',
    enforce: 'pre',
    resolveId(id, importer) {
      if (patterns.test(id)) {
        const file = id.replace(/\?.*/, '');
        const filepath = file.startsWith('@/')
          ? file.replace('@', srcDir)
          : path.resolve(path.dirname(importer!), file);
        files.push(filepath);
        return { id: file, external: true };
      }
    },
    async writeBundle(options) {
      await Promise.all(
        files.map((file) => {
          const dist = file.replace(srcDir, options.dir!);
          return fs.copyFile(file, dist, ()=>{});
        })
      );
    },
  };
}

export function copyAllScss(srcDir: string): PluginOption {
  function getAllScssFiles(dir: string): string[] {
    const files = fs.readdirSync(dir);
    let result: string[] = [];
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        result = result.concat(getAllScssFiles(fullPath));
      } else if (file.endsWith(".scss") || file.endsWith(".sass")) {
        result.push(fullPath);
      }
    }
    return result;
  }

  return {
    name: 'copy-all-scss',
    async writeBundle(options) {
      const scssFiles = getAllScssFiles(srcDir);
      await Promise.all(
        scssFiles.map(file => {
          const relativePath = path.relative(srcDir, file);
          const destPath = path.resolve(options.dir!, relativePath);
          fs.mkdirSync(path.dirname(destPath), { recursive: true });
          return fs.promises.copyFile(file, destPath);
        })
      );
    },
  };
}


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
      include: ["src"],
      outDir: "dist",
      insertTypesEntry: false,
    }),
    excludeScssPreprocess(path.resolve(__dirname, "src")),
    copyAllScss(path.resolve(__dirname, "src")),
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
