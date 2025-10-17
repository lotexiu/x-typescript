# א-TypeScript

> A universal TypeScript library for all development contexts

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/x-typescript.svg)](https://www.npmjs.com/package/x-typescript)

## 🎯 Overview

**א-TypeScript** (x-typescript) is a universal TypeScript library designed to work in any development context: Angular, React, React Native, Node.js, servers, mobile applications, and much more.

The library provides robust and reusable TypeScript types, interfaces, and utilities, allowing you to write type-safe code in any environment.

## ✨ Features

- 🌐 **Universal**: Works with any framework or platform (Angular, React, Vue, Node.js, Deno, etc.)
- 🔷 **TypeScript First**: Built with TypeScript from the ground up
- 📦 **Modular**: Import only what you need
- 🎨 **Type-Safe**: Strictly typed types and interfaces
- 🚀 **Zero Dependencies**: Core without dependencies (optional dependencies for specific features)
- 🔧 **Flexible**: Adapts to your technology stack

## 📦 Installation

```bash
# npm
npm install x-typescript

# yarn
yarn add x-typescript

# pnpm
pnpm add x-typescript
```

### Optional Dependencies

Some specific features require optional dependencies:

```bash
# For React features
npm install react

# For React Native features
npm install react-native
```

> 💡 See [OPTIONAL_DEPENDENCIES.md](./docs/OPTIONAL_DEPENDENCIES.md) for more details on how it works.

## 🚀 Usage

### Core Import (TypeScript)

```typescript
import { /* your types and utilities */ } from 'x-typescript';
```

### React Import

```typescript
import { ReactComponent } from 'x-typescript/react';
```

### React Native Import

```typescript
import { /* React Native types */ } from 'x-typescript/react-native';
```

## 📁 Project Structure

```
x-typescript/
├── src/
│   ├── index.ts                 # Main entry point (core)
│   ├── typescript/              # Pure TypeScript types and utilities
│   │   ├── interfaces/          # TypeScript interfaces
│   │   └── natives/             # Extended native types
│   │       ├── array/           # Array utilities
│   │       ├── class/           # Class utilities
│   │       ├── function/        # Function utilities
│   │       ├── object/          # Object utilities
│   │       └── string/          # String utilities
│   ├── react/                   # React types and utilities
│   │   └── class/
│   │       └── ReactComponent/
│   └── react-native/            # React Native types and utilities
│       ├── class/
│       └── string/
├── docs/                        # Documentation
└── dist/                        # Build output
```

## 🎯 Use Cases

### Frontend Frameworks
- ✅ Angular
- ✅ React
- ✅ Vue
- ✅ Svelte
- ✅ Next.js
- ✅ Nuxt.js

### Backend
- ✅ Node.js
- ✅ Express
- ✅ NestJS
- ✅ Fastify
- ✅ Deno

### Mobile
- ✅ React Native
- ✅ Ionic
- ✅ NativeScript

### Desktop
- ✅ Electron
- ✅ Tauri

## 🏗️ Project Status

> ⚠️ **In Development**: This project is currently under active development. The API may change until version 1.0.0.

The library is being migrated and organized from a previous structure to this modular and universal architecture.

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/lotexiu/x-typescript.git
cd x-typescript

# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run watch

# Clean build
npm run clean
```

## 📚 Documentation

Complete documentation is under development. For now, check out:

- [Optional Dependencies](./docs/OPTIONAL_DEPENDENCIES.md)
- [Contributing Guide](./CONTRIBUTING.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit PRs.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines on:
- How to fork and contribute
- Commit conventions (Conventional Commits)
- Development workflow
- Release process

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/x-typescript)
- [GitHub Repository](https://github.com/lotexiu/x-typescript)
- [Issues](https://github.com/lotexiu/x-typescript/issues)

## ⭐ Support

If this project helped you, consider giving it a ⭐ on GitHub!

---

**א-TypeScript** - All your TypeScript needs in one universal package.

