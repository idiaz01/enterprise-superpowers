---
name: swift-protocol-di-testing
description: Swift protocol-based dependency injection for testing -- abstracting external dependencies behind focused protocols for deterministic, mockable tests.
origin: ECC
---

# Swift Protocol-Based Dependency Injection for Testing

Patterns for making Swift code testable by abstracting external dependencies behind small, focused protocols.

## When to Activate

- Making Swift code testable without real I/O operations
- Abstracting file system, network, or database access behind protocols
- Writing deterministic tests with configurable mock behavior
- Supporting multiple environments (app, tests, previews)

## Core Pattern -- Protocol Design

Each protocol handles exactly one external concern:

```swift
protocol FileAccessor: Sendable {
    func read(from path: String) throws -> Data
    func write(_ data: Data, to path: String) throws
}

protocol NetworkClient: Sendable {
    func fetch(_ request: URLRequest) async throws -> (Data, URLResponse)
}
```

## Production Implementation

```swift
struct DefaultFileAccessor: FileAccessor {
    func read(from path: String) throws -> Data {
        try Data(contentsOf: URL(fileURLWithPath: path))
    }

    func write(_ data: Data, to path: String) throws {
        try data.write(to: URL(fileURLWithPath: path), options: .atomic)
    }
}
```

## Mock Implementation

```swift
struct MockFileAccessor: FileAccessor {
    var files: [String: Data] = [:]
    var shouldThrowOnRead = false
    var shouldThrowOnWrite = false

    func read(from path: String) throws -> Data {
        if shouldThrowOnRead { throw TestError.readFailed }
        guard let data = files[path] else { throw TestError.fileNotFound }
        return data
    }

    func write(_ data: Data, to path: String) throws {
        if shouldThrowOnWrite { throw TestError.writeFailed }
        // In tests, writes are discarded or stored in-memory
    }
}
```

## Dependency Injection

Dependencies are injected via initializer parameters with default values:

```swift
final class ConfigManager {
    private let fileAccessor: any FileAccessor

    init(fileAccessor: any FileAccessor = DefaultFileAccessor()) {
        self.fileAccessor = fileAccessor
    }

    func loadConfig(from path: String) throws -> AppConfig {
        let data = try fileAccessor.read(from: path)
        return try JSONDecoder().decode(AppConfig.self, from: data)
    }
}
```

Production code uses defaults; tests inject mocks.

## Testing with Swift Testing

```swift
import Testing

@Test func loadConfigSucceeds() throws {
    let mockData = try JSONEncoder().encode(AppConfig(port: 8080))
    let mock = MockFileAccessor(files: ["config.json": mockData])
    let manager = ConfigManager(fileAccessor: mock)

    let config = try manager.loadConfig(from: "config.json")
    #expect(config.port == 8080)
}

@Test func loadConfigThrowsOnMissingFile() {
    let mock = MockFileAccessor()
    let manager = ConfigManager(fileAccessor: mock)

    #expect(throws: TestError.fileNotFound) {
        try manager.loadConfig(from: "missing.json")
    }
}
```

## Best Practices

- Maintain single responsibility per protocol
- Ensure `Sendable` conformance when protocols cross actor boundaries
- Mock only external dependencies, not internal types
- Use configurable error properties in mocks to test error handling
