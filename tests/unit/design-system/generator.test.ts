import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { generateDesignSystem } from '../../../src/design-system/generator.js'
import type { DesignSystem, TemplateContext } from '../../../src/core/types.js'

function createTestDesignSystem(): DesignSystem {
  return {
    companyName: 'Test Corp',
    logos: [],
    fonts: [{ name: 'Inter' }, { name: 'Roboto Mono', weight: '400' }],
    colors: [
      { name: 'primary', hex: '#0066CC' },
      { name: 'secondary', hex: '#2D3748' },
    ],
  }
}

function createTestContext(): TemplateContext {
  return {
    companyName: 'Test Corp',
    companySlug: 'test-corp',
    designSystem: createTestDesignSystem(),
    integrations: [],
    generatedAt: '2026-03-17',
    version: '0.1.0',
  }
}

describe('generateDesignSystem', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'esp-ds-'))
  })

  afterEach(async () => {
    await fs.remove(tmpDir)
  })

  it('should generate design-system.json', async () => {
    const ds = createTestDesignSystem()
    await generateDesignSystem(tmpDir, ds, createTestContext())

    const dsPath = path.join(tmpDir, 'config', 'design-system.json')
    expect(await fs.pathExists(dsPath)).toBe(true)
    const content = await fs.readJson(dsPath)
    expect(content.companyName).toBe('Test Corp')
    expect(content.colors).toHaveLength(2)
  })

  it('should generate design system SKILL.md', async () => {
    const ds = createTestDesignSystem()
    await generateDesignSystem(tmpDir, ds, createTestContext())

    const skillPath = path.join(
      tmpDir,
      'skills',
      'company-design-system',
      'SKILL.md',
    )
    expect(await fs.pathExists(skillPath)).toBe(true)
    const content = await fs.readFile(skillPath, 'utf-8')
    expect(content).toContain('Test Corp')
    expect(content).toContain('#0066CC')
    expect(content).toContain('Inter')
  })

  it('should include font weight when specified', async () => {
    const ds = createTestDesignSystem()
    await generateDesignSystem(tmpDir, ds, createTestContext())

    const skillPath = path.join(
      tmpDir,
      'skills',
      'company-design-system',
      'SKILL.md',
    )
    const content = await fs.readFile(skillPath, 'utf-8')
    expect(content).toContain('Roboto Mono')
    expect(content).toContain('400')
  })
})
