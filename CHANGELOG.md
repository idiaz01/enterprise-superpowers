# Changelog

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
