import { PluginOption, ResolvedBuildOptions } from "vite";
import path from "path";
import fs from "fs";
import {globSync} from "glob";

export function ExcludeSASSPProcessPlugin(srcDir: string): PluginOption {
  const patterns: RegExp = /\.(scss|sass)$/;
  const files: string[] = [];

  return {
    name: "exclude-sass-preprocess",
    enforce: "pre",

    resolveId(id, importer) {
      if (patterns.test(id)) {
        const file: string = id.replace(/\?.*/, '');
        const filepath: string = file.startsWith('@/')
          ? file.replace('@', srcDir)
          : path.resolve(path.dirname(importer!), file);
        files.push(filepath);
        return { id: file, external: true };
      }
    },

    async writeBundle(options): Promise<void> {
      await Promise.all(
        files.map((file): void  => {
          const dist: string = file.replace(srcDir, options.dir!);
          return fs.copyFile(file, dist, (): void =>{});
        })
      );
    }
  }
}

export function updateExport(pkg: any) {
  const { exports: exportValue = {}, exposeFiles = {} } = pkg;

  for (const [exposeKey, exposePatterns] of Object.entries(exposeFiles)) {
    const finalEntry: Record<string, string> = {};

    for (const [type, patterns] of Object.entries(exposePatterns as Record<string, string[]>)) {
      for (const pattern of patterns) {
        const matchedFiles = globSync(pattern);
        if (exposeKey.indexOf("*") === -1 && matchedFiles.length > 1) {
          throw new Error(`The expose key "${exposeKey}" does not support multiple files. Please use "*" in the key to expose multiple files.`);
        }
        for (const file of matchedFiles) {
          const relativePath = path.relative(process.cwd(), file).replace(/\\/g, "/");
          const exposePath = exposeKey.replace("*", path.basename(file, path.extname(file)));
          if (exportValue[exposePath]) {
            throw new Error(`Already exists an export entry for ${exposePath}`);
          }
          exportValue[exposePath] = {};
          exportValue[exposePath][type] = `./${relativePath}`;
        }
      }
    }
  }

  pkg.exports = exportValue;
}

const DEFAULT_DELETE_KEYS: string[] = ["scripts", "devDependencies", "peerDependencies", "exposeFiles"]
/**
 * 
 * @param deleteKeys 
 * @returns 
 * 
 * @description 
 * Copia o arquivo package.json para o diretório de saída da build, removendo chaves desnecessárias. 
 * E atualiza o campo "exports" com base em "exposeFiles".
 */
export function  CopyAndModifyPackageJsonPlugin(deleteKeys: string[] = DEFAULT_DELETE_KEYS): PluginOption {
  const rootDir: string = path.resolve(process.cwd());
  let build: ResolvedBuildOptions;

  return {
    name: "copy-and-modify-package-json",
    apply: "build",

    configResolved(config) {
        build = config.build;
    },
    closeBundle(): void {
      const packageJsonPath = path.join(rootDir, "package.json");
      if (!fs.existsSync(packageJsonPath)) {
        console.warn("⚠️ Nenhum package.json encontrado no diretório raiz.");
        return;
      }

      const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      updateExport(pkg);

      deleteKeys.forEach((key) => { delete pkg[key]; });
      const distPackageJsonPath = path.join(build.outDir, "package.json");
      fs.mkdirSync(build.outDir, { recursive: true });
      fs.writeFileSync(distPackageJsonPath, JSON.stringify(pkg, null, 2), "utf8");
      console.log("📦 package.json copiado e modificado com sucesso!");
    }
  }
}

export function CopyAllSASSPlugin(srcDir: string): PluginOption {
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


export function getAllTSFiles(dir: string): string[] {
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

export function extractTsconfigAliases() {
  const tsconfigPath = path.resolve(process.cwd(), "tsconfig.json");
  if (!fs.existsSync(tsconfigPath)) return {};
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf8"));
  const paths = tsconfig.compilerOptions?.paths || {};
  const baseUrl = tsconfig.compilerOptions?.baseUrl || ".";
  const aliases: Record<string, string> = {};
  for (const [alias, targets] of Object.entries(paths)) {
    const key = alias.replace(/\/\*$/, "");
    const value = (targets as string[])[0].replace(/\/\*$/, "");
    aliases[key] = path.resolve(process.cwd(), baseUrl, value);
  }
  return aliases;
}