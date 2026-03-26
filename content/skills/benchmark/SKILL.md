---
name: benchmark
description: Performance baseline and regression detection -- page performance, API latency, build times, and before/after comparison.
origin: ECC
---

# Benchmark -- Performance Baseline and Regression Detection

Measure and compare performance metrics to detect regressions.

## When to Use

- Before and after a PR to measure performance impact
- Setting up performance baselines for a project
- When users report "it feels slow"
- Before a launch -- ensure you meet performance targets
- Comparing your stack against alternatives

## Modes

### Mode 1: Page Performance

Measures real browser metrics: LCP, CLS, INP, FCP, TTFB, total page weight, JS bundle size, CSS size, image weight, network request count.

### Mode 2: API Performance

Benchmarks API endpoints: hit each endpoint 100 times, measure p50/p95/p99 latency, track response size, test under 10 concurrent requests.

### Mode 3: Build Performance

Measures development feedback loop: cold build time, HMR time, test suite duration, TypeScript check time, lint time, Docker build time.

### Mode 4: Before/After Comparison

```
/benchmark baseline    # saves current metrics
# ... make changes ...
/benchmark compare     # compares against baseline
```

Output:

| Metric | Before | After | Delta | Verdict |
|--------|--------|-------|-------|---------|
| LCP | 1.2s | 1.4s | +200ms | WARN |
| Bundle | 180KB | 175KB | -5KB | BETTER |
| Build | 12s | 14s | +2s | WARN |

## Storage

Stores baselines in `.ecc/benchmarks/` as JSON. Git-tracked so the team shares baselines.

## Integration

- CI: run `/benchmark compare` on every PR
- Pair with `/canary-watch` for post-deploy monitoring
- Pair with `/browser-qa` for full pre-ship checklist
