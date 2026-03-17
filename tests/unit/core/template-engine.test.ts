import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import {
  renderTemplate,
  renderTemplateFile,
  renderTemplateDir,
} from '../../../src/core/template-engine.js'
import type { TemplateContext } from '../../../src/core/types.js'

function createTestContext(
  overrides: Partial<TemplateContext> = {},
): TemplateContext {
  return {
    companyName: 'Test Corp',
    companySlug: 'test-corp',
    designSystem: {
      companyName: 'Test Corp',
      logos: [],
      fonts: [{ name: 'Inter' }],
      colors: [
        { name: 'primary', hex: '#0066CC' },
        { name: 'secondary', hex: '#2D3748' },
      ],
    },
    integrations: [],
    generatedAt: '2026-03-17',
    version: '0.1.0',
    ...overrides,
  }
}

describe('renderTemplate', () => {
  it('should replace simple variables', () => {
    const result = renderTemplate('Hello {{companyName}}!', createTestContext())
    expect(result).toBe('Hello Test Corp!')
  })

  it('should handle nested object access', () => {
    const result = renderTemplate(
      'Slug: {{companySlug}}',
      createTestContext(),
    )
    expect(result).toBe('Slug: test-corp')
  })

  it('should iterate over arrays', () => {
    const result = renderTemplate(
      '{{#each designSystem.colors}}{{this.name}}:{{this.hex}} {{/each}}',
      createTestContext(),
    )
    expect(result).toBe('primary:#0066CC secondary:#2D3748 ')
  })

  it('should handle conditionals', () => {
    const result = renderTemplate(
      '{{#if designSystem.logos.length}}has logos{{else}}no logos{{/if}}',
      createTestContext(),
    )
    expect(result).toBe('no logos')
  })

  it('should use kebabCase helper', () => {
    const result = renderTemplate(
      '{{kebabCase companyName}}',
      createTestContext({ companyName: 'My Company' }),
    )
    expect(result).toBe('my-company')
  })

  it('should use uppercase helper', () => {
    const result = renderTemplate(
      '{{uppercase companySlug}}',
      createTestContext(),
    )
    expect(result).toBe('TEST-CORP')
  })
})

describe('renderTemplateFile', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'esp-test-'))
  })

  afterEach(async () => {
    await fs.remove(tmpDir)
  })

  it('should render a template file to output', async () => {
    const templatePath = path.join(tmpDir, 'test.md.hbs')
    const outputPath = path.join(tmpDir, 'output', 'test.md')
    await fs.writeFile(templatePath, '# {{companyName}}')

    await renderTemplateFile(templatePath, outputPath, createTestContext())

    const result = await fs.readFile(outputPath, 'utf-8')
    expect(result).toBe('# Test Corp')
  })

  it('should create output directories', async () => {
    const templatePath = path.join(tmpDir, 'test.hbs')
    const outputPath = path.join(tmpDir, 'deep', 'nested', 'output.txt')
    await fs.writeFile(templatePath, '{{version}}')

    await renderTemplateFile(templatePath, outputPath, createTestContext())

    expect(await fs.pathExists(outputPath)).toBe(true)
    const result = await fs.readFile(outputPath, 'utf-8')
    expect(result).toBe('0.1.0')
  })
})

describe('renderTemplateDir', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'esp-test-'))
  })

  afterEach(async () => {
    await fs.remove(tmpDir)
  })

  it('should render all templates in a directory', async () => {
    const srcDir = path.join(tmpDir, 'templates')
    const outDir = path.join(tmpDir, 'output')

    await fs.ensureDir(srcDir)
    await fs.writeFile(path.join(srcDir, 'file1.md.hbs'), '# {{companyName}}')
    await fs.writeFile(path.join(srcDir, 'file2.txt.hbs'), '{{version}}')

    await renderTemplateDir(srcDir, outDir, createTestContext())

    const file1 = await fs.readFile(path.join(outDir, 'file1.md'), 'utf-8')
    const file2 = await fs.readFile(path.join(outDir, 'file2.txt'), 'utf-8')
    expect(file1).toBe('# Test Corp')
    expect(file2).toBe('0.1.0')
  })

  it('should copy non-hbs files as-is', async () => {
    const srcDir = path.join(tmpDir, 'templates')
    const outDir = path.join(tmpDir, 'output')

    await fs.ensureDir(srcDir)
    await fs.writeFile(path.join(srcDir, 'logo.png'), 'binary-content')

    await renderTemplateDir(srcDir, outDir, createTestContext())

    const result = await fs.readFile(path.join(outDir, 'logo.png'), 'utf-8')
    expect(result).toBe('binary-content')
  })

  it('should handle nested directories', async () => {
    const srcDir = path.join(tmpDir, 'templates')
    const outDir = path.join(tmpDir, 'output')

    await fs.ensureDir(path.join(srcDir, 'sub'))
    await fs.writeFile(path.join(srcDir, 'sub', 'nested.md.hbs'), '{{companySlug}}')

    await renderTemplateDir(srcDir, outDir, createTestContext())

    const result = await fs.readFile(
      path.join(outDir, 'sub', 'nested.md'),
      'utf-8',
    )
    expect(result).toBe('test-corp')
  })
})
