import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { PluginOption } from "vite";
import { DIST_DIR, formatGroups, importPatterns, loadRootPackage, logger } from "../utils";

export function FixImportsPlugin(): PluginOption {
	return {
		name: "fix-imports-plugin",
		apply: "build",
		async closeBundle() {
			logger.info("🔧 Corrigindo importações após build...");
      const rootPkg = loadRootPackage();

			fs.globSync(`${DIST_DIR}/**/*.*`).forEach((file): void => {
        const ext = path.extname(file).replace(".", "").toLowerCase();

        const patterns = importPatterns[formatGroups[ext]] || [];
        if (!patterns.length) return;

        let content = fs.readFileSync(file, "utf8");
        const from = file.split('/')[1];

        let changed = false;
        patterns.forEach(pattern => {
          let match: RegExpExecArray | null;
          while ((match = pattern.exec(content)) !== null) {
            const result = match[1] || match[2];
            const fullPath = path.resolve(path.dirname(file), result);
            const relativePath = path.relative(DIST_DIR, fullPath).replace(/\\/g, "/");
            const origin = relativePath.split('/')[0];
            
            if (origin != from) {
              const newImport = `@${rootPkg.author}/${origin}/${relativePath.split('/').slice(1).join('/')}`;
              content = content.replace(result, newImport);
              changed = true;
              logger.success(`✔ Corrigido: ${path.relative(process.cwd(), file)}`);
            }
          }
        })

        if (changed) {
          fs.writeFileSync(file, content, "utf8");
        }
			});
			console.log(chalk.green("✅ Importações corrigidas com sucesso."));
		},
	};
}
