---
name: flutter-dart-code-review
description: Library-agnostic Flutter/Dart code review checklist covering widget best practices, state management patterns, Dart idioms, performance, accessibility, security, and clean architecture.
origin: ECC
---

# Flutter/Dart Code Review Best Practices

Comprehensive, library-agnostic checklist for reviewing Flutter/Dart applications.

## 1. General Project Health

- Project follows consistent folder structure (feature-first or layer-first)
- Proper separation of concerns: UI, business logic, data layers
- No business logic in widgets; widgets are purely presentational
- `analysis_options.yaml` includes a strict lint set with strict analyzer settings enabled

## 2. Dart Language Pitfalls

- Missing type annotations leading to `dynamic` -- enable `strict-casts`, `strict-inference`, `strict-raw-types`
- Null safety misuse: Excessive `!` (bang operator) instead of proper null checks
- Catching too broadly: `catch (e)` without `on` clause
- `late` overuse where nullable or constructor initialization would be safer
- Prefer `final` for locals and `const` for compile-time constants
- Use `package:` imports for consistency

## 3. Widget Best Practices

- No single widget with a `build()` method exceeding ~80-100 lines
- `const` constructors used wherever possible
- Colors from `Theme.of(context).colorScheme`, not hardcoded values
- Text styles from `Theme.of(context).textTheme`
- No network calls, file I/O, or heavy computation in `build()`

## 4. State Management (Library-Agnostic)

- Business logic lives outside the widget layer
- State managers receive dependencies via injection
- Mutually exclusive states use sealed types, not boolean flags
- Every async operation models loading, success, and error as distinct states
- State consumer widgets scoped as narrow as possible
- All manual subscriptions cancelled in `dispose()` / `close()`

## 5. Performance

- `const` widgets used to stop rebuild propagation
- `RepaintBoundary` used around complex subtrees
- `ListView.builder` used instead of `ListView(children: [...])` for large lists
- No sorting, filtering, or mapping large collections in `build()`

## 6. Testing

- Unit tests cover all business logic
- Widget tests cover individual widget behavior
- Integration tests cover critical user flows
- Aim for 80%+ line coverage on business logic
- External dependencies are mocked or faked

## 7. Accessibility

- `Semantics` widget used for screen reader labels
- Tappable targets at least 48x48 pixels
- Color is not the sole indicator of state
- Text scales with system font size settings

## 8. Security

- Sensitive data stored using platform-secure storage
- API keys NOT hardcoded in Dart source
- HTTPS enforced for all API calls
- All user input validated before sending to API

## 9. Navigation and Routing

- One routing approach used consistently
- Route arguments are typed -- no `Map<String, dynamic>` casting
- Auth guards/redirects centralized
- Deep links configured for both Android and iOS

## 10. Error Handling

- `FlutterError.onError` overridden to capture framework errors
- Error reporting service integrated
- API errors result in user-friendly error UI, not crashes
- Raw exceptions mapped to user-friendly messages before reaching the UI
