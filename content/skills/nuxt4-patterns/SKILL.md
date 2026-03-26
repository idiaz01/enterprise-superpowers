---
name: nuxt4-patterns
description: Nuxt 4 app patterns for hydration safety, performance, route rules, lazy loading, and SSR-safe data fetching with useFetch and useAsyncData.
origin: ECC
---

# Nuxt 4 Patterns

Use when building or debugging Nuxt 4 apps with SSR, hybrid rendering, route rules, or page-level data fetching.

## When to Activate

- Hydration mismatches between server HTML and client state
- Route-level rendering decisions such as prerender, SWR, ISR, or client-only sections
- Performance work around lazy loading, lazy hydration, or payload size
- Page or component data fetching with `useFetch`, `useAsyncData`, or `$fetch`

## Hydration Safety

- Keep the first render deterministic. Do not put `Date.now()`, `Math.random()`, browser-only APIs, or storage reads directly into SSR-rendered template state.
- Move browser-only logic behind `onMounted()`, `import.meta.client`, `ClientOnly`, or a `.client.vue` component.
- Use Nuxt's `useRoute()` composable, not the one from `vue-router`.

## Data Fetching

- Prefer `await useFetch()` for SSR-safe API reads in pages and components.
- Use `useAsyncData()` when the fetcher is not a simple `$fetch()` call.
- Use `$fetch()` for user-triggered writes or client-only actions.
- Use `lazy: true` for non-critical data that should not block navigation.
- Trim payload size with `pick`.

```ts
const route = useRoute()

const { data: article, status, error, refresh } = await useAsyncData(
  () => `article:${route.params.slug}`,
  () => $fetch(`/api/articles/${route.params.slug}`),
)

const { data: comments } = await useFetch(`/api/articles/${route.params.slug}/comments`, {
  lazy: true,
  server: false,
})
```

## Route Rules

```ts
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },
    '/products/**': { swr: 3600 },
    '/blog/**': { isr: true },
    '/admin/**': { ssr: false },
    '/api/**': { cache: { maxAge: 60 * 60 } },
  },
})
```

## Lazy Loading and Performance

- Use the `Lazy` prefix to dynamically import non-critical components.
- Use lazy hydration for below-the-fold or non-critical interactive UI.

```vue
<template>
  <LazyRecommendations v-if="showRecommendations" />
  <LazyProductGallery hydrate-on-visible />
</template>
```

## Review Checklist

- First SSR render and hydrated client render produce the same markup
- Page data uses `useFetch` or `useAsyncData`, not top-level `$fetch`
- Non-critical data is lazy and has explicit loading UI
- Route rules match the page's SEO and freshness requirements
- Heavy interactive islands are lazy-loaded or lazily hydrated
