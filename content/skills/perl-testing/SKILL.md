---
name: perl-testing
description: Perl testing patterns using Test2::V0, Test::More, prove runner, mocking, coverage with Devel::Cover, and TDD methodology.
origin: ECC
---

# Perl Testing Patterns

Comprehensive testing strategies for Perl applications using Test2::V0, Test::More, prove, and TDD methodology.

## When to Activate

- Writing new Perl code (follow TDD: red, green, refactor)
- Designing test suites for Perl modules
- Reviewing Perl test coverage
- Setting up Perl testing infrastructure

## TDD Workflow

```perl
# Step 1: RED -- Write a failing test
use v5.36;
use Test2::V0;
use Calculator;

subtest 'addition' => sub {
    my $calc = Calculator->new;
    is($calc->add(2, 3), 5, 'adds two numbers');
};
done_testing;

# Step 2: GREEN -- Write minimal implementation
# Step 3: REFACTOR -- Improve while tests stay green
```

## Test2::V0 (Recommended)

### Deep Comparison with Builders

```perl
is(
    $user->to_hash,
    hash {
        field name  => 'Alice';
        field email => match(qr/\@example\.com$/);
        etc();
    },
    'user has expected fields'
);
```

### Exception Testing

```perl
like(
    dies { divide(10, 0) },
    qr/Division by zero/,
    'dies on division by zero'
);

ok(lives { divide(10, 2) }, 'division succeeds') or note($@);
```

## Test::More Fundamentals

```perl
is($result, 42, 'returns correct value');
ok($user->is_active, 'user is active');
is_deeply($got, { name => 'Alice' }, 'returns expected structure');
like($error, qr/not found/i, 'error mentions not found');
```

## prove Commands

```bash
prove -l t/                  # Run all tests
prove -lv t/unit/user.t     # Verbose, specific test
prove -lr -j8 t/            # Recursive, parallel
```

## Mocking with Test::MockModule

```perl
my $mock = Test::MockModule->new('MyApp::API');
$mock->mock(fetch_user => sub { { id => 42, name => 'Mock User' } });
# Mock is restored when $mock goes out of scope
```

## Coverage with Devel::Cover

```bash
cover -test
cover -report html
```

Target: 80%+ coverage on business logic.

## Best Practices

**DO:** Follow TDD, use Test2::V0, use subtests, mock external dependencies, name tests clearly.

**DON'T:** Test implementation details, share state between subtests, skip `done_testing`, over-mock.
