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

const spinner = ora("Lendo dynDeps...").start();

async function main() {
  try {
    const pkg = (await fs.readJson("./package.json")) as PackageJson;

    if (!pkg.dynDeps || Object.keys(pkg.dynDeps).length === 0) {
      spinner.info("Nenhum dynDep encontrado. Nada para instalar.");
      process.exit(0);
    }

    spinner.text = "Instalando dependências dinâmicas...";

    for (const [pkgName, pkgInfo] of Object.entries(pkg.dynDeps)) {
      const version = pkgInfo.version ? `@${pkgInfo.version}` : "";
      const mainDep = `${pkgName}${version}`;
      const allDeps = [mainDep];

      if (pkgInfo.dependencies) {
        for (const [depName, depVersion] of Object.entries(pkgInfo.dependencies)) {
          allDeps.push(`${depName}@${depVersion}`);
        }
      }

      spinner.text = `Instalando ${chalk.cyan(mainDep)} e dependências...`;
      console.log(chalk.gray(`→ npm install ${allDeps.join(" ")} --save`));

      execSync(`npm install ${allDeps.join(" ")} --save`, {
        stdio: "inherit",
      });
    }

    spinner.succeed("Todas as dependências dinâmicas foram instaladas!");
  } catch (err: any) {
    spinner.fail("Erro ao instalar dynDeps");
    console.error(chalk.red(err.message));
    process.exit(1);
  }
}

main();
