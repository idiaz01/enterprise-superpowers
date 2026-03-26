---
name: codebase-onboarding
description: Systematically analyze unfamiliar codebases through reconnaissance, architecture mapping, convention detection, and artifact generation (onboarding guide + CLAUDE.md).
origin: ECC
---

# Codebase Onboarding

Systematically analyze unfamiliar codebases to produce actionable onboarding artifacts.

## When to Use

- Joining a new project or team
- Onboarding to an unfamiliar codebase
- Generating project documentation for new contributors
- Creating a starter CLAUDE.md for AI-assisted development

## Phases

### Phase 1: Reconnaissance

Gather initial signals without reading every file:
- Detect package manifests and frameworks
- Identify entry points and directory structure
- Find config files and test setup

### Phase 2: Architecture Mapping

- Identify tech stack and architecture pattern (monolith vs. microservices)
- Map key directories and their purposes
- Trace data flow from request entry to database

### Phase 3: Convention Detection

Discover project conventions from actual code patterns:
- Naming patterns and code style
- Error handling approaches
- Git workflow and commit conventions

### Phase 4: Generate Artifacts

Produce two outputs:

**Onboarding Guide** (scannable in ~2 minutes):
- Tech stack table
- Architecture overview
- Key entry points
- Directory mapping
- Request lifecycle
- Conventions summary
- Common task commands
- "Where to look" reference table

**CLAUDE.md** (under 100 lines):
- Project-specific instructions for code style, testing, build commands, and structure

## Key Principles

- Use targeted searches (Glob, Grep) rather than reading all files
- Trust actual code patterns over config declarations
- Enhance existing CLAUDE.md files rather than replacing them
- Flag unknowns explicitly -- avoid confident guesses
- Keep outputs concise and scannable, not exhaustive
