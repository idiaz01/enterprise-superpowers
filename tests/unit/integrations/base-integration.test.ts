import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import {
  createIntegration,
  addMcpServer,
  addHookEntries,
} from '../../../src/integrations/base-integration.js'
import type { IntegrationMeta } from '../../../src/core/types.js'

describe('createIntegration', () => {
  it('should create an installer with meta and install function', () => {
    const meta: IntegrationMeta = {
      id: 'test',
      name: 'Test',
      category: 'testing',
      description: 'Test integration',
      components: ['skill'],
    }

    const installer = createIntegration(meta, async () => {})
    expect(installer.meta).toEqual(meta)
    expect(typeof installer.install).toBe('function')
  })
})

describe('addMcpServer', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'esp-mcp-'))
  })

  afterEach(async () => {
    await fs.remove(tmpDir)
  })

  it('should create .mcp.json if it does not exist', async () => {
    await addMcpServer(tmpDir, 'test-server', {
      command: 'npx',
      args: ['test'],
    })

    const mcpPath = path.join(tmpDir, '.mcp.json')
    expect(await fs.pathExists(mcpPath)).toBe(true)
    const content = await fs.readJson(mcpPath)
    expect(content.mcpServers['test-server']).toEqual({
      command: 'npx',
      args: ['test'],
    })
  })

  it('should merge with existing .mcp.json', async () => {
    const mcpPath = path.join(tmpDir, '.mcp.json')
    await fs.writeJson(mcpPath, {
      mcpServers: {
        existing: { command: 'existing' },
      },
    })

    await addMcpServer(tmpDir, 'new-server', { command: 'new' })

    const content = await fs.readJson(mcpPath)
    expect(content.mcpServers.existing).toEqual({ command: 'existing' })
    expect(content.mcpServers['new-server']).toEqual({ command: 'new' })
  })
})

describe('addHookEntries', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'esp-hooks-'))
    await fs.ensureDir(path.join(tmpDir, 'hooks'))
  })

  afterEach(async () => {
    await fs.remove(tmpDir)
  })

  it('should create hooks.json if it does not exist', async () => {
    await addHookEntries(tmpDir, 'PreToolUse', [
      { type: 'command', command: 'echo test', description: 'test hook' },
    ])

    const hooksPath = path.join(tmpDir, 'hooks', 'hooks.json')
    expect(await fs.pathExists(hooksPath)).toBe(true)
    const content = await fs.readJson(hooksPath)
    expect(content.hooks.PreToolUse).toHaveLength(1)
  })

  it('should append to existing hook entries', async () => {
    const hooksPath = path.join(tmpDir, 'hooks', 'hooks.json')
    await fs.writeJson(hooksPath, {
      hooks: {
        PreToolUse: [
          { type: 'command', command: 'echo existing', description: 'existing' },
        ],
      },
    })

    await addHookEntries(tmpDir, 'PreToolUse', [
      { type: 'command', command: 'echo new', description: 'new hook' },
    ])

    const content = await fs.readJson(hooksPath)
    expect(content.hooks.PreToolUse).toHaveLength(2)
  })
})
