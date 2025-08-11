# tc⚡96/next-starter
This is a boilerplate to help you quickly set up and start building applications with Next.js. It includes essential configurations, tools, and best practices to get you started.

## ✨ Features
- Next.js: A React framework for production-ready applications.
- Biome: For code formatting and linting.
- Husky: For Git hooks to automate tasks.
- Commitlint: To enforce conventional commit messages.
- Pre-configured Scripts: For linting, formatting, and more.

## 🛠️ Getting Started
📋 Prerequisites
  - Node.js (v18 or higher recommended)

### ⚙️ Installation

1. Clone the repository
```bash
  git clone https://github.com/your-username/nextjs-boilerplate.git
  cd nextjs-boilerplate
```

2. Install dependencies
```bash
  pnpm install
```
### 📜 Scripts
Start the development server

```bash
pnpm dev
```

###  Git Hooks
- Pre-commit: Automatically formats and lints your code using Biome.
- Commit-msg: Validates commit messages using Commitlint to ensure they follow the [Conventional Commits](https://www.conventionalcommits.org/) standard.

### Commit Message Format

This project uses Conventional Commits. Example commit messages:

- `feat`: add user authentication
- `fix`: resolve login page bug
- `chore`: update dependencies
- `docs`: update README

## ⚙️ Configuration

### Biome
Biome is configured in the biome.json file. You can customize formatting and linting rules as needed.

### Commitlint
Commitlint is configured in the commitlint.config.js file. It extends the @commitlint/config-conventional rules.

### Husky
Husky hooks are located in the .husky directory. You can add or modify hooks as needed.