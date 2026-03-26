---
name: perl-security
description: Comprehensive Perl security covering taint mode, input validation, safe process execution, DBI parameterized queries, web security (XSS/SQLi/CSRF), and perlcritic security policies.
origin: ECC
---

# Perl Security Patterns

Comprehensive security guidelines for Perl applications.

## When to Activate

- Handling user input in Perl applications
- Building Perl web applications
- Reviewing Perl code for security vulnerabilities
- Executing system commands from Perl
- Writing DBI database queries

## Taint Mode

Enable with `-T` flag. Tracks data from external sources and prevents unsafe operations without explicit validation.

```perl
#!/usr/bin/perl -T
use v5.36;
$ENV{PATH} = '/usr/local/bin:/usr/bin:/bin';
delete @ENV{qw(IFS CDPATH ENV BASH_ENV)};
```

### Untainting Pattern

```perl
sub untaint_username($input) {
    if ($input =~ /^([a-zA-Z0-9_]{3,30})$/) {
        return $1;
    }
    die "Invalid username\n";
}
```

## Input Validation

Always use allowlists over blocklists:

```perl
sub validate_sort_field($field) {
    my %allowed = map { $_ => 1 } qw(name email created_at updated_at);
    die "Invalid sort field: $field\n" unless $allowed{$field};
    return $field;
}
```

## Safe File Operations

Always use three-argument open:

```perl
open my $fh, '<:encoding(UTF-8)', $path
    or die "Cannot open '$path': $!\n";
```

Validate paths to prevent traversal attacks.

## Safe Process Execution

Always use list-form system:

```perl
system('grep', '-r', $user_pattern, '/var/log/app/');
```

Never use string-form system or backticks with user input.

## SQL Injection Prevention

Always use DBI placeholders:

```perl
my $sth = $dbh->prepare('SELECT * FROM users WHERE email = ?');
$sth->execute($email);
```

## Web Security

- XSS: Use `HTML::Entities::encode_entities()` for output
- CSRF: Generate and verify tokens on state-changing requests
- Sessions: Secure, HttpOnly, SameSite cookies
- Headers: CSP, X-Frame-Options, HSTS

## Security Checklist

- Taint mode on CGI/web scripts
- Allowlist input validation with length limits
- Three-arg open, path traversal checks
- List-form system, no shell interpolation
- DBI placeholders everywhere
- Template auto-escaping for HTML output
