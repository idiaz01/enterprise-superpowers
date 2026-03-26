# Changelog

## 0.4.0

### Minor Changes

- c256c49: feat: enterprise skills import, persistent plugin installation, and updated content
  - Add enterprise skills import step in init flow (before design system) — users can now include existing company skills/plugins
  - Replace session-only `--plugin-dir` with persistent plugin installation via setup.sh (writes to ~/.claude/settings.json)
  - Add uninstall.sh for clean removal
  - Update README template with persistent install, team distribution, and GitHub marketplace instructions
  - Add 46 new skills from ECC v1.9.0 (rust, kotlin, swift, laravel, flutter, perl, pytorch, and more)
  - Add 13 new agents from ECC v1.9.0 (typescript-reviewer, rust-reviewer, kotlin-reviewer, etc.)
  - Add 6 new integrations: Rust, Kotlin, Swift, C++, Laravel, Flutter
  - Remove 3 deprecated commands (/brainstorm, /execute-plan, /write-plan) — replaced by skills
  - Update agentic-engineering integration with new skills (continuous-agent-loop, team-builder, safety-guard)
  - Update java-spring integration with new agents (java-reviewer, java-build-resolver)
  - Update debugging-workflow integration to remove deprecated commands and add blueprint skill
  - Total: 113 skills, 28 agents, 24 commands, 36 integrations

## 0.3.0

### Minor Changes

- **Enterprise Skills Import**: New step in init flow (before design system) allows users to include existing company skills and plugins from a directory path
- **Persistent Plugin Installation**: Generated plugins now include `setup.sh` and `uninstall.sh` scripts that register the plugin in `~/.claude/settings.json` for automatic loading across all sessions
- **Updated README template** with persistent install, team distribution via GitHub marketplace, and project-level settings.json instructions

### Added

- 46 new skills from ECC v1.9.0: Rust, Kotlin, Swift, Laravel, Flutter, Perl, PyTorch, Nuxt, Bun, and more
- 13 new agents from ECC v1.9.0: typescript-reviewer, rust-reviewer, kotlin-reviewer, java-reviewer, flutter-reviewer, cpp-reviewer, and more
- 6 new integrations: Rust, Kotlin, Swift, C++, Laravel, Flutter
- `blueprint` skill added to debugging-workflow integration
- Java agents (java-reviewer, java-build-resolver) added to java-spring integration
- New agentic engineering skills: continuous-agent-loop, team-builder, safety-guard, ai-first-engineering

### Removed

- Deprecated `/brainstorm` command (use `brainstorming` skill instead)
- Deprecated `/execute-plan` command (use `executing-plans` skill instead)
- Deprecated `/write-plan` command (use `writing-plans` skill instead)
- `autonomous-loops` replaced by `continuous-agent-loop` in agentic-engineering integration

### Content Totals

- 113 skills, 28 agents, 24 commands, 36 integrations

## 0.2.0

### Minor Changes

- Add design system enforcement via CLAUDE.md, rules, and skill cross-references. Add post-init setup documentation to generated plugin README.
- d52200e: Official first release

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- Initial project setup
- CLI skeleton with `init`, `add`, `update-styles`, and `list` commands
- Design system collector and generator
- 5 MVP integrations: Jira, AWS, Git, Security, Frontend
- Handlebars template engine
- Claude Code plugin generation
