# 🚀 Contributing and Release Guide

## 📋 Development Workflow

### For Contributors

There are two ways to contribute:

#### Option 1: Fork the Repository (Recommended for External Contributors)

1. **Fork this repository** on GitHub
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/x-typescript.git
   cd x-typescript
   ```

3. **Configure git to use project's commit template (optional but recommended)**
   ```bash
   # Local configuration (only for this project)
   git config commit.template .gitmessage
   
   # Or global configuration (for all projects)
   git config --global commit.template ~/.gitmessage
   # (copy .gitmessage to your home directory first)
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature
   ```

5. **Make commits following Conventional Commits**
   ```bash
   # New feature (increases MINOR: 0.1.0 → 0.2.0)
   git commit -m "feat: add email validation"

   # Bug fix (increases PATCH: 0.1.0 → 0.1.1)
   git commit -m "fix: correct component type error"

   # Documentation (doesn't change version)
   git commit -m "docs: update README with examples"

   # Breaking change (increases MAJOR: 0.1.0 → 1.0.0)
   git commit -m "feat!: remove Node 14 support"
   
   # Or use the template (run 'git commit' without -m flag)
   git commit  # Opens editor with .gitmessage template
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature
   ```

6. **Open a Pull Request** from your fork to the main repository

#### Option 2: Direct Branch (For Collaborators with Write Access)

1. **Create a branch from `main`**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature
   ```

2. **Configure git to use project's commit template (optional but recommended)**
   ```bash
   # Local configuration (only for this project)
   git config commit.template .gitmessage
   ```

3. **Make commits following Conventional Commits** (same as Option 1)

4. **Push the branch**
   ```bash
   git push origin feature/your-feature
   ```

✅ **A PR will be created automatically** after push!

#### 4. Wait for approval and merge
- Only the maintainer can merge into `main`
- The PR will be automatically validated (commits, build, etc.)

---

## 🔐 Configured Protections

### `main` Branch (Configure on GitHub)
To ensure only the maintainer can merge:

1. Go to **Settings** → **Branches** → **Add rule**
2. Branch name pattern: `main`
3. Enable:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Restrict who can push to matching branches (add only maintainer)
   - ✅ Include administrators (optional)

---

## 🤖 Configured Automations

### 1. **Auto Create PR** (`.github/workflows/pr-auto-create.yml`)
- Triggers when someone pushes to any branch (except `main`)
- Automatically creates a PR to `main`

### 2. **Validate Commits** (`.github/workflows/validate-commits.yml`)
- Validates that all commits follow Conventional Commits
- Prevents merge of PRs with invalid commits

### 3. **Release** (`.github/workflows/release.yml`)
- Triggers **only after merge into `main`**
- Analyzes PR commits
- Updates version in `package.json`
- Generates/updates `CHANGELOG.md`
- Creates a Git tag
- Creates a GitHub Release
- **Does NOT publish to npm** (maintainer does it manually)

---

## 📦 npm Publication (Manual)

After semantic-release updates the version:

```bash
# 1. Make sure you're on updated main
git checkout main
git pull origin main

# 2. Build the project
npm run build

# 3. Publish manually
npm publish
```

---

## 📝 Commit Pattern (Conventional Commits)

### Using the Project's Commit Template

This project includes a `.gitmessage` template to help you write proper commit messages.

**Setup (Local - Recommended):**
```bash
# Run this command in the project directory
git config commit.template .gitmessage
```

**Setup (Global):**
```bash
# Copy template to home directory
cp .gitmessage ~/.gitmessage

# Configure git globally
git config --global commit.template ~/.gitmessage
```

**Usage:**
```bash
# Instead of using -m flag
git commit

# This will open your editor with the template
# Fill in the sections and save
```

### Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

### Main Types
| Type | Description | Changes Version? |
|------|-------------|------------------|
| `feat` | New feature | MINOR (0.x.0) |
| `fix` | Bug fix | PATCH (0.0.x) |
| `docs` | Documentation only | No |
| `style` | Formatting, whitespace | No |
| `refactor` | Code refactoring | No |
| `perf` | Performance improvement | PATCH |
| `test` | Tests | No |
| `chore` | Build, CI, configs | No |
| `feat!` or `BREAKING CHANGE` | Breaks compatibility | MAJOR (x.0.0) |

### Examples
```bash
# Simple
git commit -m "feat: add validation function"

# With scope
git commit -m "fix(typescript): correct generic type"

# With body and breaking change
git commit -m "feat!: remove Node 14 support

BREAKING CHANGE: Minimum Node version is now 16"
```

---

## 🔍 Testing Locally

### Validate your commits are correct
```bash
# View commit history
git log --oneline

# Test semantic-release (dry-run, won't publish)
npx semantic-release --dry-run
```

### Local build
```bash
npm run build
```

---

## ❓ FAQ

**Q: What happens if I forget to follow Conventional Commits?**  
A: The validation workflow will fail and you won't be able to merge.

**Q: Can I commit directly to `main`?**  
A: No, the branch is protected. Always create a branch.

**Q: When is the version updated?**  
A: Automatically after merge into `main`, by semantic-release.

**Q: Do I need to manually update `package.json`?**  
A: No! Semantic-release does it automatically.

**Q: How do I publish to npm?**  
A: Only the maintainer can publish, manually with `npm publish`.

---

## 🎯 Workflow Summary

```
1. Contributor creates branch from main (or forks)
   ↓
2. Makes commits (Conventional Commits)
   ↓
3. Pushes the branch (or opens PR from fork)
   ↓
4. PR created automatically (or manually from fork)
   ↓
5. Automatic validation (commits, build)
   ↓
6. Code review (if needed)
   ↓
7. Maintainer merges into main
   ↓
8. Semantic-release runs automatically:
   - Updates package.json
   - Generates CHANGELOG.md
   - Creates tag and GitHub Release
   ↓
9. Maintainer publishes to npm manually
```
