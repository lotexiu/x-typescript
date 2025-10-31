#!/usr/bin/env ts-node

import fs from "fs-extra";
import { execSync } from "child_process";
import chalk from "chalk";
import ora from "ora";

interface DynDep {
  version?: string;
  dependencies?: Record<string, string>;
}

interface PackageJson {
  dynDeps?: Record<string, DynDep>;
}

async function main() {
  const pkgNameArg = process.argv[2];
  if (!pkgNameArg) {
    console.log(chalk.yellow("⚠️  Uso: npm run dynDeps <pacote>@<versão>"));
    process.exit(1);
  }

  const spinner = ora(`Adicionando ${pkgNameArg} em dynDeps...`).start();

  try {
    const pkg = (await fs.readJson("./package.json")) as PackageJson;

    if (!pkg.dynDeps) pkg.dynDeps = {};

    // divide nome e versão
    const [name, version] = pkgNameArg.split("@");
    const depVersion = version ? `^${version}` : "latest";

    pkg.dynDeps[name] = {
      version: depVersion,
      dependencies: {},
    };

    await fs.writeJson("./package.json", pkg, { spaces: 2 });

    spinner.succeed(`${name}@${depVersion} adicionado a dynDeps.`);

    // Chama o script de instalação
    spinner.start("Instalando dependências...");
    execSync("ts-node ./npm/DynDepsInstall.ts", { stdio: "inherit" });

    spinner.succeed("Instalação dinâmica concluída!");
  } catch (err: any) {
    spinner.fail("Erro ao adicionar dependência dinâmica");
    console.error(chalk.red(err.message));
    process.exit(1);
  }
}

main();
