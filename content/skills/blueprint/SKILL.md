---
name: blueprint
description: Turn a one-line objective into a step-by-step construction plan for multi-session, multi-agent engineering projects. Each step has a self-contained context brief so a fresh agent can execute it cold.
origin: ECC
---

# Blueprint -- Construction Plan Generator

Turn a one-line objective into a step-by-step construction plan that any coding agent can execute cold.

## When to Use

- Breaking a large feature into multiple PRs with clear dependency order
- Planning a refactor or migration that spans multiple sessions
- Coordinating parallel workstreams across sub-agents
- Any task where context loss between sessions would cause rework

**Do not use** for tasks completable in a single PR or fewer than 3 tool calls.

## How It Works

Blueprint runs a 5-phase pipeline:

1. **Research** -- Pre-flight checks (git, gh auth, remote, default branch), then reads project structure, existing plans, and memory files.
2. **Design** -- Breaks the objective into one-PR-sized steps (3-12 typical). Assigns dependency edges, parallel/serial ordering, model tier, and rollback strategy.
3. **Draft** -- Writes a self-contained Markdown plan file to `plans/`. Every step includes a context brief, task list, verification commands, and exit criteria.
4. **Review** -- Delegates adversarial review to a strongest-model sub-agent against a checklist and anti-pattern catalog.
5. **Register** -- Saves the plan, updates memory index, and presents the step count and parallelism summary.

## Key Features

- **Cold-start execution** -- Every step includes a self-contained context brief
- **Adversarial review gate** -- Every plan is reviewed by a strongest-model sub-agent
- **Branch/PR/CI workflow** -- Built into every step, degrades gracefully without git/gh
- **Parallel step detection** -- Dependency graph identifies parallelizable steps
- **Plan mutation protocol** -- Steps can be split, inserted, skipped, reordered, or abandoned
- **Zero runtime risk** -- Pure Markdown skill, no executable code

## Examples

```
/blueprint myapp "migrate database to PostgreSQL"
```

Produces `plans/myapp-migrate-database-to-postgresql.md` with ordered steps like: Add PostgreSQL driver, Create migration scripts, Update repository layer, Add integration tests, Remove old database code.
