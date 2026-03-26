---
name: canary-watch
description: Post-deploy monitoring -- watches deployed URLs for regressions in HTTP status, console errors, performance, content, and API health.
origin: ECC
---

# Canary Watch -- Post-Deploy Monitoring

Monitors a deployed URL for regressions after deployment.

## When to Use

- After deploying to production or staging
- After merging a risky PR
- When you want to verify a fix actually fixed it
- Continuous monitoring during a launch window
- After dependency upgrades

## What It Watches

1. **HTTP Status** -- is the page returning 200?
2. **Console Errors** -- new errors that were not there before?
3. **Network Failures** -- failed API calls, 5xx responses?
4. **Performance** -- LCP/CLS/INP regression vs baseline?
5. **Content** -- did key elements disappear?
6. **API Health** -- are critical endpoints responding within SLA?

## Watch Modes

- **Quick check** (default): single pass, report results
- **Sustained watch**: check every N minutes for M hours
- **Diff mode**: compare staging vs production

## Alert Thresholds

### Critical (immediate alert)
- HTTP status != 200
- Console error count > 5 (new errors only)
- LCP > 4s
- API endpoint returns 5xx

### Warning (flag in report)
- LCP increased > 500ms from baseline
- CLS > 0.1
- New console warnings

## Output

```markdown
## Canary Report -- myapp.com

| Check | Result | Baseline | Delta |
|-------|--------|----------|-------|
| HTTP | 200 | 200 | -- |
| Console errors | 0 | 0 | -- |
| LCP | 1.8s | 1.6s | +200ms |
| API /health | 145ms | 120ms | +25ms |

### No regressions detected. Deploy is clean.
```

## Integration

Pair with `/browser-qa` for pre-deploy verification.
