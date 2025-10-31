import "tsconfig-paths/register.js";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { log } from "console";

const {error, info, warning} = {
	info: (msg: string)=> log(chalk.blue(msg)),
	error: (msg: string)=> log(chalk.red(msg)),
	warning: (msg: string)=> log(chalk.yellow(msg)),
}

function newDist() {
	fs.removeSync("./dist");
	fs.mkdirSync("./dist");
}

function rootPackageJson() {
	if (fs.existsSync("./package.json")) {
		try {
			return fs.readJSONSync("./package.json", 'utf-8');
		} catch (e) {
			error(`Failed to read package.json: ${e}`);
			process.exit(1);
		}
	} else {
		error("package.json not found in the root directory.");
		process.exit(1);
	}
}

function start() {
	const packages = fs.globSync(`${contentDir}/*/`)
		.reduce((packages, pathFolder):  Record<string,string[]> => {
			const folder: string = path.basename(pathFolder); // get folder name
			packages[folder] = fs.globSync(`${pathFolder}/**/*.*`); // get all files in the folder

			const packageJson = createPackageJson(packages[folder], folder)
			
			fs.mkdirSync(`./dist/${folder}`);
			fs.writeJSON(`./dist/${folder}/package.json`, packageJson, { spaces: 2 })

			return packages;
		},{});

	info("✅ Packages built successfully!");
}

function generateExport(files: string[]) {
	return files.reduce((exportsObj, file:string): Record<string,any> => {
		const format = path.extname(file).toLowerCase();
		const exportPath = `./${file.replace(/\.[^.]+$/, '')}`;

		switch (format) {
			case '.ts':
				exportsObj[exportPath] = {
					"import": `./${exportPath}.js`,
					"require": `./${exportPath}.js`,
					"types": `./${exportPath}.d.ts`
				}
				break;
			case '.js':
				exportsObj[exportPath] = {
					"import": `./${file}`,
					"require": `./${file}`
				}
				break;
			case '.d.ts':
				exportsObj[exportPath] = `./${file}`;
				break;
			case '.scss':
			case '.sass':
			case '.css':
				exportsObj[exportPath] = `./${file}`;
				break;
			default:
				warning(`Unsupported file format: ${format} in file ${file}`);
				break;
			/* TODO - fazer para tsx e outros */
		}
		return exportsObj;
	}, {})
}

function createPackageJson(files: string[], folder:string) {
	const packageJson: Record<string,any> = fs.readJSONSync("./npm/template.package.json", 'utf-8');
	
	packageJson.author = rootPkgJson.author || "";
	packageJson.name = `${rootPkgJson.author}-${folder}`;
	packageJson.version = rootPkgJson.version || "1.0.0";
	packageJson.license = rootPkgJson.license || "MIT";
	packageJson.repository.url += `/${folder}`;
	packageJson.keywords.push(folder);
	packageJson.files = files.map(file => path.relative(`./src/${folder}`, file));
	packageJson.exports = generateExport(packageJson.files);

	return packageJson;
}

const contentDir =  "./src";
const rootPkgJson: Record<string,any> = rootPackageJson();

newDist();
start();