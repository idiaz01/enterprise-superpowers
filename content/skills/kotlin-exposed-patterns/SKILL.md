---
name: kotlin-exposed-patterns
description: JetBrains Exposed ORM patterns including DSL queries, DAO pattern, transactions, HikariCP connection pooling, Flyway migrations, and repository pattern.
origin: ECC
---

# Kotlin Exposed Patterns

Comprehensive patterns for database access with JetBrains Exposed ORM.

## When to Use

- Setting up database access with Exposed
- Writing SQL queries using Exposed DSL or DAO
- Configuring connection pooling with HikariCP
- Creating database migrations with Flyway
- Implementing the repository pattern with Exposed

## How It Works

Exposed provides two query styles: DSL for direct SQL-like expressions and DAO for entity lifecycle management. All database operations run inside `newSuspendedTransaction` blocks for coroutine safety and atomicity.

## DSL Query

```kotlin
suspend fun findUserById(id: UUID): UserRow? =
    newSuspendedTransaction {
        UsersTable.selectAll()
            .where { UsersTable.id eq id }
            .map { it.toUser() }
            .singleOrNull()
    }
```

## DAO Entity Usage

```kotlin
suspend fun createUser(request: CreateUserRequest): User =
    newSuspendedTransaction {
        UserEntity.new {
            name = request.name
            email = request.email
            role = request.role
        }.toModel()
    }
```

## HikariCP Configuration

```kotlin
val hikariConfig = HikariConfig().apply {
    driverClassName = config.driver
    jdbcUrl = config.url
    username = config.username
    password = config.password
    maximumPoolSize = config.maxPoolSize
    isAutoCommit = false
    transactionIsolation = "TRANSACTION_READ_COMMITTED"
    validate()
}
```

## Repository Pattern

```kotlin
interface UserRepository {
    suspend fun findById(id: UUID): User?
    suspend fun findByEmail(email: String): User?
    suspend fun findAll(page: Int, limit: Int): Page<User>
    suspend fun create(request: CreateUserRequest): User
    suspend fun update(id: UUID, request: UpdateUserRequest): User?
    suspend fun delete(id: UUID): Boolean
}
```

## Quick Reference

| Pattern | Description |
|---------|-------------|
| `newSuspendedTransaction { }` | Coroutine-safe transaction block |
| `Table.selectAll().where { }` | Query with conditions |
| `Table.insertAndGetId { }` | Insert and return generated ID |
| `Table.batchInsert(items) { }` | Efficient bulk insert |
| `innerJoin` / `leftJoin` | Join tables |

**Remember**: Use DSL for simple queries, DAO for entity lifecycle management. Always use `newSuspendedTransaction` for coroutine support.
