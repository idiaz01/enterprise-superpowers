---
name: rules-distill
description: Scan skills to extract cross-cutting principles and distill them into rules -- append, revise, or create new rule files.
origin: ECC
---

# Rules Distill

Scan installed skills, extract cross-cutting principles that appear in multiple skills, and distill them into rules.

## When to Use

- Periodic rules maintenance (monthly or after installing new skills)
- After a skill-stocktake reveals patterns that should be rules
- When rules feel incomplete relative to the skills being used

## How It Works

### Phase 1: Inventory (Deterministic Collection)

Scan all skills and rules, count files and headings.

### Phase 2: Cross-read, Match and Verdict (LLM Judgment)

Group skills into thematic clusters. For each cluster, extract principles that:
1. Appear in 2+ skills
2. Are actionable ("do X" or "don't do Y")
3. Have clear violation risk
4. Are not already in rules

Assign verdicts: Append, Revise, New Section, New File, Already Covered, or Too Specific.

### Phase 3: User Review and Execution

Present a summary table. User approves, modifies, or skips each candidate. Never modify rules automatically.

## Verdict Types

| Verdict | Meaning |
|---------|---------|
| Append | Add to existing section of existing rule file |
| Revise | Fix inaccurate/insufficient content |
| New Section | Add new section to existing rule file |
| New File | Create new rule file |
| Already Covered | Sufficiently covered in existing rules |
| Too Specific | Should remain at the skill level |

## Design Principles

- **What, not How**: Extract principles only; code examples stay in skills
- **Link back**: Draft text includes `See skill: [name]` references
- **Deterministic collection, LLM judgment**: Scripts guarantee exhaustiveness; LLM guarantees contextual understanding
- **Anti-abstraction safeguard**: 3-layer filter prevents overly abstract principles
