---
name: kotlin-coroutines-flows
description: Kotlin coroutines and Flow patterns -- structured concurrency, reactive streams, StateFlow/SharedFlow, dispatcher selection, and testing strategies.
origin: ECC
---

# Kotlin Coroutines and Flows

Structured concurrency patterns, reactive stream management, and testing strategies for Kotlin projects.

## When to Activate

- Implementing async operations in Kotlin
- Building reactive data streams with Flow
- Managing UI state with StateFlow/SharedFlow
- Testing coroutine-based code

## Structured Concurrency

Always use structured concurrency -- never `GlobalScope`:

```kotlin
// Good: Scoped to lifecycle
viewModelScope.launch {
    val data = repository.fetchData()
    _state.update { it.copy(data = data) }
}

// Bad: Unmanaged global scope
GlobalScope.launch { /* leaks resources */ }
```

### Parallel Operations

```kotlin
suspend fun fetchDashboard(userId: String): Dashboard =
    coroutineScope {
        val user = async { userService.getUser(userId) }
        val posts = async { postService.getPosts(userId) }
        Dashboard(user = user.await(), posts = posts.await())
    }
```

Use `supervisorScope` when failures in one task should not cancel others.

## Flow Types

### Cold Flow (Database observables)

```kotlin
fun observeUsers(): Flow<List<User>> = flow {
    while (currentCoroutineContext().isActive) {
        emit(userRepository.findAll())
        delay(5.seconds)
    }
}.catch { e -> emit(emptyList()) }
```

### StateFlow (UI state)

```kotlin
private val _state = MutableStateFlow(UiState())
val state: StateFlow<UiState> = _state.asStateFlow()
    .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), UiState())
```

### SharedFlow (One-time events)

```kotlin
private val _events = MutableSharedFlow<UiEvent>()
val events: SharedFlow<UiEvent> = _events.asSharedFlow()
```

## Dispatcher Selection

| Dispatcher | Use Case |
|------------|----------|
| `Dispatchers.Default` | CPU-intensive computation |
| `Dispatchers.IO` | File/network I/O |
| `Dispatchers.Main` | UI updates |

## Testing

```kotlin
class FlowServiceTest : FunSpec({
    test("observeUsers emits updates") {
        runTest {
            val service = UserFlowService()
            val emissions = service.observeUsers().take(3).toList()
            emissions shouldHaveSize 3
        }
    }
})
```

Use Turbine for verifying StateFlow emissions, `runTest` with `TestDispatcher` for advancement control.

## Common Mistakes

- Collecting Flows without proper scopes
- Mutating state collections directly
- Catching cancellation exceptions
- Recreating Flows in composables without `remember`
