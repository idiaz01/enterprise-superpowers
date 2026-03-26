---
name: click-path-audit
description: Trace every user-facing button/touchpoint through its full state change sequence to find bugs where functions individually work but cancel each other out or leave the UI in an inconsistent state.
origin: ECC
---

# Click-Path Audit -- Behavioural Flow Audit

Find bugs that static code reading misses: state interaction side effects, race conditions between sequential calls, and handlers that silently undo each other.

## The Problem This Solves

Traditional debugging checks if functions exist, crash, or return the right type. But it does NOT check:
- Does the final UI state match what the button label promises?
- Does function B silently undo what function A just did?
- Does shared state have side effects that cancel the intended action?

## How It Works

For EVERY interactive touchpoint in the target area:

1. IDENTIFY the handler (onClick, onSubmit, onChange)
2. TRACE every function call in the handler, IN ORDER
3. For EACH function call: what state does it READ, WRITE, and what SIDE EFFECTS does it have?
4. CHECK: Does any later call UNDO a state change from an earlier call?
5. CHECK: Is the FINAL state what the user expects from the button label?
6. CHECK: Are there race conditions?

## Bug Patterns

### Pattern 1: Sequential Undo
Function A sets X = true, function B's side effect resets X = false.

### Pattern 2: Async Race
Two async calls resolve in unpredictable order, final state depends on timing.

### Pattern 3: Stale Closure
Callback captures stale state variable, operations use outdated values.

### Pattern 4: Missing State Transition
Button says "Save" but handler only validates, never actually saves.

### Pattern 5: Conditional Dead Path
A condition is always false at the point of execution, making code unreachable.

### Pattern 6: useEffect Interference
Button sets state, a useEffect watches that state and immediately resets it.

## When to Use

- After systematic debugging finds "no bugs" but users report broken UI
- After modifying any state store action
- After any refactor touching shared state
- When a button "does nothing"

## Execution Steps

1. **Map State Stores** -- Document all actions and their side effects
2. **Audit Each Touchpoint** -- Trace handler calls and check for conflicts
3. **Report** -- Document bugs with severity, pattern, trace, and fix
