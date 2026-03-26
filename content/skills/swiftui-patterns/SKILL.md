---
name: swiftui-patterns
description: SwiftUI architecture patterns, state management with @Observable, view composition, navigation, performance optimization, and modern iOS/macOS UI best practices.
origin: ECC
---

# SwiftUI Patterns

Modern SwiftUI patterns for building declarative, performant user interfaces on Apple platforms.

## When to Activate

- Building SwiftUI views and managing state
- Designing navigation flows with `NavigationStack`
- Structuring view models and data flow
- Optimizing rendering performance for lists and complex layouts

## State Management

### Property Wrapper Selection

| Wrapper | Use Case |
|---------|----------|
| `@State` | View-local value types |
| `@Binding` | Two-way reference to parent's `@State` |
| `@Observable` class + `@State` | Owned model with multiple properties |
| `@Bindable` | Two-way binding to an `@Observable` property |
| `@Environment` | Shared dependencies injected via `.environment()` |

### @Observable ViewModel

```swift
@Observable
final class ItemListViewModel {
    private(set) var items: [Item] = []
    private(set) var isLoading = false
    var searchText = ""

    private let repository: any ItemRepository

    init(repository: any ItemRepository = DefaultItemRepository()) {
        self.repository = repository
    }

    func load() async {
        isLoading = true
        defer { isLoading = false }
        items = (try? await repository.fetchAll()) ?? []
    }
}
```

## Navigation

### Type-Safe NavigationStack

```swift
@Observable
final class Router {
    var path = NavigationPath()

    func navigate(to destination: Destination) {
        path.append(destination)
    }

    func popToRoot() {
        path = NavigationPath()
    }
}

enum Destination: Hashable {
    case detail(Item.ID)
    case settings
    case profile(User.ID)
}
```

## Performance

- Use `LazyVStack` and `LazyHStack` for large collections
- Use stable, unique IDs in `ForEach`
- Never perform I/O or network calls inside `body`
- Use `.task {}` for async work

## Anti-Patterns to Avoid

- Using `ObservableObject` / `@Published` / `@StateObject` / `@EnvironmentObject` in new code -- migrate to `@Observable`
- Putting async work directly in `body` or `init`
- Using `AnyView` type erasure -- prefer `@ViewBuilder` or `Group`
- Ignoring `Sendable` requirements when passing data to/from actors
