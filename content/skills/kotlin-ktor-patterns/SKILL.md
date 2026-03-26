---
name: kotlin-ktor-patterns
description: Ktor server patterns including routing DSL, plugins, authentication, Koin DI, kotlinx.serialization, WebSockets, and testApplication testing.
origin: ECC
---

# Ktor Server Patterns

Comprehensive Ktor patterns for building robust, maintainable HTTP servers with Kotlin coroutines.

## When to Activate

- Building Ktor HTTP servers
- Configuring Ktor plugins (Auth, CORS, ContentNegotiation, StatusPages)
- Implementing REST APIs with Ktor
- Setting up dependency injection with Koin
- Writing Ktor integration tests with testApplication

## Application Structure

```text
src/main/kotlin/
├── com/example/
│   ├── Application.kt
│   ├── plugins/
│   │   ├── Routing.kt
│   │   ├── Serialization.kt
│   │   ├── Authentication.kt
│   │   └── StatusPages.kt
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── repositories/
│   └── di/
```

## Routing DSL

```kotlin
fun Route.userRoutes() {
    val userService by inject<UserService>()

    route("/users") {
        get {
            val users = userService.getAll()
            call.respond(users)
        }

        get("/{id}") {
            val id = call.parameters["id"]
                ?: return@get call.respond(HttpStatusCode.BadRequest, "Missing id")
            val user = userService.getById(id)
                ?: return@get call.respond(HttpStatusCode.NotFound)
            call.respond(user)
        }

        post {
            val request = call.receive<CreateUserRequest>()
            val user = userService.create(request)
            call.respond(HttpStatusCode.Created, user)
        }
    }
}
```

## Status Pages (Error Handling)

```kotlin
fun Application.configureStatusPages() {
    install(StatusPages) {
        exception<IllegalArgumentException> { call, cause ->
            call.respond(HttpStatusCode.BadRequest, ApiResponse.error<Unit>(cause.message ?: "Bad request"))
        }
        exception<Throwable> { call, cause ->
            call.application.log.error("Unhandled exception", cause)
            call.respond(HttpStatusCode.InternalServerError, ApiResponse.error<Unit>("Internal server error"))
        }
    }
}
```

## testApplication Testing

```kotlin
class UserRoutesTest : FunSpec({
    test("GET /users returns list of users") {
        testApplication {
            application {
                install(Koin) { modules(testModule) }
                configureSerialization()
                configureRouting()
            }
            val response = client.get("/users")
            response.status shouldBe HttpStatusCode.OK
        }
    }
})
```

## Quick Reference

| Pattern | Description |
|---------|-------------|
| `route("/path") { get { } }` | Route grouping with DSL |
| `call.receive<T>()` | Deserialize request body |
| `call.respond(status, body)` | Send response with status |
| `by inject<T>()` | Koin dependency injection |
| `testApplication { }` | Integration testing |
