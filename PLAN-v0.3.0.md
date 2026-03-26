# Implementation Plan: Enterprise Superpowers v0.3.0

## Requirements Restatement

1. **Enterprise Skills Import** — Add a new step in the init flow (before design system) that asks users if they have existing enterprise skills/plugins they want to include. Copy those skills into the generated plugin.

2. **Persistent Plugin Installation** — Replace the `claude --plugin-dir` approach with proper marketplace-based persistent installation. The generated plugin should be installable via `enabledPlugins` + `extraKnownMarketplaces` in settings.json, or at minimum provide instructions for all persistent methods.

3. **Update to Latest ECC/Superpowers Content** — Remove deprecated commands (`/brainstorm`, `/execute-plan`, `/write-plan`), add new skills and agents from ECC v1.9.0 and Superpowers v5.0.6.

4. **Branch, PR, and Release** — All changes on a new branch, PR created, version bumped to 0.3.0.

---

## Key Research Findings

### Persistent Plugin Installation (3 methods)

| Method | Persistence | Best For |
|--------|------------|----------|
| **Inline marketplace in settings.json** | Per-user (`~/.claude/settings.json`) or per-project (`.claude/settings.json`) | Local dev, small teams |
| **GitHub marketplace** | Permanent, auto-updates | Open distribution |
| **Managed settings** | IT-deployed, read-only | Enterprise lockdown |

The generated plugin can be made persistent by:
1. **Adding the plugin dir to settings.json** via `extraKnownMarketplaces` with `source: "settings"` and `enabledPlugins`
2. **Publishing as a GitHub repo** and registering as a marketplace
3. **Copying to `~/.claude/plugins/cache/`** (not recommended, fragile)

Our approach: Generate a **setup script** that writes to `~/.claude/settings.json` (user scope) or `.claude/settings.json` (project scope), AND provide instructions for GitHub marketplace registration for team distribution.

### New Content to Add (from ECC v1.9.0 + Superpowers v5.0.6)

**New Agents (13 additions):**
`chief-of-staff`, `cpp-build-resolver`, `cpp-reviewer`, `docs-lookup`, `flutter-reviewer`, `java-build-resolver`, `java-reviewer`, `kotlin-build-resolver`, `kotlin-reviewer`, `pytorch-build-resolver`, `rust-build-resolver`, `rust-reviewer`, `typescript-reviewer`

**New Skills (~58 additions):** Including `rust-patterns`, `rust-testing`, `laravel-patterns`, `laravel-security`, `laravel-tdd`, `laravel-verification`, `nuxt4-patterns`, `flutter-dart-code-review`, `pytorch-patterns`, `nextjs-turbopack`, `bun-runtime`, `swift-*` (5 skills), `kotlin-*` (5 skills), `liquid-glass-design`, `fal-ai-media`, `videodb`, `deep-research`, `blueprint`, `x-api`, `crosspost`, `content-hash-cache-pattern`, `browser-qa`, `click-path-audit`, `canary-watch`, `benchmark`, `product-lens`, `ai-regression-testing`, `safety-guard`, `codebase-onboarding`, `context-budget`, `documentation-lookup`, `data-scraper-agent`, `team-builder`, `rules-distill`, `skill-comply`, `santa-method`, and more.

**Deprecated Commands to REMOVE:**
- `/brainstorm` → skill `brainstorming` handles this
- `/execute-plan` → skill `executing-plans` handles this
- `/write-plan` → skill `writing-plans` handles this

---

## Implementation Phases

### Phase 1: Enterprise Skills Import (init flow change)

**Files to modify:**
- `src/core/types.ts` — Add `EnterpriseSkill` type and `enterpriseSkills` field to init answers
- `src/prompts/init-prompts.ts` — Add enterprise skills prompt BEFORE design system collection
- `src/cli/init.ts` — Pass enterprise skills to generator, show them in summary
- `src/core/generator.ts` — Copy enterprise skills into generated plugin

**Flow change:**
```
Current:  Company Name → Design System → Integrations → Generate
Proposed: Company Name → Enterprise Skills? → Design System → Integrations → Generate
```

**Enterprise Skills Prompt:**
1. "Do you have existing enterprise skills or plugins to include?" (yes/no)
2. If yes: "Enter the path to your skills directory (or individual SKILL.md files, comma-separated):"
3. Validate paths exist, each contains SKILL.md or is a SKILL.md
4. Copy skill directories into the generated `skills/` folder
5. Show summary of imported skills

### Phase 2: Persistent Plugin Installation

**Files to modify:**
- `src/core/generator.ts` — Add `setup.sh` generation
- `src/cli/init.ts` — Update post-generation instructions
- `templates/base/README.md.hbs` — Update installation docs

**New files:**
- `templates/base/setup.sh.hbs` — Script that writes plugin config to settings.json
- `src/core/plugin-installer.ts` — Logic to register plugin persistently in settings.json

**What the setup script does:**
1. Detect scope (user-level `~/.claude/settings.json` or project-level `.claude/settings.json`)
2. Register the plugin directory as an inline marketplace with `source: "settings"`
3. Enable the plugin in `enabledPlugins`
4. Provide instructions for GitHub marketplace registration (for team-wide distribution)

**Updated post-init output:**
```
Next steps:
  1. Install the plugin persistently:
     cd my-company-superpowers && bash setup.sh

  2. Or for this session only:
     claude --plugin-dir ./my-company-superpowers

  3. For team distribution, push to GitHub and register as a marketplace:
     /plugin marketplace add your-org/my-company-superpowers
```

### Phase 3: Update Content (ECC v1.9.0 + Superpowers v5.0.6)

**Files to modify:**
- `src/core/constants.ts` — Update VERSION to `0.3.0`, add new integrations for new language ecosystems (rust, kotlin, swift, laravel, flutter, cpp)
- `content/skills/` — Add ~58 new skills from latest ECC
- `content/agents/` — Add 13 new agents from latest ECC
- `content/commands/` — Remove 3 deprecated commands, verify remaining are current
- Integration installers — Update to reference new skills/agents

**New integrations to add:**
- `rust` — Rust patterns, testing, build resolution, code review
- `kotlin` — Kotlin patterns, coroutines, Ktor, Exposed, testing, Compose
- `swift` — SwiftUI, concurrency, actor persistence, protocol DI
- `laravel` — Laravel patterns, security, TDD, verification
- `flutter` — Flutter/Dart code review
- `cpp` — C++ coding standards, testing, build resolution

**Integrations to update:**
- `debugging-workflow` — Remove deprecated commands, ensure skills reference updated brainstorming/writing-plans/executing-plans
- `code-quality` — Add new verification skills
- `agentic-engineering` — Add new agent skills (blueprint, team-builder, etc.)

### Phase 4: Version Bump, Branch, PR

**Files to modify:**
- `package.json` — Bump to `0.3.0`
- `src/core/constants.ts` — Update `VERSION`
- `.changeset/` — New changeset for v0.3.0

---

## Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| settings.json manipulation could corrupt user config | **HIGH** | Use JSON parse/stringify with careful merge, backup before write, validate structure |
| Enterprise skill paths may contain invalid content | **MEDIUM** | Validate SKILL.md frontmatter exists before copying |
| New content files are large (58 skills + 13 agents) | **MEDIUM** | Source from latest ECC/Superpowers repos via search-first |
| Inline marketplace approach may change in future Claude Code versions | **LOW** | Also document `--plugin-dir` as fallback, and GitHub marketplace as the preferred long-term approach |
| Breaking change for existing v0.2.0 users | **LOW** | Semver minor bump (0.3.0), no breaking API changes — only additive |

## Estimated Complexity: HIGH

- Phase 1 (Enterprise Skills Import): Medium — ~4 files modified, new prompt flow
- Phase 2 (Persistent Installation): Medium — new template + installer logic
- Phase 3 (Content Update): High — 58 skills + 13 agents + 6 new integrations + installer code
- Phase 4 (Release): Low — standard branch/PR/version bump
