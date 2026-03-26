---
name: liquid-glass-design
description: Apple Liquid Glass design system for iOS 26+ -- SwiftUI glassEffect, UIKit UIGlassEffect, WidgetKit integration, morphing transitions, and GlassEffectContainer patterns.
origin: ECC
---

# Liquid Glass Design System (iOS 26)

Patterns for implementing Apple's Liquid Glass -- a dynamic material that blurs content behind it, reflects color and light from surrounding content, and reacts to touch and pointer interactions.

## When to Activate

- Building or updating apps for iOS 26+ with the new design language
- Implementing glass-style buttons, cards, toolbars, or containers
- Creating morphing transitions between glass elements
- Applying Liquid Glass effects to widgets

## Core Pattern -- SwiftUI

### Basic Glass Effect

```swift
Text("Hello, World!")
    .font(.title)
    .padding()
    .glassEffect()
```

### Customizing Shape and Tint

```swift
Text("Hello, World!")
    .font(.title)
    .padding()
    .glassEffect(.regular.tint(.orange).interactive(), in: .rect(cornerRadius: 16.0))
```

### Glass Button Styles

```swift
Button("Click Me") { /* action */ }
    .buttonStyle(.glass)

Button("Important") { /* action */ }
    .buttonStyle(.glassProminent)
```

### GlassEffectContainer for Multiple Elements

Always wrap multiple glass views in a container for performance and morphing:

```swift
GlassEffectContainer(spacing: 40.0) {
    HStack(spacing: 40.0) {
        Image(systemName: "scribble.variable")
            .frame(width: 80.0, height: 80.0)
            .glassEffect()
        Image(systemName: "eraser.fill")
            .frame(width: 80.0, height: 80.0)
            .glassEffect()
    }
}
```

### Morphing Transitions

```swift
@State private var isExpanded = false
@Namespace private var namespace

GlassEffectContainer(spacing: 40.0) {
    HStack(spacing: 40.0) {
        Image(systemName: "scribble.variable")
            .frame(width: 80.0, height: 80.0)
            .glassEffect()
            .glassEffectID("pencil", in: namespace)

        if isExpanded {
            Image(systemName: "eraser.fill")
                .frame(width: 80.0, height: 80.0)
                .glassEffect()
                .glassEffectID("eraser", in: namespace)
        }
    }
}
```

## Core Pattern -- UIKit

Use `UIGlassEffect` with `UIVisualEffectView`. Set `clipsToBounds = true` when using corner radii.

## Core Pattern -- WidgetKit

Use `@Environment(\.widgetRenderingMode)` to detect rendering mode and `.widgetAccentable()` for accent groups.

## Best Practices

- Always use GlassEffectContainer when applying glass to multiple sibling views
- Apply `.glassEffect()` after other appearance modifiers
- Use `.interactive()` only on elements that respond to user interaction
- Test across light mode, dark mode, and accented/tinted modes
- Ensure accessibility contrast -- text on glass must remain readable

## Anti-Patterns to Avoid

- Multiple standalone `.glassEffect()` views without a GlassEffectContainer
- Nesting too many glass effects
- Applying glass to every view -- reserve for interactive elements and cards
- Using opaque backgrounds behind glass
