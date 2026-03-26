---
name: android-clean-architecture
description: Clean Architecture patterns for Android and Kotlin Multiplatform projects -- module structure, dependency rules, UseCases, Repositories, and data layer patterns.
origin: ECC
---

# Android Clean Architecture

Clean Architecture patterns for Android and KMP projects.

## When to Activate

- Structuring Android or KMP project modules
- Implementing UseCases, Repositories, or DataSources
- Designing data flow between layers
- Setting up dependency injection with Koin or Hilt

## Module Structure

```
project/
├── app/                  # Android entry point, DI wiring
├── core/                 # Shared utilities, base classes
├── domain/               # UseCases, domain models, repository interfaces (pure Kotlin)
├── data/                 # Repository implementations, DataSources, DB, network
├── presentation/         # Screens, ViewModels, UI models, navigation
├── design-system/        # Reusable Compose components, theme
└── feature/              # Feature modules (optional)
```

### Dependency Rules

```
app -> presentation, domain, data, core
presentation -> domain, design-system, core
data -> domain, core
domain -> core (or no dependencies)
```

**Critical**: `domain` must NEVER depend on `data`, `presentation`, or any framework.

## Domain Layer

### UseCase Pattern

```kotlin
class GetItemsByCategoryUseCase(private val repository: ItemRepository) {
    suspend operator fun invoke(category: String): Result<List<Item>> {
        return repository.getItemsByCategory(category)
    }
}
```

### Repository Interfaces (defined in domain)

```kotlin
interface ItemRepository {
    suspend fun getItemsByCategory(category: String): Result<List<Item>>
    suspend fun saveItem(item: Item): Result<Unit>
    fun observeItems(): Flow<List<Item>>
}
```

## Data Layer

Repository implementations coordinate between local and remote data sources. Use mapper extension functions to convert between entity/DTO and domain models.

## Dependency Injection

- **Koin** (KMP-friendly): `factory`, `single`, `viewModelOf`
- **Hilt** (Android-only): `@Module`, `@Binds`, `@HiltViewModel`

## Error Handling

Use `Result<T>` or a custom sealed type for error propagation across layers.

## Anti-Patterns to Avoid

- Importing Android framework classes in `domain`
- Exposing database entities or DTOs to the UI layer
- Putting business logic in ViewModels
- Using `GlobalScope`
- Circular module dependencies
