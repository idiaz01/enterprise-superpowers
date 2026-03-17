# Contributing to Enterprise Superpowers

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

```bash
# Clone the repository
git clone https://github.com/idiaz01/enterprise-superpowers.git
cd enterprise-superpowers

# Install dependencies
npm install

# Build
npm run build

# Run tests
npm run test

# Run in development mode (watch)
npm run dev
```

## Project Structure

```
src/
  bin.ts                    # CLI entry point
  cli/                      # CLI command handlers
  core/                     # Core utilities (types, config, templates, generator)
  integrations/             # Integration installers (one folder per integration)
  design-system/            # Design system collector and generator
  prompts/                  # Interactive prompts
templates/                  # Handlebars templates for generated plugins
tests/                      # Unit, integration, and e2e tests
```

## Adding a New Integration

1. Create a folder under `src/integrations/<your-integration>/`
2. Create `installer.ts` implementing the `Installer` interface
3. Create a `templates/` directory with your skill/agent/command templates
4. Register in `src/integrations/registry.ts`
5. Write tests in `tests/unit/integrations/<your-integration>.test.ts`

### Integration Template

```typescript
// src/integrations/my-tool/installer.ts
import { BaseIntegration } from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'my-tool',
  name: 'My Tool',
  category: 'project-management',
  description: 'Integration with My Tool for task management',
}

export const myToolInstaller: BaseIntegration = new BaseIntegration(meta, async (options: InstallerOptions) => {
  // Copy templates, add MCP config, etc.
})
```

## Coding Standards

- TypeScript with strict mode
- ESM-only (no CommonJS)
- Immutable data patterns (use `readonly`)
- Functions under 50 lines
- Files under 800 lines
- No hardcoded values

## Commit Messages

Follow conventional commits:

```
feat: add Confluence integration
fix: handle missing logo path gracefully
docs: update README with new integration guide
test: add e2e test for init command
chore: update dependencies
```

## Pull Request Process

1. Create a feature branch from `master`
2. Write tests first (TDD)
3. Implement the feature
4. Ensure all tests pass: `npm run test`
5. Ensure build succeeds: `npm run build`
6. Ensure lint passes: `npm run lint`
7. Submit a PR with a clear description

## Reporting Issues

Use the GitHub issue templates for:
- **Bug reports**: Include reproduction steps, expected behavior, and environment details
- **Feature requests**: Describe the use case and any alternatives considered
