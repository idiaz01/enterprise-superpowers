---
name: laravel-verification
description: Verification loop for Laravel projects -- env checks, linting, static analysis, tests with coverage, security scans, and deployment readiness.
origin: ECC
---

# Laravel Verification Loop

Run before PRs, after major changes, and pre-deploy.

## When to Use

- Before opening a pull request for a Laravel project
- After major refactors or dependency upgrades
- Pre-deployment verification for staging or production

## Phases

### Phase 1: Environment Checks

```bash
php -v
composer --version
php artisan --version
```

### Phase 1.5: Composer and Autoload

```bash
composer validate
composer dump-autoload -o
```

### Phase 2: Linting and Static Analysis

```bash
vendor/bin/pint --test
vendor/bin/phpstan analyse
```

### Phase 3: Tests and Coverage

```bash
php artisan test
XDEBUG_MODE=coverage php artisan test --coverage
```

### Phase 4: Security and Dependency Checks

```bash
composer audit
```

### Phase 5: Database and Migrations

```bash
php artisan migrate --pretend
php artisan migrate:status
```

### Phase 6: Build and Deployment Readiness

```bash
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Phase 7: Queue and Scheduler Checks

```bash
php artisan schedule:list
php artisan queue:failed
```
