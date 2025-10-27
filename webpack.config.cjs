const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Função para buscar todos os arquivos .ts (exceto .d.ts)
function getAllTsEntries(dir, entries = {}) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllTsEntries(fullPath, entries);
    } else if (
      file.endsWith('.ts') &&
      !file.endsWith('.d.ts')
    ) {
      // Cria uma chave única para cada entry
      const entryName = path.relative(path.join(__dirname, 'src'), fullPath).replace(/\.ts$/, '');
      entries[entryName] = fullPath;
    }
  });
  return entries;
}

function getTsconfigAliases() {
  const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');
  const tsConfigContent = fs.readFileSync(tsconfigPath, 'utf-8');
  const tsconfig = JSON.parse(tsConfigContent);
  const paths = tsconfig.compilerOptions?.paths || {};
  const aliases = {};

  for (const alias in paths) {
    // Remove /* do final do alias e do caminho
    const webpackAlias = alias.replace(/\/\*$/, '');
    const targetPath = paths[alias][0].replace(/\/\*$/, '');
    aliases[webpackAlias] = path.resolve(__dirname, targetPath);
  }
  return aliases;
}

const entries = getAllTsEntries(path.join(__dirname, 'src'));
const aliases = getTsconfigAliases();

module.exports = {
  entry: entries,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias:  aliases,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        sideEffects: true,
      },
      {
        test: /\.scss$/,
        exclude: /scss-helper/, // Exclui a pasta scss-helper
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
        sideEffects: true,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};