---
name: perl-patterns
description: Modern Perl 5.36+ idioms, best practices, and conventions for building robust, maintainable Perl applications.
origin: ECC
---

# Modern Perl Development Patterns

Idiomatic Perl 5.36+ patterns and best practices for building robust, maintainable applications.

## When to Activate

- Writing new Perl code or modules
- Reviewing Perl code for idiom compliance
- Refactoring legacy Perl to modern standards
- Migrating pre-5.36 code to modern Perl

## Core Principles

### 1. Use `v5.36` Pragma

```perl
use v5.36;

sub greet($name) {
    say "Hello, $name!";
}
```

### 2. Subroutine Signatures

```perl
sub connect_db($host, $port = 5432, $timeout = 30) {
    return DBI->connect("dbi:Pg:host=$host;port=$port", undef, undef, {
        RaiseError => 1,
        PrintError => 0,
    });
}
```

### 3. Postfix Dereferencing

```perl
my @users = $data->{users}->@*;
my @roles = $data->{users}[0]{roles}->@*;
```

## Error Handling

### Try::Tiny

```perl
use Try::Tiny;

my $user = try {
    $db->resultset('User')->find($id) // die "User $id not found\n";
} catch {
    warn "Failed to fetch user $id: $_";
    undef;
};
```

## Modern OO with Moo

```perl
package User;
use Moo;
use Types::Standard qw(Str Int ArrayRef);

has name  => (is => 'ro', isa => Str, required => 1);
has email => (is => 'ro', isa => Str, required => 1);
has roles => (is => 'ro', isa => ArrayRef[Str], default => sub { [] });

sub is_admin($self) {
    return grep { $_ eq 'admin' } $self->roles->@*;
}
1;
```

## Quick Reference

| Legacy Pattern | Modern Replacement |
|---|---|
| `use strict; use warnings;` | `use v5.36;` |
| `my ($x, $y) = @_;` | `sub foo($x, $y) { ... }` |
| `@{ $ref }` | `$ref->@*` |
| `open FH, "< $file"` | `open my $fh, '<:encoding(UTF-8)', $file` |
| `blessed hashref` | `Moo` class with types |
| `$1, $2, $3` | `$+{name}` (named captures) |

## Anti-Patterns

- Two-arg open (security risk)
- Indirect object syntax (`new Foo()` instead of `Foo->new()`)
- Disabling strict refs
- String eval for module loading
