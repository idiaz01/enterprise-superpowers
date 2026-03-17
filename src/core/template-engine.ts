import Handlebars from 'handlebars'
import fs from 'fs-extra'
import path from 'path'
import type { TemplateContext } from './types.js'

const handlebars = Handlebars.create()

handlebars.registerHelper('kebabCase', (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase(),
)

handlebars.registerHelper('camelCase', (str: string) =>
  str
    .replace(/[-_\s]+(.)?/g, (_, c: string) => (c ? c.toUpperCase() : ''))
    .replace(/^[A-Z]/, (c) => c.toLowerCase()),
)

handlebars.registerHelper('pascalCase', (str: string) =>
  str
    .replace(/[-_\s]+(.)?/g, (_, c: string) => (c ? c.toUpperCase() : ''))
    .replace(/^[a-z]/, (c) => c.toUpperCase()),
)

handlebars.registerHelper('uppercase', (str: string) => str.toUpperCase())

handlebars.registerHelper(
  'currentDate',
  () => new Date().toISOString().split('T')[0],
)

handlebars.registerHelper('join', (arr: readonly string[], separator: string) =>
  arr.join(separator),
)

handlebars.registerHelper(
  'ifEquals',
  function (
    this: unknown,
    a: unknown,
    b: unknown,
    options: Handlebars.HelperOptions,
  ) {
    return a === b ? options.fn(this) : options.inverse(this)
  },
)

export function renderTemplate(
  templateContent: string,
  context: TemplateContext,
): string {
  const template = handlebars.compile(templateContent)
  return template(context)
}

export async function renderTemplateFile(
  templatePath: string,
  outputPath: string,
  context: TemplateContext,
): Promise<void> {
  const templateContent = await fs.readFile(templatePath, 'utf-8')
  const rendered = renderTemplate(templateContent, context)
  await fs.ensureDir(path.dirname(outputPath))
  await fs.writeFile(outputPath, rendered, 'utf-8')
}

export async function renderTemplateDir(
  templateDir: string,
  outputDir: string,
  context: TemplateContext,
): Promise<void> {
  const entries = await fs.readdir(templateDir, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(templateDir, entry.name)
    const destName = entry.name.replace(/\.hbs$/, '')
    const destPath = path.join(outputDir, destName)

    if (entry.isDirectory()) {
      await renderTemplateDir(srcPath, destPath, context)
    } else if (entry.name.endsWith('.hbs')) {
      await renderTemplateFile(srcPath, destPath, context)
    } else {
      await fs.ensureDir(path.dirname(destPath))
      await fs.copy(srcPath, destPath)
    }
  }
}

export async function copyWithCustomization(
  sourcePath: string,
  outputPath: string,
  context: TemplateContext,
  customizable: boolean,
): Promise<void> {
  await fs.ensureDir(path.dirname(outputPath))

  if (customizable) {
    const content = await fs.readFile(sourcePath, 'utf-8')
    const template = handlebars.compile(content, { noEscape: true })
    const rendered = template(context)
    await fs.writeFile(outputPath, rendered, 'utf-8')
  } else {
    await fs.copy(sourcePath, outputPath)
  }
}

export async function copyContentDir(
  sourceDir: string,
  outputDir: string,
  context: TemplateContext,
  customizable: boolean,
): Promise<void> {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(sourceDir, entry.name)
    const destPath = path.join(outputDir, entry.name)

    if (entry.isDirectory()) {
      await copyContentDir(srcPath, destPath, context, customizable)
    } else {
      await copyWithCustomization(srcPath, destPath, context, customizable)
    }
  }
}

export function getHandlebarsInstance(): typeof Handlebars {
  return handlebars
}
