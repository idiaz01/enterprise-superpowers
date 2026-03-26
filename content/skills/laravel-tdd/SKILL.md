---
name: laravel-tdd
description: Test-driven development for Laravel with PHPUnit and Pest, factories, database testing, fakes, and coverage targets.
origin: ECC
---

# Laravel TDD Workflow

Test-driven development for Laravel applications using PHPUnit and Pest with 80%+ coverage (unit + feature).

## When to Use

- New features or endpoints in Laravel
- Bug fixes or refactors
- Testing Eloquent models, policies, jobs, and notifications
- Prefer Pest for new tests unless the project already standardizes on PHPUnit

## How It Works

### Red-Green-Refactor Cycle

1) Write a failing test
2) Implement the minimal change to pass
3) Refactor while keeping tests green

### Test Layers

- **Unit**: pure PHP classes, value objects, services
- **Feature**: HTTP endpoints, auth, validation, policies
- **Integration**: database + queue + external boundaries

### Database Strategy

- `RefreshDatabase` for most feature/integration tests
- `DatabaseTransactions` when the schema is already migrated and you only need per-test rollback
- `DatabaseMigrations` when you need a full migrate/fresh for every test

## Examples

### PHPUnit Example

```php
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class ProjectControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_owner_can_create_project(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/projects', [
            'name' => 'New Project',
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('projects', ['name' => 'New Project']);
    }
}
```

### Pest Example

```php
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;

uses(RefreshDatabase::class);

test('owner can create project', function () {
    $user = User::factory()->create();

    $response = actingAs($user)->postJson('/api/projects', [
        'name' => 'New Project',
    ]);

    $response->assertCreated();
    assertDatabaseHas('projects', ['name' => 'New Project']);
});
```

### Factories and States

```php
$user = User::factory()->state(['role' => 'admin'])->create();
```

### Fakes for Side Effects

```php
use Illuminate\Support\Facades\Queue;

Queue::fake();
dispatch(new SendOrderConfirmation($order->id));
Queue::assertPushed(SendOrderConfirmation::class);
```

### Auth Testing (Sanctum)

```php
use Laravel\Sanctum\Sanctum;

Sanctum::actingAs($user);
$response = $this->getJson('/api/projects');
$response->assertOk();
```

### Coverage Targets

- Enforce 80%+ coverage for unit + feature tests
- Use `pcov` or `XDEBUG_MODE=coverage` in CI

### Test Commands

- `php artisan test`
- `vendor/bin/phpunit`
- `vendor/bin/pest`
