---
name: compose-multiplatform-patterns
description: Compose Multiplatform and Jetpack Compose patterns for KMP projects -- state management, navigation, theming, performance, and platform-specific UI.
origin: ECC
---

# Compose Multiplatform Patterns

Patterns for building shared UI across Android, iOS, Desktop, and Web using Compose Multiplatform.

## When to Activate

- Building Compose UI (Jetpack Compose or Compose Multiplatform)
- Managing UI state with ViewModels and Compose state
- Implementing navigation in KMP or Android projects
- Optimizing recomposition and rendering performance

## State Management

### ViewModel + Single State Object

```kotlin
data class ItemListState(
    val items: List<Item> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null,
)

class ItemListViewModel(private val getItems: GetItemsUseCase) : ViewModel() {
    private val _state = MutableStateFlow(ItemListState())
    val state: StateFlow<ItemListState> = _state.asStateFlow()
}
```

### Collecting State in Compose

```kotlin
@Composable
fun ItemListScreen(viewModel: ItemListViewModel = koinViewModel()) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    ItemListContent(state = state, onSearch = viewModel::onSearch)
}
```

## Navigation

### Type-Safe Navigation (Compose Navigation 2.8+)

```kotlin
@Serializable data object HomeRoute
@Serializable data class DetailRoute(val id: String)

@Composable
fun AppNavHost(navController: NavHostController = rememberNavController()) {
    NavHost(navController, startDestination = HomeRoute) {
        composable<HomeRoute> { HomeScreen() }
        composable<DetailRoute> { backStackEntry ->
            val route = backStackEntry.toRoute<DetailRoute>()
            DetailScreen(id = route.id)
        }
    }
}
```

## Performance

- Mark classes as `@Stable` or `@Immutable` when all properties are stable
- Use `key()` with stable IDs in lazy lists
- Use `derivedStateOf` to defer reads
- Avoid allocations in recomposition

## Theming

Use Material 3 dynamic theming with `dynamicDarkColorScheme` / `dynamicLightColorScheme`.

## Anti-Patterns to Avoid

- Using `mutableStateOf` in ViewModels when `MutableStateFlow` with `collectAsStateWithLifecycle` is safer
- Passing `NavController` deep into composables -- pass lambda callbacks instead
- Heavy computation inside `@Composable` functions
- Creating new object instances in composable parameters
