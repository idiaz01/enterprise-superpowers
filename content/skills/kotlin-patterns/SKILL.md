---
name: kotlin-patterns
description: Idiomatic Kotlin patterns, best practices, and conventions for building robust, efficient, and maintainable Kotlin applications with coroutines, null safety, and DSL builders.
origin: ECC
---

# Kotlin Development Patterns

Idiomatic Kotlin patterns and best practices for building robust, efficient, and maintainable applications.

## When to Use

- Writing new Kotlin code
- Reviewing Kotlin code
- Refactoring existing Kotlin code
- Designing Kotlin modules or libraries

## Core Principles

### 1. Null Safety

```kotlin
fun getUserEmail(userId: String): String {
    val user = userRepository.findById(userId)
    return user?.email ?: "unknown@example.com"
}
```

### 2. Immutability by Default

Prefer `val` over `var`, immutable collections over mutable ones.

```kotlin
data class User(val id: String, val name: String, val email: String)

fun updateEmail(user: User, newEmail: String): User =
    user.copy(email = newEmail)
```

### 3. Sealed Classes and Interfaces

```kotlin
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Failure(val error: AppError) : Result<Nothing>()
    data object Loading : Result<Nothing>()
}
```

### 4. Data Classes and Value Classes

```kotlin
@JvmInline
value class UserId(val value: String) {
    init { require(value.isNotBlank()) { "UserId cannot be blank" } }
}
```

## Scope Functions

- `let`: Transform nullable or scoped result
- `apply`: Configure an object (returns the object)
- `also`: Side effects (returns the object)
- `run`: Execute a block with receiver (returns result)
- `with`: Non-extension form of run

## Extension Functions

```kotlin
fun String.toSlug(): String =
    lowercase()
        .replace(Regex("[^a-z0-9\\s-]"), "")
        .replace(Regex("\\s+"), "-")
        .trim('-')
```

## Coroutines

### Structured Concurrency

```kotlin
suspend fun fetchUserWithPosts(userId: String): UserProfile =
    coroutineScope {
        val user = async { userService.getUser(userId) }
        val posts = async { postService.getUserPosts(userId) }
        UserProfile(user = user.await(), posts = posts.await())
    }
```

### Flow for Reactive Streams

```kotlin
fun searchUsers(query: Flow<String>): Flow<List<User>> =
    query
        .debounce(300.milliseconds)
        .distinctUntilChanged()
        .filter { it.length >= 2 }
        .mapLatest { q -> userRepository.search(q) }
        .catch { emit(emptyList()) }
```

## DSL Builders

```kotlin
fun serverConfig(init: ServerConfigBuilder.() -> Unit): ServerConfig =
    ServerConfigBuilder().apply(init).build()

val config = serverConfig {
    host = "0.0.0.0"
    port = 443
    ssl("/certs/cert.pem", "/certs/key.pem")
    database("jdbc:postgresql://localhost:5432/mydb", maxPoolSize = 20)
}
```

## Error Handling

```kotlin
fun withdraw(account: Account, amount: Money): Account {
    require(amount.value > 0) { "Amount must be positive: $amount" }
    check(account.balance >= amount) { "Insufficient balance" }
    return account.copy(balance = account.balance - amount)
}
```

## Anti-Patterns to Avoid

- Force-unwrapping with `!!`
- Mutable data classes
- Using exceptions for control flow
- `GlobalScope.launch` instead of structured concurrency
- Deeply nested scope functions
