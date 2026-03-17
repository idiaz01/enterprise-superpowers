import type { DesignSystem } from '../core/types.js'
import { updateDesignSystem } from '../design-system/collector.js'

export async function promptUpdateStyles(
  existing: DesignSystem,
): Promise<DesignSystem> {
  console.log(`\nCurrent design system for ${existing.companyName}:\n`)
  console.log(`  Colors: ${existing.colors.map((c) => `${c.name}(${c.hex})`).join(', ')}`)
  console.log(`  Fonts: ${existing.fonts.map((f) => f.name).join(', ') || 'None'}`)
  console.log(`  Logos: ${existing.logos.length} file(s)`)
  console.log()

  return updateDesignSystem(existing)
}
