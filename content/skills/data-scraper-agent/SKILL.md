---
name: data-scraper-agent
description: Build production-ready AI-powered data collection systems -- three-layer stack (collect, enrich, store), LLM batching, model fallbacks, and GitHub Actions deployment.
origin: ECC
---

# Data Scraper Agent

Build production-ready AI-powered data collection systems that run free on GitHub Actions.

## When to Use

- Building automated data collection pipelines
- Scraping and enriching web data with AI
- Setting up scheduled data collection workflows
- Integrating scraped data with Notion, Google Sheets, or Supabase

## Architecture: Three-Layer Stack

### COLLECT

- `requests` + `BeautifulSoup` for HTML
- `playwright` for JavaScript-rendered sites

### ENRICH

- Gemini Flash LLM (free tier: 500 req/day, 1M tokens/day)
- Batch API calls: never call the LLM once per item, always batch 5+ items per call

### STORE

- Notion, Google Sheets, or Supabase

## AI Model Fallback Strategy

Automatically cascade through models:
1. gemini-2.0-flash-lite (30 RPM)
2. gemini-2.0-flash (15 RPM)
3. gemini-2.5-flash (10 RPM)
4. gemini-flash-lite-latest (final fallback)

## Learning Mechanism

Track positive/negative user decisions in `feedback.json` to bias future scoring without infrastructure changes.

## Deployment

Run entirely on GitHub Actions scheduler (free for public repos). Manage configuration through `config.yaml` rather than hardcoded values.

## Key Principles

- Always batch LLM calls to avoid rate limits
- Use model fallback chains for reliability
- Store configuration externally, not in code
- Implement feedback loops for continuous improvement
- Run on scheduled CI for zero-infrastructure deployment
