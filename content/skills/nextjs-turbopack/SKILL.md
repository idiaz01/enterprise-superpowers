---
name: nextjs-turbopack
description: Next.js 16+ Turbopack development patterns -- Rust-based bundler for faster dev startup, HMR, file-system caching, and bundle analysis.
origin: ECC
---

# Next.js Turbopack

Next.js 16+ defaults to Turbopack for local development, a Rust-based incremental bundler that significantly accelerates startup times and hot module replacement (HMR).

## When to Use

- Day-to-day Next.js development (Turbopack is the default for `next dev`)
- Debugging slow development builds
- Optimizing bundle size for production
- Migrating from webpack-based Next.js setups

## Key Concepts

### Development

Turbopack is the default bundler for `next dev` in Next.js 16+. It provides significantly faster cold start and HMR, especially in large applications. File-system caching means restarts are much faster (e.g., 5-14x on large projects). Cache data resides in the `.next` directory without additional configuration.

### Legacy Option

Webpack remains available if you encounter Turbopack compatibility issues or depend on webpack-specific plugins. Disable Turbopack via command-line flags.

### Production

Build behavior depends on your Next.js version; consult official documentation for guidance on production bundling.

## Technical Advantages

- Rust-based incremental computation for fast rebuilds
- File-system caching so restarts are near-instant
- Native TypeScript and JSX support without extra configuration
- Optimized HMR that only recompiles changed modules

## Bundle Analysis

An experimental Bundle Analyzer (Next.js 16.1+) helps identify performance bottlenecks and oversized dependencies.

## Best Practices

- Maintain current Next.js 16.x versions for stable Turbopack functionality
- Verify Turbopack is active and cache is not being unnecessarily cleared if experiencing slow development builds
- Apply official bundle analysis tools for production optimization needs
- Prioritize App Router and server components for best results
- If a plugin is incompatible with Turbopack, check for updates or alternatives before falling back to webpack
