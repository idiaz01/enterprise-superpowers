import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import {
  readProjectConfig,
  writeProjectConfig,
  readDesignSystem,
  writeDesignSystem,
  mergeIntegrations,
  createUpdatedConfig,
  isProjectDir,
  toSlug,
} from '../../../src/core/config.js'
import type { DesignSystem, ProjectConfig } from '../../../src/core/types.js'

function createTestConfig(): ProjectConfig {
  return {
    companyName: 'Test Corp',
    companySlug: 'test-corp',
    designSystem: {
      companyName: 'Test Corp',
      logos: [],
      fonts: [],
      colors: [{ name: 'primary', hex: '#0066CC' }],
    },
    enabledIntegrations: ['jira', 'aws'],
    version: '0.1.0',
    generatedAt: '2026-03-17',
  }
}

function createTestDesignSystem(): DesignSystem {
  return {
    companyName: 'Test Corp',
    logos: [{ path: 'logo.png', type: 'primary' }],
    fonts: [{ name: 'Inter' }],
    colors: [
      { name: 'primary', hex: '#0066CC' },
      { name: 'secondary', hex: '#2D3748' },
    ],
  }
}

describe('config read/write', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'esp-config-'))
  })

  afterEach(async () => {
    await fs.remove(tmpDir)
  })

  it('should write and read project config', async () => {
    const config = createTestConfig()
    await writeProjectConfig(tmpDir, config)
    const read = await readProjectConfig(tmpDir)
    expect(read).toEqual(config)
  })

  it('should return null when config does not exist', async () => {
    const result = await readProjectConfig(tmpDir)
    expect(result).toBeNull()
  })

  it('should write and read design system', async () => {
    const ds = createTestDesignSystem()
    await writeDesignSystem(tmpDir, ds)
    const read = await readDesignSystem(tmpDir)
    expect(read).toEqual(ds)
  })

  it('should return null when design system does not exist', async () => {
    const result = await readDesignSystem(tmpDir)
    expect(result).toBeNull()
  })
})

describe('mergeIntegrations', () => {
  it('should merge two arrays without duplicates', () => {
    const result = mergeIntegrations(['jira', 'aws'], ['git', 'aws'])
    expect(result).toEqual(['aws', 'git', 'jira'])
  })

  it('should handle empty existing array', () => {
    const result = mergeIntegrations([], ['git', 'aws'])
    expect(result).toEqual(['aws', 'git'])
  })

  it('should handle empty added array', () => {
    const result = mergeIntegrations(['jira'], [])
    expect(result).toEqual(['jira'])
  })
})

describe('createUpdatedConfig', () => {
  it('should create new config with updates', () => {
    const existing = createTestConfig()
    const updated = createUpdatedConfig(existing, {
      version: '0.2.0',
    })
    expect(updated.version).toBe('0.2.0')
    expect(updated.companyName).toBe('Test Corp')
    expect(updated.enabledIntegrations).toEqual(['jira', 'aws'])
  })

  it('should preserve existing integrations when not updated', () => {
    const existing = createTestConfig()
    const updated = createUpdatedConfig(existing, {
      companyName: 'New Name',
    })
    expect(updated.enabledIntegrations).toEqual(existing.enabledIntegrations)
  })
})

describe('isProjectDir', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'esp-proj-'))
  })

  afterEach(async () => {
    await fs.remove(tmpDir)
  })

  it('should return false for non-project directory', () => {
    expect(isProjectDir(tmpDir)).toBe(false)
  })

  it('should return true for project directory', async () => {
    await writeProjectConfig(tmpDir, createTestConfig())
    expect(isProjectDir(tmpDir)).toBe(true)
  })
})

describe('toSlug', () => {
  it('should convert to kebab case', () => {
    expect(toSlug('My Company')).toBe('my-company')
  })

  it('should handle special characters', () => {
    expect(toSlug('Acme Corp. Inc.')).toBe('acme-corp-inc')
  })

  it('should handle already-slugified input', () => {
    expect(toSlug('my-company')).toBe('my-company')
  })

  it('should trim leading/trailing hyphens', () => {
    expect(toSlug('  My Company  ')).toBe('my-company')
  })
})
