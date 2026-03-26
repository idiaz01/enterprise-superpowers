---
name: skill-comply
description: Automated compliance measurement -- generate behavioral specs from skill/rule files, run scenarios at decreasing prompt strictness, capture tool call traces, and report compliance scores.
origin: ECC
---

# Skill Comply -- Automated Compliance Measurement

Measures whether coding agents actually follow skills, rules, or agent definitions.

## When to Use

- After adding new rules or skills, to verify agent compliance
- Periodically as part of quality maintenance
- When asking "is this rule actually being followed?"

## How It Works

1. **Auto-generate specs**: Extract expected behavioral sequences from any .md file
2. **Auto-generate scenarios**: Create test prompts with decreasing strictness (supportive -> neutral -> competing)
3. **Run agent**: Execute `claude -p` and capture tool call traces via stream-json
4. **Classify**: Match tool calls against spec steps using LLM (not regex)
5. **Check ordering**: Verify temporal ordering deterministically
6. **Report**: Generate self-contained reports with spec, prompts, and timelines

## Supported Targets

- **Skills** (`skills/*/SKILL.md`): Workflow skills like search-first, TDD guides
- **Rules** (`rules/common/*.md`): Mandatory rules like testing.md, security.md
- **Agent definitions** (`agents/*.md`): Whether an agent gets invoked when expected

## Key Concept: Prompt Independence

Measures whether a skill/rule is followed even when the prompt does not explicitly support it.

## Usage

```bash
# Full run
uv run python -m scripts.run ~/.claude/rules/common/testing.md

# Dry run (spec + scenarios only, no cost)
uv run python -m scripts.run --dry-run ~/.claude/skills/search-first/SKILL.md
```

## Report Contents

- Expected behavioral sequence (auto-generated spec)
- Scenario prompts at each strictness level
- Compliance scores per scenario
- Tool call timelines with classification labels
