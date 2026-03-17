# Enterprise Superpowers

> CLI tool that scaffolds AI coding assistant plugins for enterprise teams.

Generate Claude Code plugins with your company's branding, tool integrations, and enterprise-ready defaults in minutes.

## Quick Start

```bash
npx enterprise-superpowers init my-company
```

This interactive command will:
1. Ask for your company's design assets (logo, fonts, color palette)
2. Let you select integrations — or install all (recommended, default)
3. Generate a fully compliant Claude Code plugin with skills, agents, hooks, rules, and MCP configs

## Installation

```bash
# Run directly with npx (no install needed)
npx enterprise-superpowers init <company-name>

# Or install globally
npm install -g enterprise-superpowers
enterprise-superpowers init <company-name>
```

## Commands

```bash
# Scaffold a new enterprise plugin
enterprise-superpowers init <company-name>

# Add an integration to an existing plugin
enterprise-superpowers add <integration>

# Update company design assets
enterprise-superpowers update-styles

# List available integrations
enterprise-superpowers list

# Remove a generated plugin
enterprise-superpowers destroy [path]
```

## Available Integrations (30)

By default, all integrations are installed. You can customize during `init`.

| Category | Integrations |
|----------|-------------|
| **Project Management** | Jira (MCP + skill + agent) |
| **Collaboration & Docs** | Confluence (MCP), Notion (MCP), Draw.io / Excalidraw |
| **Cloud & Infrastructure** | AWS (MCP + skill + agent), Azure / GCP, IaC (Terraform / CDK) |
| **Development** | Git (Lab/Hub), Go, DevOps, PR/MR Workflows, Language Servers, Observability (Grafana + Sentry MCP) |
| **Quality & Security** | Security (hooks + agent + rules), Code Quality & Coverage (TDD + hooks) |
| **Frontend & Design** | Frontend Patterns, Frontend Slides, Visual Companion |
| **Backend** | Backend Patterns, Django, Java / Spring Boot |
| **Data & Analytics** | Databases (PostgreSQL + migrations), Snowflake, SAP |
| **AI & Machine Learning** | ML Tools, ML Engineering, Agentic Engineering |
| **Meta & Tooling** | Skills Creator, Content Creation, Debugging & Workflow |

## Generated Plugin Structure

```
my-company-superpowers/
  .claude-plugin/
    plugin.json
  skills/
    company-design-system/SKILL.md
    security-review/SKILL.md
    tdd-workflow/SKILL.md
    finishing-a-development-branch/SKILL.md
    ...  (~70 skills)
  agents/
    security-reviewer.md
    code-reviewer.md
    planner.md
    ...  (~15 agents)
  commands/
    code-review.md
    tdd.md
    orchestrate.md
    ...  (~27 commands)
  rules/
    common/
    typescript/
    python/
    golang/
  hooks/
    hooks.json
    scripts/
  .mcp.json
  assets/
    logos/
    fonts/
  config/
    design-system.json
    integrations.json
  README.md
```

## What's Included

### Skills (~70)
Battle-tested skills from [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) and [Superpowers](https://github.com/obra/superpowers), covering security, TDD, frontend/backend patterns, database optimization, DevOps, agentic engineering, Django, Spring Boot, Go, and more.

### Agents (~15)
Specialized agents for code review, security analysis, TDD guidance, database review, build error resolution, Go/Python review, planning, and more.

### Commands (~27)
Slash commands for TDD, code review, E2E testing, orchestration, multi-model workflows, build fixes, refactoring, and documentation updates.

### Rules (~24)
Coding style, security, testing, git workflow, and language-specific rules for TypeScript, Python, and Go.

### Hooks (~20)
Quality gates, auto-formatting, TypeScript checking, console.log detection, git push reminders, and session management hooks.

### MCP Servers (~30 configs)
Pre-configured MCP server definitions for GitHub, AWS, Terraform, Notion, Slack, Confluence, Grafana, Sentry, Supabase, ClickHouse, Playwright, and more.

## Design System

Enterprise Superpowers bakes your company's visual identity into every generated artifact. When Claude creates presentations, HTML prototypes, or documentation, it uses your:

- **Logo** — Company logo included in generated assets
- **Color palette** — Brand colors applied consistently
- **Fonts** — Corporate typography enforced
- **Style guidelines** — Design tokens for all visual outputs

## Development

```bash
# Clone and install
git clone https://github.com/idiaz01/enterprise-superpowers.git
cd enterprise-superpowers
npm install

# Development
npm run dev          # Watch mode
npm run build        # Build
npm run test         # Run tests
npm run lint         # Lint
npm run typecheck    # Type check
```

## Attribution

Enterprise Superpowers includes content adapted from these open-source projects:

- **[Everything Claude Code](https://github.com/affaan-m/everything-claude-code)** by Affaan Mustafa — Skills, agents, commands, rules, hooks, and MCP configs (MIT)
- **[Superpowers](https://github.com/obra/superpowers)** by Jesse Vincent — Development workflow skills, debugging, and planning (MIT)
- **Official MCP Servers** — AWS, Terraform (HashiCorp), Notion, Slack, Grafana, Sentry, GitHub

See [content/CREDITS.md](content/CREDITS.md) for full attribution details.

## Roadmap

- [x] Claude Code plugin generation
- [x] 30 integrations with real content
- [x] Official MCP server configurations
- [ ] Cursor rules/plugin support
- [ ] Codex agent generation
- [ ] GitHub marketplace distribution
- [ ] Plugin validation and doctor commands
- [ ] Community integration marketplace

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## License

[MIT](LICENSE)
