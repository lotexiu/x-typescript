import fs from "fs-extra";
import path from "path";

// Caminho base do projeto
const projectRoot = process.cwd();

// Caminhos principais
const srcPath = path.join(projectRoot, "src");
const tsconfigPath = path.join(projectRoot, "tsconfig.json");

// Carrega package.json
const pkgPath = path.join(projectRoot, "package.json");
const pkgJson = await fs.readJson(pkgPath);

const allDeps = {
  ...pkgJson.dependencies,
  ...pkgJson.devDependencies,
};

// 🔹 Lê tsconfig.json e extrai aliases (ex: "@tsn-object/*")
let tsconfigPaths: string[] = [];
if (await fs.pathExists(tsconfigPath)) {
  const tsconfig = await fs.readJson(tsconfigPath);
  const compilerOptions = tsconfig.compilerOptions ?? {};
  const paths = compilerOptions.paths ?? {};

  tsconfigPaths = Object.keys(paths).map((key) =>
    key.replace(/\*$/, "") // remove o * do final
  );
}

// Função para verificar se o import vem de um alias do tsconfig
function isTsconfigAlias(libName: string): boolean {
  return tsconfigPaths.some((alias) => libName.startsWith(alias));
}

// Função que escaneia uma pasta recursivamente
function scanFolder(folderPath: string): Set<string> {
  const libs = new Set<string>();
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const fullPath = path.join(folderPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const childLibs = scanFolder(fullPath);
      childLibs.forEach((lib) => libs.add(lib));
    } else if (file.endsWith(".ts") || file.endsWith(".js")) {
      const content = fs.readFileSync(fullPath, "utf8");
      const importRegex =
        /(?:import.*from\s+['"]([^'"]+)['"])|(?:require\(['"]([^'"]+)['"]\))/g;

      let match;
      while ((match = importRegex.exec(content)) !== null) {
        const libName = match[1] || match[2];
        if (
          !libName.startsWith(".") && // ignora imports relativos
          !libName.startsWith("/") && // ignora paths absolutos locais
          !isTsconfigAlias(libName) // ignora aliases do tsconfig
        ) {
          const version = allDeps[libName] || "unknown";
          libs.add(`${libName}@${version}`);
        }
      }
    }
  }

  return libs;
}

// Percorre apenas as subpastas diretas de src
const result: Record<string, string[]> = {};
fs.readdirSync(srcPath).forEach((folder) => {
  const folderFullPath = path.join(srcPath, folder);
  if (fs.statSync(folderFullPath).isDirectory()) {
    const libs = Array.from(scanFolder(folderFullPath));
    result[folder] = libs;
  }
});

// 🔹 Adiciona o resultado ao package.json em um novo campo
pkgJson.analyzedLibs = result;

// 🔹 Salva novamente o package.json formatado
await fs.writeJson(pkgPath, pkgJson, { spaces: 2 });

console.log("✅ Campo 'analyzedLibs' adicionado ao package.json com sucesso!");
