---
name: swift-actor-persistence
description: Swift actor-based data persistence patterns -- thread-safe storage using the actor model with in-memory caching and atomic file writes.
origin: ECC
---

# Swift Actor-Based Data Persistence

Thread-safe data storage in Swift using the actor model, which provides compile-time guarantees against data races.

## When to Activate

- Building offline-first applications that need thread-safe persistence
- Implementing local caches or data stores in Swift
- Replacing manual synchronization (locks, dispatch queues) with actors
- Integrating persistence with SwiftUI via `@Observable` view models

## Core Pattern

The pattern centers on an actor generic over `Codable & Identifiable` types that maintains an in-memory dictionary and persists to disk atomically:

```swift
actor DataRepository<T: Codable & Identifiable> where T.ID: Hashable & Codable {
    private var items: [T.ID: T] = [:]
    private let fileURL: URL

    init(filename: String) {
        let documents = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
        self.fileURL = documents.appendingPathComponent(filename)
        self.items = Self.loadFromDisk(url: fileURL)
    }

    func get(_ id: T.ID) -> T? {
        items[id]
    }

    func getAll() -> [T] {
        Array(items.values)
    }

    func save(_ item: T) {
        items[item.id] = item
        persistToDisk()
    }

    func delete(_ id: T.ID) {
        items.removeValue(forKey: id)
        persistToDisk()
    }

    private func persistToDisk() {
        guard let data = try? JSONEncoder().encode(Array(items.values)) else { return }
        try? data.write(to: fileURL, options: .atomic)
    }

    private static func loadFromDisk(url: URL) -> [T.ID: T] {
        guard let data = try? Data(contentsOf: url),
              let items = try? JSONDecoder().decode([T].self, from: data) else {
            return [:]
        }
        return Dictionary(uniqueKeysWithValues: items.map { ($0.id, $0) })
    }
}
```

## Key Design Decisions

- The actor model guarantees serialized access -- no data races, enforced by the compiler
- In-memory dictionary provides O(1) lookups
- Atomic file writes prevent corruption from unexpected app termination
- Synchronous initialization avoids async complexity during setup

## Usage with SwiftUI

```swift
@Observable
final class ItemListViewModel {
    private(set) var items: [Item] = []
    private let repository: DataRepository<Item>

    init(repository: DataRepository<Item>) {
        self.repository = repository
    }

    func load() async {
        items = await repository.getAll()
    }

    func add(_ item: Item) async {
        await repository.save(item)
        await load()
    }
}
```

## Best Practices

- Keep public APIs minimal
- Ensure all data crossing actor boundaries conforms to `Sendable`
- Avoid legacy synchronization patterns (locks, dispatch queues) when actors suffice
- Use atomic file operations to prevent corruption
