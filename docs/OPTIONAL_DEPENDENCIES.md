# Technical Configuration for Optional Dependencies

## 🔧 How does it work?

### 1. **peerDependencies** (package.json)

```json
"peerDependencies": {
  "react": ">=18.0.0"
}
```

This says: "If the user wants to use React features, they need to have React >= 18.0.0 installed"

### 2. **peerDependenciesMeta** (package.json)

```json
"peerDependenciesMeta": {
  "react": {
    "optional": true
  }
}
```

This says: "But React is OPTIONAL - don't force installation"

### 3. **exports** (package.json)

```json
"exports": {
  ".": {
    "import": "./dist/index.js",
    "types": "./dist/index.d.ts"
  },
  "./react": {
    "import": "./dist/react/index.js",
    "types": "./dist/react/index.d.ts"
  }
}
```

This creates different entry points:
- `typescript-lib` → index.ts (core, without React)
- `typescript-lib/react` → react/index.ts (requires React)

### 4. **devDependencies** (package.json)

```json
"devDependencies": {
  "@types/react": "^18.3.0",
  "typescript": "^5.6.0"
}
```

You need React types for DEVELOPMENT, but users don't need to install them.

## 🎯 Result

### ✅ For users WITHOUT React:

```bash
npm install typescript-lib
# ✅ Installs normally
# ✅ No peer dependency warnings
# ✅ Small bundle
```

### ✅ For users WITH React:

```bash
npm install typescript-lib react
# ✅ Installs both
# ✅ Can use typescript-lib/react
# ✅ No React duplication
```

### ❌ If trying to use React without installing:

```typescript
import { ReactComponent } from 'typescript-lib/react';
// ❌ Runtime error: Cannot find module 'react'
```

## 📚 References

- [NPM Peer Dependencies](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependencies)
- [Package Exports](https://nodejs.org/api/packages.html#exports)
- [Optional Peer Dependencies](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependenciesmeta)
