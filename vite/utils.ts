import path from "path";
import fs from "fs-extra";
import { log } from "console";
import chalk from "chalk";
import ora from "ora";

/*───────────────────────────────────────────────
│ Configurações globais
───────────────────────────────────────────────*/
export const ROOT_DIR = "./";
export const SRC_DIR = path.join(ROOT_DIR, "src");
export const DIST_DIR = path.join(ROOT_DIR, "dist");
export const TEMPLATE_PKG = path.join(ROOT_DIR, "vite/template.package.json");

/*───────────────────────────────────────────────
│ Padrões de importação
───────────────────────────────────────────────*/
export const importPatterns: Record<string, RegExp[]> = {
	script: [/(?:import.*from\s+['"]([^'"]+)['"])|(?:require\(['"]([^'"]+)['"]\))/g],
	style: [/@import\s+['"]([^'"]+)['"]/g, /@use\s+['"]([^'"]+)['"]/g],
};

export const formatGroups: Record<string, string> = {
	ts: "script",
	tsx: "script",
	js: "script",
	jsx: "script",
	sass: "style",
	scss: "style",
	css: "style",
};

/*───────────────────────────────────────────────
│ Log helpers
───────────────────────────────────────────────*/
export const logger = {
  info: (msg: string) => log(chalk.blue(msg)),
  success: (msg: string) => log(chalk.green(msg)),
  error: (msg: string) => log(chalk.red(msg)),
  warn: (msg: string) => log(chalk.yellow(msg)),
  step: (msg: string) => log(chalk.cyan(`→ ${msg}`)),
};


/*───────────────────────────────────────────────
│ Funções utilitárias
───────────────────────────────────────────────*/
export function getAllTSFiles(dir: string, exts: string[] = [".ts", ".tsx", ".d.ts"]) : string[] {
  const files = fs.readdirSync(dir);
  let tsFiles: string[] = [];
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      tsFiles = tsFiles.concat(getAllTSFiles(fullPath, exts));
    } else if (exts.some(ext => file.endsWith(ext))) {
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

export function loadRootPackage() {
  const spinner = ora("Lendo package.json raiz...").start();
  const pkgPath = path.join(ROOT_DIR, "package.json");

  if (!fs.existsSync(pkgPath)) {
    spinner.fail("package.json não encontrado.");
    process.exit(1);
  }

  try {
    const data = fs.readJSONSync(pkgPath, "utf-8");
    spinner.succeed("package.json carregado!");
    return data;
  } catch (e) {
    spinner.fail("Erro ao ler package.json");
    logger.error(String(e));
    process.exit(1);
  }
}

export function buildPackageName(author: string, folder: string) {
	return `@${author}/${folder}`;
}