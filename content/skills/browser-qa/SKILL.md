---
name: browser-qa
description: Automated visual testing and interaction verification -- smoke tests, interaction tests, visual regression, and accessibility audits using browser automation.
origin: ECC
---

# Browser QA -- Automated Visual Testing and Interaction

Automated browser-based testing for verifying UI behavior across pages.

## When to Use

- After deploying a feature to staging/preview
- Before shipping -- confirm layouts, forms, interactions actually work
- When reviewing PRs that touch frontend code
- Accessibility audits and responsive testing

## How It Works

Uses browser automation MCP (Playwright, Puppeteer, or claude-in-chrome) to interact with live pages.

### Phase 1: Smoke Test

1. Navigate to target URL
2. Check for console errors (filter analytics noise)
3. Verify no 4xx/5xx in network requests
4. Screenshot above-the-fold on desktop + mobile viewport
5. Check Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms

### Phase 2: Interaction Test

1. Click every nav link -- verify no dead links
2. Submit forms with valid data -- verify success state
3. Submit forms with invalid data -- verify error state
4. Test auth flow: login -> protected page -> logout
5. Test critical user journeys

### Phase 3: Visual Regression

1. Screenshot key pages at 3 breakpoints (375px, 768px, 1440px)
2. Compare against baseline screenshots
3. Flag layout shifts > 5px, missing elements, overflow
4. Check dark mode if applicable

### Phase 4: Accessibility

1. Run axe-core or equivalent on each page
2. Flag WCAG AA violations (contrast, labels, focus order)
3. Verify keyboard navigation works end-to-end
4. Check screen reader landmarks

## Output Format

```markdown
## QA Report -- [URL] -- [timestamp]

### Smoke Test
- Console errors: 0 critical, 2 warnings (analytics noise)
- Core Web Vitals: LCP 1.2s, CLS 0.02, INP 89ms

### Interactions
- Nav links: 12/12 working
- Contact form: missing error state for invalid email

### Visual
- Hero section overflows on 375px viewport

### Accessibility
- 2 AA violations: missing alt text, low contrast footer links

### Verdict: SHIP WITH FIXES (2 issues, 0 blockers)
```

## Integration

Pair with `/canary-watch` for post-deploy monitoring.
