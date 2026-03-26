---
name: bun-runtime
description: Bun as runtime, package manager, bundler, and test runner. When to choose Bun vs Node, migration notes, and Vercel support.
origin: ECC
---

# Bun Runtime

Bun is a fast all-in-one JavaScript runtime and toolkit: runtime, package manager, bundler, and test runner.

## When to Use

- **Prefer Bun** for: new JS/TS projects, scripts where install/run speed matters, Vercel deployments with Bun runtime, and when you want a single toolchain.
- **Prefer Node** for: maximum ecosystem compatibility, legacy tooling that assumes Node, or when a dependency has known Bun issues.

## How It Works

- **Runtime**: Drop-in Node-compatible runtime (built on JavaScriptCore, implemented in Zig).
- **Package manager**: `bun install` is significantly faster than npm/yarn. Lockfile is `bun.lock` (text) by default.
- **Bundler**: Built-in bundler and transpiler for apps and libraries.
- **Test runner**: Built-in `bun test` with Jest-like API.

## Examples

### Run and install

```bash
bun install
bun run dev
bun run src/index.ts
```

### Testing

```bash
bun test
bun test --watch
```

```typescript
import { expect, test } from "bun:test";

test("add", () => {
  expect(1 + 2).toBe(3);
});
```

### Runtime API

```typescript
const file = Bun.file("package.json");
const json = await file.json();

Bun.serve({
  port: 3000,
  fetch(req) {
    return new Response("Hello");
  },
});
```

## Migration from Node

Replace `node script.js` with `bun run script.js`. Run `bun install` in place of `npm install`. Use `bun run` for npm scripts; `bun x` for npx-style one-off runs.

## Best Practices

- Commit the lockfile (`bun.lock` or `bun.lockb`) for reproducible installs.
- Prefer `bun run` for scripts. For TypeScript, Bun runs `.ts` natively.
- Keep dependencies up to date; Bun and the ecosystem evolve quickly.
