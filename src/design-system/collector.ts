import { input, confirm } from '@inquirer/prompts'
import type { ColorEntry, DesignSystem, FontConfig, LogoConfig } from '../core/types.js'
import { DEFAULT_COLORS } from '../core/constants.js'

export async function collectDesignSystem(
  companyName: string,
): Promise<DesignSystem> {
  const logos = await collectLogos()
  const fonts = await collectFonts()
  const colors = await collectColors()

  return {
    companyName,
    logos,
    fonts,
    colors,
  }
}

async function collectLogos(): Promise<readonly LogoConfig[]> {
  const hasLogo = await confirm({
    message: 'Do you have a company logo file to include?',
    default: false,
  })

  if (!hasLogo) return []

  const logoPath = await input({
    message: 'Path to primary logo file (PNG, SVG, or JPG):',
    validate: (value) =>
      value.trim().length > 0 || 'Please enter a valid file path',
  })

  const hasIcon = await confirm({
    message: 'Do you also have a separate icon/favicon?',
    default: false,
  })

  const logos: LogoConfig[] = [
    { path: logoPath.trim(), type: 'primary' },
  ]

  if (hasIcon) {
    const iconPath = await input({
      message: 'Path to icon/favicon file:',
      validate: (value) =>
        value.trim().length > 0 || 'Please enter a valid file path',
    })
    logos.push({ path: iconPath.trim(), type: 'icon' })
  }

  return logos
}

async function collectFonts(): Promise<readonly FontConfig[]> {
  const fontInput = await input({
    message:
      'Company fonts (comma-separated, e.g. "Inter, Roboto Mono"). Leave empty to skip:',
    default: '',
  })

  if (!fontInput.trim()) return []

  return fontInput
    .split(',')
    .map((f) => f.trim())
    .filter((f) => f.length > 0)
    .map((name) => ({ name }))
}

async function collectColors(): Promise<readonly ColorEntry[]> {
  const useDefaults = await confirm({
    message: 'Use default color palette? (You can customize later)',
    default: true,
  })

  if (useDefaults) return DEFAULT_COLORS

  const colors: ColorEntry[] = []
  const colorNames = ['primary', 'secondary', 'accent', 'background', 'text']

  for (const name of colorNames) {
    const hex = await input({
      message: `${name} color (hex, e.g. #0066CC):`,
      default: DEFAULT_COLORS.find((c) => c.name === name)?.hex ?? '#000000',
      validate: (value) =>
        /^#[0-9A-Fa-f]{6}$/.test(value) ||
        'Please enter a valid hex color (e.g. #0066CC)',
    })
    colors.push({ name, hex })
  }

  return colors
}

export async function updateDesignSystem(
  existing: DesignSystem,
): Promise<DesignSystem> {
  const updateLogos = await confirm({
    message: 'Update logos?',
    default: false,
  })
  const logos = updateLogos ? await collectLogos() : existing.logos

  const updateFonts = await confirm({
    message: 'Update fonts?',
    default: false,
  })
  const fonts = updateFonts ? await collectFonts() : existing.fonts

  const updateColors = await confirm({
    message: 'Update colors?',
    default: false,
  })
  const colors = updateColors ? await collectColors() : existing.colors

  return {
    companyName: existing.companyName,
    logos,
    fonts,
    colors,
  }
}
