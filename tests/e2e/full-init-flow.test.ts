import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { generatePlugin } from '../../src/core/generator.js'
import { VERSION } from '../../src/core/constants.js'
import type { DesignSystem } from '../../src/core/types.js'

function createTestDesignSystem(): DesignSystem {
  return {
    companyName: 'Acme Corp',
    logos: [],
    fonts: [{ name: 'Inter' }],
    colors: [
      { name: 'primary', hex: '#FF6B00' },
      { name: 'secondary', hex: '#1A1A2E' },
    ],
  }
}

describe('Full init flow (e2e)', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'esp-e2e-'))
  })

  afterEach(async () => {
    await fs.remove(tmpDir)
  })

  it('should generate a complete plugin structure', async () => {
    const projectDir = await generatePlugin({
      companyName: 'Acme Corp',
      companySlug: 'acme-corp',
      designSystem: createTestDesignSystem(),
      enterpriseSkills: [],
      selectedIntegrations: ['jira', 'security'],
      outputDir: tmpDir,
    })

    // Verify project directory created
    expect(await fs.pathExists(projectDir)).toBe(true)
    expect(path.basename(projectDir)).toBe('acme-corp-superpowers')

    // Verify plugin manifest
    const pluginJson = await fs.readJson(
      path.join(projectDir, '.claude-plugin', 'plugin.json'),
    )
    expect(pluginJson.name).toBe('acme-corp-superpowers')
    expect(pluginJson.version).toBe(VERSION)

    // Verify hooks
    const hooksJson = await fs.readJson(
      path.join(projectDir, 'hooks', 'hooks.json'),
    )
    expect(hooksJson.hooks).toBeDefined()
    expect(hooksJson.hooks.SessionStart).toBeDefined()

    // Verify design system
    const dsJson = await fs.readJson(
      path.join(projectDir, 'config', 'design-system.json'),
    )
    expect(dsJson.companyName).toBe('Acme Corp')
    expect(dsJson.colors[0].hex).toBe('#FF6B00')

    // Verify design system skill
    const dsSkill = await fs.readFile(
      path.join(projectDir, 'skills', 'company-design-system', 'SKILL.md'),
      'utf-8',
    )
    expect(dsSkill).toContain('Acme Corp')
    expect(dsSkill).toContain('#FF6B00')

    // Verify integrations config
    const integrationsJson = await fs.readJson(
      path.join(projectDir, 'config', 'integrations.json'),
    )
    expect(integrationsJson.enabledIntegrations).toContain('jira')
    expect(integrationsJson.enabledIntegrations).toContain('security')

    // Verify MCP config (Jira adds an entry)
    const mcpJson = await fs.readJson(path.join(projectDir, '.mcp.json'))
    expect(mcpJson.mcpServers.jira).toBeDefined()

    // Verify README
    const readme = await fs.readFile(
      path.join(projectDir, 'README.md'),
      'utf-8',
    )
    expect(readme).toContain('Acme Corp')

    // Verify CLAUDE.md with design system enforcement
    const claudeMd = await fs.readFile(
      path.join(projectDir, 'CLAUDE.md'),
      'utf-8',
    )
    expect(claudeMd).toContain('Acme Corp')
    expect(claudeMd).toContain('#FF6B00')
    expect(claudeMd).toContain('MUST')
    expect(claudeMd).toContain('Inter')

    // Verify design system rule
    const dsRule = await fs.readFile(
      path.join(projectDir, 'rules', 'design-system.md'),
      'utf-8',
    )
    expect(dsRule).toContain('Acme Corp')
    expect(dsRule).toContain('#FF6B00')
    expect(dsRule).toContain('Never use arbitrary colors')
  })

  it('should generate with no integrations selected', async () => {
    const projectDir = await generatePlugin({
      companyName: 'Minimal Corp',
      companySlug: 'minimal-corp',
      designSystem: createTestDesignSystem(),
      enterpriseSkills: [],
      selectedIntegrations: [],
      outputDir: tmpDir,
    })

    expect(await fs.pathExists(projectDir)).toBe(true)

    // Should still have design system
    expect(
      await fs.pathExists(
        path.join(projectDir, 'skills', 'company-design-system', 'SKILL.md'),
      ),
    ).toBe(true)

    // CLAUDE.md should always be generated
    expect(await fs.pathExists(path.join(projectDir, 'CLAUDE.md'))).toBe(true)

    // Design system rule should always be generated
    expect(
      await fs.pathExists(path.join(projectDir, 'rules', 'design-system.md')),
    ).toBe(true)

    // Plugin manifest should exist
    expect(
      await fs.pathExists(
        path.join(projectDir, '.claude-plugin', 'plugin.json'),
      ),
    ).toBe(true)
  })

  it('should generate with all MVP integrations', async () => {
    const projectDir = await generatePlugin({
      companyName: 'Full Corp',
      companySlug: 'full-corp',
      designSystem: createTestDesignSystem(),
      enterpriseSkills: [],
      selectedIntegrations: ['jira', 'aws', 'git', 'security', 'frontend'],
      outputDir: tmpDir,
    })

    // Verify all integration skills
    const skills = await fs.readdir(path.join(projectDir, 'skills'))
    expect(skills).toContain('company-design-system')
    expect(skills).toContain('jira-workflow')
    expect(skills).toContain('aws-infrastructure')
    // Git now copies Superpowers skills
    expect(skills).toContain('finishing-a-development-branch')
    expect(skills).toContain('using-git-worktrees')
    // Security now copies ECC skills
    expect(skills).toContain('security-review')
    expect(skills).toContain('security-scan')
    // Frontend copies ECC skill
    expect(skills).toContain('frontend-patterns')

    // Verify agents
    const agents = await fs.readdir(path.join(projectDir, 'agents'))
    expect(agents).toContain('jira-analyst.md')
    expect(agents).toContain('aws-architect.md')
    // Git now copies Superpowers code-reviewer
    expect(agents).toContain('code-reviewer.md')
    // Security now copies ECC security-reviewer
    expect(agents).toContain('security-reviewer.md')

    // Verify rules directory exists with git and security rules
    const rulesCommon = await fs.readdir(
      path.join(projectDir, 'rules', 'common'),
    )
    expect(rulesCommon).toContain('git-workflow.md')
    expect(rulesCommon).toContain('security.md')
  })

  it('should use company name in all generated files', async () => {
    const projectDir = await generatePlugin({
      companyName: 'XYZ Industries',
      companySlug: 'xyz-industries',
      designSystem: {
        ...createTestDesignSystem(),
        companyName: 'XYZ Industries',
      },
      enterpriseSkills: [],
      selectedIntegrations: ['jira'],
      outputDir: tmpDir,
    })

    // Check skill files contain company name
    const jiraSkill = await fs.readFile(
      path.join(projectDir, 'skills', 'jira-workflow', 'SKILL.md'),
      'utf-8',
    )
    expect(jiraSkill).toContain('XYZ Industries')

    // Check agent files contain company name
    const jiraAgent = await fs.readFile(
      path.join(projectDir, 'agents', 'jira-analyst.md'),
      'utf-8',
    )
    expect(jiraAgent).toContain('XYZ Industries')
  })
})
