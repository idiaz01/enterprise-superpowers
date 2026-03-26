---
name: context-budget
description: Audit token consumption across agents, skills, MCP servers, and rules -- identify bloat, redundancy, and optimization opportunities.
origin: ECC
---

# Context Budget

Audit token consumption across agents, skills, MCP servers, and rules to identify optimization opportunities.

## When to Use

- Context window feels constrained during complex tasks
- After installing many skills, agents, or MCP servers
- Periodic maintenance to keep token overhead low
- When agent performance degrades due to context bloat

## How It Works

### Phase 1: Inventory

Scan all components and estimate token usage:
- Skills (SKILL.md files)
- Agents (agent definitions)
- MCP servers (tool schemas -- ~500 tokens per tool)
- Rules (rule files)

### Phase 2: Classify

Categorize components by usage frequency:
- **Always needed**: Core skills and rules used in every session
- **Sometimes needed**: Domain-specific skills activated on demand
- **Rarely needed**: Specialized tools used infrequently

### Phase 3: Detect Issues

Identify problems:
- Bloated descriptions that could be shorter
- Redundant components covering the same ground
- MCP over-subscription (too many tools registered)
- Agent descriptions that load in every Task tool invocation

### Phase 4: Report

Generate a breakdown with optimization recommendations ranked by potential token savings.

## Key Insights

- MCP servers represent the largest token overhead (~500 tokens per tool schema)
- Agent descriptions load in every Task tool invocation
- Skills only load when activated, making them more efficient
- Rules load on every conversation start

## Modes

- **Basic audit**: Summary of component counts and estimated token usage
- **Verbose audit**: Detailed per-component breakdown with specific recommendations
