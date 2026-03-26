---
name: documentation-lookup
description: Use up-to-date library and framework docs via Context7 MCP instead of training data. Activates for setup questions, API references, code examples, or when the user names a framework.
origin: ECC
---

# Documentation Lookup (Context7)

When the user asks about libraries, frameworks, or APIs, fetch current documentation via the Context7 MCP instead of relying on training data.

## When to Use

- Setup or configuration questions (e.g. "How do I configure Next.js middleware?")
- Code that depends on a library ("Write a Prisma query for...")
- API or reference information ("What are the Supabase auth methods?")
- Mentions of specific frameworks or libraries

## How It Works

### Step 1: Resolve the Library ID

Call `resolve-library-id` with the library name and user's question.

### Step 2: Select the Best Match

Choose by name match, benchmark score, source reputation, and version specificity.

### Step 3: Fetch the Documentation

Call `query-docs` with the selected library ID and the user's specific question.

### Step 4: Use the Documentation

Answer using the fetched, current information. Include relevant code examples. Cite the library or version when it matters.

## Examples

### Next.js middleware

1. Resolve: `libraryName: "Next.js"`, `query: "How do I set up middleware?"`
2. Select: `/vercel/next.js`
3. Query: fetch middleware docs
4. Answer with current patterns and code

### Prisma query

1. Resolve: `libraryName: "Prisma"`, `query: "How do I query with relations?"`
2. Select: `/prisma/prisma`
3. Query: fetch relation query docs
4. Return Prisma Client patterns with code

## Best Practices

- Be specific: use the user's full question as the query
- Version awareness: use version-specific library IDs when available
- Prefer official sources over community forks
- Limit to 3 MCP calls per question
- Never send API keys or secrets in queries to Context7
