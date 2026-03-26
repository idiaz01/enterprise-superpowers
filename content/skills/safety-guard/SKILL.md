---
name: safety-guard
description: Prevent destructive operations -- intercept dangerous commands, restrict file edits to specific directories, and protect production systems during autonomous agent execution.
origin: ECC
---

# Safety Guard -- Prevent Destructive Operations

Protect against destructive operations when working on production systems or running autonomous agents.

## When to Use

- Working on production systems
- When agents are running autonomously (full-auto mode)
- When you want to restrict edits to a specific directory
- During sensitive operations (migrations, deploys, data changes)

## Modes

### Mode 1: Careful Mode

Intercepts destructive commands before execution:

- `rm -rf` (especially /, ~, or project root)
- `git push --force`
- `git reset --hard`
- `git checkout .` (discard all changes)
- `DROP TABLE / DROP DATABASE`
- `docker system prune`
- `kubectl delete`
- `chmod 777`
- `npm publish` (accidental publishes)
- Any command with `--no-verify`

When detected: shows what the command does, asks for confirmation, suggests safer alternative.

### Mode 2: Freeze Mode

Locks file edits to a specific directory tree. Any Write/Edit outside that directory is blocked.

### Mode 3: Guard Mode (Careful + Freeze)

Both protections active. Maximum safety for autonomous agents. Agents can read anything but only write to the specified directory.

### Unlock

```
/safety-guard off
```

## Implementation

Uses PreToolUse hooks to intercept Bash, Write, Edit, and MultiEdit tool calls. Checks the command/path against the active rules before allowing execution.

## Integration

- Enable by default for autonomous sessions
- Logs all blocked actions to `~/.claude/safety-guard.log`
