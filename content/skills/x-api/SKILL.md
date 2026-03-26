---
name: x-api
description: X (Twitter) API integration -- posting, reading, searching tweets, analytics, OAuth authentication, rate limiting, and media uploads.
origin: ECC
---

# X API

Programmatic interaction with X (Twitter) for posting, reading, searching, and analytics.

## When to Use

- Posting tweets or threaded content programmatically
- Reading user timelines and searching tweets
- Uploading media before posting
- Building social media automation workflows
- Integrating with content-engine for platform-appropriate content

## Authentication

### OAuth 2.0 Bearer Token

Recommended for read-heavy operations, search, and public data.

### OAuth 1.0a (User Context)

Required for posting tweets, managing accounts, and handling direct messages.

## Key Operations

- Post individual tweets
- Create threaded content
- Retrieve user timelines
- Search tweets with query filters
- Look up users by username
- Upload media before posting

## Security Practices

- Never hardcode tokens -- use environment variables or `.env` files
- Never commit `.env` files -- add to `.gitignore`
- Rotate tokens if exposed
- Use read-only tokens when full access is not necessary

## Rate Limiting

Check response headers at runtime rather than relying on predetermined limits:
- `x-rate-limit-remaining`: requests remaining in current window
- `x-rate-limit-reset`: timestamp when limit resets

Implement automatic backoff based on these headers.

## Integration

- Use `content-engine` for generating platform-appropriate content before posting
- Coordinate with `crosspost` skill for multi-platform distribution
