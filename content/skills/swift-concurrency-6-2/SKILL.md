---
name: swift-concurrency-6-2
description: Swift 6.2 Approachable Concurrency -- single-threaded by default, @concurrent for explicit background offloading, isolated conformances for main actor types.
origin: ECC
---

# Swift 6.2 Approachable Concurrency

Patterns for adopting Swift 6.2's concurrency model where code runs single-threaded by default and concurrency is introduced explicitly.

## When to Activate

- Migrating Swift 5.x or 6.0/6.1 projects to Swift 6.2
- Resolving data-race safety compiler errors
- Designing MainActor-based app architecture
- Offloading CPU-intensive work to background threads
- Enabling Approachable Concurrency build settings in Xcode 26

## Core Problem

In Swift 6.1 and earlier, async functions could be implicitly offloaded to background threads, causing data-race errors. Swift 6.2 fixes this: async functions stay on the calling actor by default.

## Core Pattern -- Isolated Conformances

MainActor types can now conform to non-isolated protocols safely:

```swift
protocol Exportable {
    func export()
}

extension StickerModel: @MainActor Exportable {
    func export() {
        photoProcessor.exportAsPNG()
    }
}
```

## Core Pattern -- @concurrent for Background Work

When you need actual parallelism, explicitly offload with `@concurrent`:

```swift
nonisolated final class PhotoProcessor {
    @concurrent
    static func extractSubject(from data: Data) async -> Sticker { /* ... */ }
}
```

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Single-threaded by default | Most natural code is data-race free |
| Async stays on calling actor | Eliminates implicit offloading |
| Isolated conformances | MainActor types can conform to protocols safely |
| `@concurrent` explicit opt-in | Background execution is deliberate |
| MainActor default inference | Reduces boilerplate annotations |

## Best Practices

- Start on MainActor -- write single-threaded code first, optimize later
- Use `@concurrent` only for CPU-intensive work
- Profile before offloading -- use Instruments to find actual bottlenecks
- Protect globals with MainActor
- Use isolated conformances instead of `nonisolated` workarounds
- Migrate incrementally -- enable features one at a time

## Anti-Patterns to Avoid

- Applying `@concurrent` to every async function
- Using `nonisolated` to suppress compiler errors without understanding isolation
- Keeping legacy `DispatchQueue` patterns when actors provide the same safety
- Fighting the compiler -- if it reports a data race, the code has a real concurrency issue
