import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import { execSync } from "child_process";
import { log } from "console";

const DIST_DIR = path.resolve(process.cwd(), 'dist')

export const logger = {
  info: (msg: string) => log(chalk.blue(msg)),
  success: (msg: string) => log(chalk.green(msg)),
  error: (msg: string) => log(chalk.red(msg)),
  warn: (msg: string) => log(chalk.yellow(msg)),
  step: (msg: string) => log(chalk.cyan(`→ ${msg}`)),
};

interface PackageJson {
  name: string;
  version: string;
  private?: boolean;
}

async function main() {
  logger.info("\n📦 Iniciando publicação dos pacotes em dist...\n");

  // Encontrar pacotes em dist
  const packages = (await fs.readdir(DIST_DIR)).filter(p =>
    fs.existsSync(path.join(DIST_DIR, p, "package.json"))
  );

  if (packages.length === 0) {
    logger.warn("⚠ Nenhum pacote encontrado em dist.");
    return;
  }

  for (const pkgName of packages) {
    const pkgPath = path.join(DIST_DIR, pkgName);
    const pkgJsonPath = path.join(pkgPath, "package.json");

    const pkg: PackageJson = await fs.readJson(pkgJsonPath);

    if (pkg.private) {
      logger.warn(`⏭ Pulando pacote privado: ${pkg.name}`);
      continue;
    }

    const spinner = ora(`Publicando ${chalk.cyan(pkg.name)}...`).start();

    try {
      const tag = detectTag(pkg.version);

      // Executa npm publish com a tag adequada
      execSync(`npm publish --access public --tag ${tag}`, {
        cwd: pkgPath,
        stdio: "inherit",
      });

      spinner.succeed(`${pkg.name} publicado com sucesso (${chalk.green(tag)})`);
    } catch (err: any) {
      spinner.fail(`${pkg.name} falhou ao publicar`);
      logger.error(`Erro: ${err.message || err}`);
    }
  }

  logger.success("\n✅ Publicação concluída.\n");
}

/**
 * Detecta automaticamente a tag baseada na versão
 * Ex: 1.0.0-alpha.3 → "alpha"
 */
function detectTag(version: string): string {
  const pre = version.match(/-(alpha|beta|rc|next|canary)/i);
  return pre ? pre[1].toLowerCase() : "latest";
}

main().catch(err => {
  console.error(chalk.red("Erro inesperado:"), err);
  process.exit(1);
});
