---
name: kotlin-testing
description: Kotlin testing patterns with Kotest, MockK, coroutine testing, property-based testing, and Kover coverage. Follows TDD methodology with idiomatic Kotlin practices.
origin: ECC
---

# Kotlin Testing Patterns

Comprehensive Kotlin testing patterns for writing reliable, maintainable tests following TDD methodology with Kotest and MockK.

## When to Use

- Writing new Kotlin functions or classes
- Adding test coverage to existing Kotlin code
- Implementing property-based tests
- Following TDD workflow in Kotlin projects

## TDD Workflow

```
RED     -> Write a failing test first
GREEN   -> Write minimal code to pass the test
REFACTOR -> Improve code while keeping tests green
```

## Kotest Spec Styles

### StringSpec (Simplest)

```kotlin
class CalculatorTest : StringSpec({
    "add two positive numbers" {
        Calculator.add(2, 3) shouldBe 5
    }
})
```

### BehaviorSpec (BDD Style)

```kotlin
class OrderServiceTest : BehaviorSpec({
    Given("a valid order request") {
        When("the order is placed") {
            Then("it should return a confirmed order") {
                result.status shouldBe OrderStatus.CONFIRMED
            }
        }
    }
})
```

## MockK

```kotlin
val repository = mockk<UserRepository>()
coEvery { repository.findById("1") } returns User(id = "1", name = "Alice")

val service = UserService(repository)
val user = service.getUser("1")
user.name shouldBe "Alice"
coVerify { repository.findById("1") }
```

## Coroutine Testing

```kotlin
class CoroutineServiceTest : FunSpec({
    test("concurrent fetches complete together") {
        runTest {
            val service = DataService(testScope = this)
            val result = service.fetchAllData()
            result.users.shouldNotBeEmpty()
        }
    }
})
```

## Property-Based Testing

```kotlin
class PropertyTest : FunSpec({
    test("string reverse is involutory") {
        forAll<String> { s ->
            s.reversed().reversed() == s
        }
    }
})
```

## Kover Coverage

```bash
./gradlew koverHtmlReport
./gradlew koverVerify
```

Coverage targets: Critical business logic 100%, Public APIs 90%+, General code 80%+.

## Best Practices

**DO:** Write tests FIRST (TDD), use Kotest's spec styles consistently, use MockK's `coEvery`/`coVerify` for suspend functions, use `runTest` for coroutine testing.

**DON'T:** Mix testing frameworks, mock data classes, use `Thread.sleep()` in coroutine tests, skip the RED phase in TDD.
