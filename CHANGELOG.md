# Changelog

## 0.3.0

### Minor Changes

- e2d372e: Fix plugin installation instructions to use `claude --plugin-dir` instead of non-existent `claude plugin add` command. Add brand examples support — users can now provide a folder of example documents (PDFs, PowerPoints, images) during onboarding that get copied to `assets/examples/` so Claude has real-world context of the company's visual identity. Design system templates now always show all sections (logos, fonts, colors) with fallback text instead of hiding empty sections.

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
