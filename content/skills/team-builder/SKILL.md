---
name: team-builder
description: Interactive menu for browsing and composing agent teams on demand -- discover available agents, present domain menu, spawn selected agents in parallel, and synthesize results.
origin: ECC
---

# Team Builder

Interactive menu for browsing and composing agent teams on demand.

## When to Use

- Assembling a team of specialized agents for a complex task
- Discovering available agents across project-local and global directories
- Running multi-perspective analysis with parallel agents

## How It Works

### Workflow

1. **Discover** available agents from project-local and global directories
2. **Present** a domain menu organized by category
3. **Handle** user selection (numbered domains or name-based matching)
4. **Spawn** selected agents in parallel
5. **Synthesize** their results

### Constraints

- Maximum of 5 agents per team to avoid diminishing returns and excessive token usage
- Agents run independently -- no inter-agent communication needed
- Uses parallel Agent tool calls (not TeamCreate)

### Agent Discovery

- Agent files must be markdown containing a persona prompt
- The first `# Heading` is used as the agent name
- The first paragraph is used as the description
- Supports both flat directory structures (domain from filename prefix) and subdirectory layouts (domain from folder name)

## Selection Methods

- **Numbered**: "1,3" for domains by number
- **Named**: "security + seo" for name-based matching
- **All**: Select all available agents (capped at 5)

## Example

```
/team-builder

Available Agent Domains:
1. Security (3 agents)
2. Performance (2 agents)
3. SEO (1 agent)

Select domains or agents: 1, 3

Spawning: security-reviewer, vulnerability-scanner, pentester, seo-auditor
```
