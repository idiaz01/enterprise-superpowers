---
name: ai-regression-testing
description: Regression testing strategies for AI-assisted development. Sandbox-mode API testing without database dependencies, automated bug-check workflows, and patterns to catch AI blind spots.
origin: ECC
---

# AI Regression Testing

Testing patterns for AI-assisted development, where the same model writes code and reviews it -- creating systematic blind spots that only automated tests can catch.

## When to Activate

- AI agent has modified API routes or backend logic
- A bug was found and fixed -- need to prevent re-introduction
- Project has a sandbox/mock mode for DB-free testing
- Running bug-check or review commands after code changes

## The Core Problem

When an AI writes code and then reviews its own work, it carries the same assumptions into both steps:

```
AI writes fix -> AI reviews fix -> AI says "looks correct" -> Bug still exists
```

## Common AI Regression Patterns

### Pattern 1: Sandbox/Production Path Mismatch (Most Common)

AI adds field to production path but forgets sandbox path, or vice versa.

**Test to catch it:** Assert same response shape in both paths.

### Pattern 2: SELECT Clause Omission

New column added to response but not to the SELECT query.

### Pattern 3: Error State Leakage

Error state set but old data not cleared.

### Pattern 4: Missing Rollback

Optimistic update without rollback on API failure.

## Strategy: Test Where Bugs Were Found

Do not aim for 100% coverage. Instead, write tests for code that had bugs:

- Bug found in /api/user/profile -> Write test for profile API
- No bug in /api/notifications -> Do not write test (yet)

This works because AI tends to make the same category of mistake repeatedly.

## Bug-Check Workflow

1. Run automated tests FIRST (mandatory)
2. Run build/type check
3. AI code review (with known blind spots in mind)
4. For each fix, write a regression test

## Quick Reference

| AI Regression Pattern | Test Strategy | Priority |
|---|---|---|
| Sandbox/production mismatch | Assert same response shape | High |
| SELECT clause omission | Assert all required fields | High |
| Error state leakage | Assert state cleanup on error | Medium |
| Missing rollback | Assert state restored on failure | Medium |
