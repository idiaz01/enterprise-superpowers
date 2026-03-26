---
name: laravel-security
description: Laravel security best practices for authn/authz, validation, CSRF, mass assignment, file uploads, secrets, rate limiting, and secure deployment.
origin: ECC
---

# Laravel Security Best Practices

Comprehensive security guidance for Laravel applications to protect against common vulnerabilities.

## When to Activate

- Adding authentication or authorization
- Handling user input and file uploads
- Building new API endpoints
- Managing secrets and environment settings
- Hardening production deployments

## How It Works

- Middleware provides baseline protections (CSRF via `VerifyCsrfToken`, security headers via `SecurityHeaders`).
- Guards and policies enforce access control (`auth:sanctum`, `$this->authorize`, policy middleware).
- Form Requests validate and shape input before it reaches services.
- Rate limiting adds abuse protection alongside auth controls.
- Data safety comes from encrypted casts, mass-assignment guards, and signed routes.

## Core Security Settings

- `APP_DEBUG=false` in production
- `APP_KEY` must be set and rotated on compromise
- Set `SESSION_SECURE_COOKIE=true` and `SESSION_SAME_SITE=lax` (or `strict` for sensitive apps)
- Configure trusted proxies for correct HTTPS detection

## Authentication and Tokens

- Use Laravel Sanctum or Passport for API auth
- Prefer short-lived tokens with refresh flows for sensitive data
- Revoke tokens on logout and compromised accounts

```php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});
```

## Password Security

```php
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

$validated = $request->validate([
    'password' => ['required', 'string', Password::min(12)->letters()->mixedCase()->numbers()->symbols()],
]);

$user->update(['password' => Hash::make($validated['password'])]);
```

## Authorization: Policies and Gates

```php
$this->authorize('update', $project);

Route::put('/projects/{project}', [ProjectController::class, 'update'])
    ->middleware(['auth:sanctum', 'can:update,project']);
```

## Validation and Data Sanitization

- Always validate inputs with Form Requests
- Use strict validation rules and type checks
- Never trust request payloads for derived fields

## Mass Assignment Protection

- Use `$fillable` or `$guarded` and avoid `Model::unguard()`
- Prefer DTOs or explicit attribute mapping

## SQL Injection Prevention

```php
DB::select('select * from users where email = ?', [$email]);
```

## XSS Prevention

- Blade escapes output by default (`{{ }}`)
- Use `{!! !!}` only for trusted, sanitized HTML
- Sanitize rich text with a dedicated library

## CSRF Protection

- Keep `VerifyCsrfToken` middleware enabled
- Include `@csrf` in forms and send XSRF tokens for SPA requests

## File Upload Safety

```php
final class UploadInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->can('upload-invoice');
    }

    public function rules(): array
    {
        return [
            'invoice' => ['required', 'file', 'mimes:pdf', 'max:5120'],
        ];
    }
}
```

## Rate Limiting

```php
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

RateLimiter::for('login', function (Request $request) {
    return [
        Limit::perMinute(5)->by($request->ip()),
        Limit::perMinute(5)->by(strtolower((string) $request->input('email'))),
    ];
});
```

## Encrypted Attributes

```php
protected $casts = [
    'api_token' => 'encrypted',
];
```

## Security Headers

```php
final class SecurityHeaders
{
    public function handle(Request $request, \Closure $next): Response
    {
        $response = $next($request);

        $response->headers->add([
            'Content-Security-Policy' => "default-src 'self'",
            'Strict-Transport-Security' => 'max-age=31536000',
            'X-Frame-Options' => 'DENY',
            'X-Content-Type-Options' => 'nosniff',
            'Referrer-Policy' => 'no-referrer',
        ]);

        return $response;
    }
}
```

## CORS and API Exposure

- Restrict origins in `config/cors.php`
- Avoid wildcard origins for authenticated routes

## Signed URLs

```php
use Illuminate\Support\Facades\URL;

$url = URL::temporarySignedRoute(
    'downloads.invoice',
    now()->addMinutes(15),
    ['invoice' => $invoice->id]
);
```

## Logging and PII

- Never log passwords, tokens, or full card data
- Redact sensitive fields in structured logs

## Dependency Security

- Run `composer audit` regularly
- Pin dependencies with care and update promptly on CVEs
